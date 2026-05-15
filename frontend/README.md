# Ignite Career 60 - Frontend

The frontend of Ignite Career 60 is a high-performance React application built with TanStack Start, featuring a premium dark-themed UI.

## 🛠️ Technologies
- **React 19**: The latest React features including improved performance.
- **TanStack Router**: Type-safe, file-based routing with data loading.
- **Tailwind CSS 4**: Next-generation utility-first CSS framework.
- **Framer Motion**: Smooth, high-performance web animations.
- **Zustand**: Lightweight state management for auth and settings.
- **Recharts**: Responsive charts for resume analytics.

## 🎨 Design System
- **Theme**: Dark Futuristic AI.
- **Visuals**: Glassmorphism, Neon Gradients (`--neon-purple`, `--neon-cyan`), and interactive cards.
- **Typography**: Modern sans-serif with improved legibility.

## 🚀 Scripts
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Runs ESLint to check for code quality.

## 📂 Key Directories
- `src/routes/`: Contains all the file-based routes for TanStack Router.
- `src/components/dashboard/`: Dashboard-specific layout and shell components.
- `src/components/ui/`: Reusable, atomic UI components (Buttons, Cards, Progress, etc.).
- `src/services/`: API communication layer using Axios.
- `src/store/`: Zustand stores for global state.

## 🔗 Route Structure
- `/`: Landing Page.
- `/login` / `/signup`: Authentication.
- `/dashboard/`: Overview analytics and recent resumes.
- `/dashboard/upload`: Resume upload and extraction.
- `/dashboard/analysis`: Detailed AI analysis and ATS scoring.
- `/dashboard/optimizer`: AI-powered resume enhancement and optimization.
- `/dashboard/profile`: User account management.
