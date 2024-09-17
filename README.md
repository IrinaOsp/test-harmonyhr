## HarmonyHR - HR-Tech Application

This is a [Next.js](https://nextjs.org) application designed as a test task.
he project simulates an HR-tech platform where users can manage their profile and view time off information.

## Features

- Login Page: Users can log in using JWT-based authentication with Apollo GraphQL.
- My Info / Time Off Page: Displays user profile information and time-off details with - test data for other fields.
- Responsive Design: Adapted for various devices using Tailwind CSS.
- GraphQL API Integration: Interacts with a mock HR-tech GraphQL API for authentication and user data.
- State Management: Uses Zustand for global state management.
- Component Library: Utilizes shadcn/ui for prebuilt components, with custom modifications where necessary.

## Pages

### Authentication

As the project has limited functionality, during login it also provides registration.
In real project it will be two different functionalities and separate forms/pages - signin and signup.

- **Login**: Uses the login mutation with JWT tokens.
- **Token Refresh**: Uses the refreshToken mutation.
- **Profile Data**: Fetched using the myProfile query (only name and avatar are used in the app).

### My Info / Time Off Page

Displays user profile information fetched via the myProfile query and test data for time-off details.

The page is protected and can only be accessed by authenticated users.

## Getting Started

To run this project locally, follow these steps:

```bash
git clone https://github.com/IrinaOsp/test-harmonyhr.git
cd test-harmonyhr
```

Then install dependencies:

```bash
npm install
```

Run the development server:

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
