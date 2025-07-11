# Solar Review Brasil

This repository contains a Next.js application for showcasing and reviewing solar-energy companies in Brazil. The project aims to help users compare providers and find the best options for solar installations.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the project for production:

```bash
npm run build
```

### Environment Variables

The application uses the `NEXT_PUBLIC_SITE_URL` variable to generate
canonical URLs for pages. When running locally this defaults to
`http://localhost:3000`. Set it to the public URL of your deployment in
`.env.local` or your hosting provider's settings.

The application also uses the `NEXT_PUBLIC_API_URL` variable to connect
to the backend API. When this variable isn't set, it defaults to
`http://localhost:3002`. Create a `.env.local` file to override the
default:

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3002
```

## Project Structure

- **app/** - Next.js route handlers and pages
- **components/** - Reusable UI components
- **hooks/** - Custom React hooks
- **lib/** - Utility libraries and data helpers
- **types/** - TypeScript type definitions
