import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { z } from 'zod'

const RegisterSchema = z.object({
  // Company information
  name: z.string().min(2, "Nome da empresa deve ter pelo menos 2 caracteres"),
  cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, "CNPJ inválido"),
  
  // Access information
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres")
    .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "Senha deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "Senha deve conter pelo menos um número")
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    const result = RegisterSchema.safeParse(body)
    
    if (!result.success) {
      return new Response(
        JSON.stringify({ 
          error: 'Validation error', 
          details: result.error.format() 
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    const { name, cnpj, email, password } = result.data

    // TODO: Check if company with CNPJ already exists
    // const existingCompany = await db.company.findUnique({ where: { cnpj } })

    // if (existingCompany) {
    //   return new Response(
    //     JSON.stringify({ error: 'CNPJ já cadastrado' }),
    //     {
    //       status: 400,
    //       headers: { 'Content-Type': 'application/json' },
    //     }
    //   )
    // }

    // TODO: Create company and user
    // const company = await db.company.create({
    //   data: {
    //     name,
    //     cnpj,
    //     user: {
    //       create: {
    //         email,
    //         password: await hashPassword(password)
    //       }
    //     }
    //   }
    // })    // Create session token
    const sessionToken = generateSessionToken()
    
    // Create response with session cookie
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Set-Cookie': `session=${sessionToken}; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}` // 1 week
    })

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Registration error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}

// TODO: Implement this according to your authentication system
function generateSessionToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}
