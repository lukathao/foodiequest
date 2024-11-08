
# travel planner

## create your env file
### You need the variables
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
- NEXT_PUBLIC_CLERK_SECRET_KEY=
- NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
- NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

- OPENAI_API_KEY=

- DATABASE_URL=

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing - Jest
```bash
npm run test
```

## AI Generated requests
* Disabled in development (so we don't use token), only available in production
* For testing purpose one prompt was made, and a prompt was returned, we use that prompt as strings for testing. 
- See: __tests__/test-openai-parse.tsx