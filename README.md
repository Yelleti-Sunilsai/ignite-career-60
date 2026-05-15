# Ignite Career 60 - AI Resume Analyzer & Optimizer

Ignite Career 60 is a premium, AI-powered platform designed to help job seekers optimize their resumes for Applicant Tracking Systems (ATS) and professional impact. Built with a modern tech stack, it features a dark, futuristic UI with glassmorphism and smooth animations.

## 🚀 Features

- **AI Resume Analysis**: Upload your resume to get a detailed assessment of your ATS compatibility, strengths, weaknesses, and missing skills.
- **AI Resume Optimizer**: Strategically enhance your resume with AI-generated professional summaries, optimized project descriptions, and keyword injections.
- **Recent Resumes Dashboard**: Keep track of your analyzed and optimized resumes with a persistent history and quick access.
- **Interactive Analytics**: Visualize your career growth and skill match through modern charts and radars.
- **Premium SaaS UI**: A dark-themed, responsive dashboard with glassmorphism, neon gradients, and Framer Motion animations.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + TypeScript
- **Routing**: TanStack Router (Start)
- **Styling**: Tailwind CSS 4 + Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React
- **Charts**: Recharts

### Backend
- **Runtime**: Node.js + Express
- **Language**: TypeScript
- **Database**: MySQL
- **AI Integration**: OpenRouter / OpenAI-compatible API
- **File Handling**: Multer (for resume uploads)
- **Text Extraction**: pdf-parse / mammoth (for PDF and DOCX)

## 📂 Project Structure

```text
.
├── backend/            # Express.js backend
│   ├── src/
│   │   ├── config/     # DB and Multer config
│   │   ├── controllers/# API logic
│   │   ├── middleware/ # Auth and global middleware
│   │   ├── routes/     # API route definitions
│   │   ├── utils/      # AI and extraction utilities
│   │   └── server.ts   # Entry point
├── frontend/           # React + TanStack Start frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── routes/     # TanStack Router file-based routes
│   │   ├── services/   # API communication logic
│   │   ├── store/      # Zustand state stores
│   │   └── styles.css  # Global Tailwind styles
```

## 🏁 Getting Started

### Prerequisites
- Node.js (v18+)
- MySQL Server
- OpenRouter API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Yelleti-Sunilsai/ignite-career-60.git
   cd ignite-career-60
   ```

2. **Setup Backend**
   - Navigate to the backend directory: `cd backend`
   - Install dependencies: `npm install`
   - Create a `.env` file (see `backend/.env.example`)
   - Start development server: `npm run dev`

3. **Setup Frontend**
   - Navigate to the frontend directory: `cd frontend`
   - Install dependencies: `npm install`
   - Start development server: `npm run dev`

## 📄 License
This project is licensed under the MIT License.
