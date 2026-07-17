'use server'

import { createClient } from '@/shared/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { LoginCredentials } from '../types/auth.types'

export async function login(credentials: LoginCredentials, redirectTo: string = '/') {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect(redirectTo)
}
