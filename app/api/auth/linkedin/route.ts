import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const clientId = process.env.LINKEDIN_CLIENT_ID
  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/linkedin/callback`
  const scope = 'r_emailaddress r_liteprofile'
  
  const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`
  
  return Response.redirect(linkedInAuthUrl)
}
