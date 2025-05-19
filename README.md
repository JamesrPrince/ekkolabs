# Prince Chisenga Professional Portfolio

A modern, responsive portfolio website showcasing the professional experience, skills, and projects of Prince Chisenga, a Data Analyst & Business Consultant based in Lusaka, Zambia.

![Portfolio Preview](attached_assets/image_1747651902367.png)

## 🚀 Features

- **Responsive Design**: Fully optimized for all device sizes
- **Modern UI/UX**: Clean, professional interface with smooth animations
- **Dark/Light Mode**: Theme toggle for user preference
- **Interactive Sections**:
  - About
  - Skills & Expertise
  - Professional Experience
  - Portfolio Projects
  - Services
  - Contact Form
- **Contact Form Integration**: Backend API endpoint for form submissions
- **Database Integration**: NeonDB PostgreSQL for storing contact submissions
- **SEO Optimized**: Meta tags configured for better search visibility

## 🛠️ Tech Stack

### Frontend

- **React**: UI component library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI**: Component library based on Radix UI
- **React Hook Form**: Form validation
- **Zod**: Schema validation
- **Tanstack Query**: Data fetching and state management
- **Font Awesome**: Icon library
- **Wouter**: Lightweight routing

### Backend

- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **Drizzle ORM**: Type-safe database toolkit
- **Neon Database**: Serverless PostgreSQL
- **Nodemailer**: Email sending for contact forms

### Development & Build Tools

- **Vite**: Fast build tool and dev server
- **esbuild**: JavaScript bundler
- **TypeScript**: Static typing
- **tsx**: TypeScript executor

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- PostgreSQL database (or Neon Database account)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/prince-chisenga-portfolio.git
   cd prince-chisenga-portfolio
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   # Database
   DATABASE_URL=postgresql://username:password@host:port/database

   # Development
   NODE_ENV=development
   PORT=5001
   ```

4. Run the development server

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5001`

## 📦 Building for Production

1. Build the project

   ```bash
   npm run build
   ```

2. Start the production server
   ```bash
   npm start
   ```

## 🗂️ Project Structure

```
prince-chisenga-portfolio/
├── client/                  # Frontend code
│   ├── index.html           # HTML entry point
│   └── src/                 # React source files
│       ├── components/      # UI components
│       ├── data/            # Static site data
│       ├── hooks/           # Custom React hooks
│       ├── lib/             # Utility functions
│       ├── pages/           # Page components
│       ├── App.tsx          # Main App component
│       ├── index.css        # Global styles
│       └── main.tsx         # React entry point
├── server/                  # Backend code
│   ├── db.ts                # Database connection
│   ├── index.ts             # Server entry point
│   ├── routes.ts            # API routes
│   ├── storage.ts           # Data storage logic
│   └── vite.ts              # Vite server setup
├── shared/                  # Shared code
│   └── schema.ts            # Database schema
├── components.json          # UI component config
├── drizzle.config.ts        # Drizzle ORM config
├── package.json             # Project dependencies
├── postcss.config.js        # PostCSS config
├── tailwind.config.ts       # Tailwind CSS config
├── tsconfig.json            # TypeScript config
└── vite.config.ts           # Vite config
```

## 📋 Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build for production
- `npm start`: Run the production server
- `npm run check`: Type check with TypeScript
- `npm run db:push`: Push database schema changes

## 🧩 Key Components

- **ThemeProvider**: Manages light/dark theme
- **Hero Section**: Introduction with call-to-action
- **Skills Section**: Visual representation of expertise
- **Experience Timeline**: Professional history
- **Projects Gallery**: Portfolio of past work
- **Contact Form**: Interactive form with validation

## 🛡️ License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📬 Contact

Prince Chisenga - [prince.chisenga@example.com](mailto:prince.chisenga@example.com)

LinkedIn: [linkedin.com/in/prince-chisenga](https://linkedin.com/in/prince-chisenga)
GitHub: [github.com/prince-chisenga](https://github.com/prince-chisenga)
Twitter: [twitter.com/prince_chisenga](https://twitter.com/prince_chisenga)

---

Built with ❤️ using React, TypeScript, and Node.js
