import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  
  if (!code) {
    return new Response('No code provided', { status: 400 })
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: process.env.LINKEDIN_CLIENT_ID!,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
        redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/linkedin/callback`,
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to get access token')
    }

    const { access_token } = await tokenResponse.json()

    // Get user profile
    const profileResponse = await fetch('https://api.linkedin.com/v2/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    // Get user email
    const emailResponse = await fetch('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    if (!profileResponse.ok || !emailResponse.ok) {
      throw new Error('Failed to get user profile')
    }

    const profile = await profileResponse.json()
    const emailData = await emailResponse.json()

    // Create or update user in your database
    const userData = {
      linkedinId: profile.id,
      firstName: profile.localizedFirstName,
      lastName: profile.localizedLastName,
      email: emailData.elements[0]['handle~'].emailAddress,
      profilePicture: profile.profilePicture?.['displayImage~']?.elements[0]?.identifiers[0]?.identifier,
    }

    // TODO: Save user data to your database and create session
    
    // Redirect to dashboard with success
    return Response.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`)
  } catch (error) {
    console.error('LinkedIn auth error:', error)
    return Response.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login?error=linkedin_auth_failed`)
  }
}
