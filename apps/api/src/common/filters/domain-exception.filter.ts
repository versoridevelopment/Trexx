import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import {
  CategoryNotFoundError,
  CategoryAlreadyExistsError,
  CategoryAlreadyActiveError,
} from '../../modules/categories/domain/exceptions/category.exceptions';

@Catch()
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message;

    // Mapeo selectivo de Errores de Dominio a Status Codes
    if (exception instanceof CategoryNotFoundError) {
      status = HttpStatus.NOT_FOUND;
    } else if (
      exception instanceof CategoryAlreadyExistsError ||
      exception instanceof CategoryAlreadyActiveError
    ) {
      status = HttpStatus.BAD_REQUEST;
    }

    // Si no es un error de dominio conocido, dejamos que Nest o el programador manejen el 500
    if ((exception as any).getStatus) {
      return response
        .code((exception as any).getStatus())
        .send((exception as any).getResponse());
    }

    response.code(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    });
  }
}
