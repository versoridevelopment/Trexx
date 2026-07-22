import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { createPublicKey } from 'crypto';

type JwkKey = {
  kid?: string;
  alg?: string;
  kty?: string;
  use?: string;
  [key: string]: unknown;
};

@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy, 'supabase') {
  private jwksCache = new Map<string, string>();
  private lastJwksRefresh = 0;

  constructor(config: ConfigService) {
    const supabaseUrl = config.get<string>('SUPABASE_URL');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: ['ES256'],
      secretOrKeyProvider: async (_, rawJwtToken, done) => {
        try {
          const [encodedHeader] = rawJwtToken.split('.');
          if (!encodedHeader) {
            return done(new Error('Invalid token header'));
          }

          const header = JSON.parse(
            Buffer.from(encodedHeader, 'base64url').toString('utf8'),
          ) as { alg?: string; kid?: string };

          if (!supabaseUrl) {
            return done(new Error('SUPABASE_URL is not configured'));
          }

          const now = Date.now();
          if (
            this.jwksCache.size === 0 ||
            now - this.lastJwksRefresh > 10 * 60 * 1000
          ) {
            const response = await fetch(
              `${supabaseUrl}/auth/v1/.well-known/jwks.json`,
            );
            if (!response.ok) {
              return done(new Error('Unable to fetch Supabase JWKS'));
            }

            const data = (await response.json()) as { keys?: JwkKey[] };
            this.jwksCache.clear();

            for (const key of data.keys ?? []) {
              if (!key.kid) continue;
              const publicKey = createPublicKey({
                key: key as any,
                format: 'jwk',
              } as any).export({ type: 'spki', format: 'pem' });
              this.jwksCache.set(
                key.kid,
                typeof publicKey === 'string'
                  ? publicKey
                  : publicKey.toString('utf8'),
              );
            }

            this.lastJwksRefresh = now;
          }

          const pem = header.kid ? this.jwksCache.get(header.kid) : undefined;
          if (!pem) {
            return done(new Error('Signing key not found'));
          }

          return done(null, pem);
        } catch (error) {
          return done(error as Error);
        }
      },
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
