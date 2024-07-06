# Comment App

Comment App is a comment system using the MERN stack (MongoDB, Express.js, React.js, and Node.js) with JWT authentication. It allow authenticated users to view, add, like, and dislike comments on a specific page.

## Key Features

- Add Comment by User
- Delete Comment by User (Only the User who write that comment)
- Edit the Comment/ Delete the Comment
- Reply to the Comment
- Like/Dislike to the Comment
- Responsive Design

## Technology Used

- React
- React Router
- Redux Toolkit/RTK Query
- JSON Web Token
- TailwindCSS - Meterial Tailwind

# Package Used

- React hook form - for easy use of form datas created/update more.
- Lodash - For Easy access and work with different data type.
- Hookform/resolvers and Zod - for validation input
- SweetAlert 2 - for alert showing
- Heroicons - for icon library
- Jwt-decode - jwt
- Sooner - for showing notification or message
- Redux-persist - for save the token and user data even on refresh the application on the redux store
- Redux-persist-transform-encrypt - for encrypted token/accessToken
- Date-fns - for date format

## Setup

If someone wants to run your project locally, provide detailed instructions on how to do so. Include any dependencies that need to be installed, environment setup, or configuration steps.

```bash
# Clone the repository
git clone https://github.com/yourusername/your-repo.git

# Navigate to the project folder
cd your-repo

# Install dependencies
npm install

# Configure environment variables
# Create a .env.local file and add VITE_API_URL
# You Can Find it on env.example
# VITE_API_URL refer to backend API Link

# Run the development server
npm run dev
```

## Live Preview

- Frontend - https://computerwalanet.netlify.app
- Backend - https://computermanserver.vercel.app
