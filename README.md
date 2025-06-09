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

For uploading images you also need AWS credentials and bucket details:

- `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` – credentials for an IAM user
- `AWS_REGION` – region of your S3 bucket
- `S3_BUCKET_NAME` – name of the bucket used for uploads

## Project Structure

- **app/** - Next.js route handlers and pages
- **components/** - Reusable UI components
- **hooks/** - Custom React hooks
- **lib/** - Utility libraries and data helpers
- **types/** - TypeScript type definitions

## License

This project is licensed under the [MIT License](LICENSE).

