# Ignite Career 60 - Backend

The backend of Ignite Career 60 is a robust Node.js and Express application written in TypeScript. It handles resume text extraction, AI analysis, and persistent storage of recent documents.

## 🛠️ Technologies
- **Express**: Web framework for Node.js.
- **TypeScript**: Static typing for safer development.
- **MongoDB + Mongoose**: Database and object modeling.
- **Multer**: Middleware for handling `multipart/form-data` (file uploads).
- **Axios**: For making requests to AI APIs.
- **JWT**: For secure user authentication.

## ⚙️ Environment Variables
Create a `.env` file in the root of the `backend` directory with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ai_resume_analyzer
OPENROUTER_API_KEY=your_openrouter_api_key
JWT_SECRET=your_jwt_secret
```

## 🗄️ Database Setup
The project uses MongoDB. Start a local MongoDB server or use MongoDB Atlas, then set `MONGO_URI` in `.env`. Mongoose creates the `users` and `recentresumes` collections automatically when records are saved.

## 🚀 Scripts
- `npm run dev`: Starts the development server with `tsx` (auto-reload).
- `npm run build`: Compiles TypeScript to JavaScript in the `dist` folder.
- `npm start`: Runs the compiled application.

## 📡 API Endpoints

### Auth
- `POST /api/auth/signup`: Create a new account.
- `POST /api/auth/login`: Authenticate and receive a JWT.

### Resume
- `POST /api/resume/upload`: Upload a PDF/DOCX resume for extraction and analysis.
- `POST /api/resume/optimize`: AI optimization of resume text.
- `GET /api/resume/recent`: Fetch the list of recently opened/analyzed resumes.
- `POST /api/resume/recent/update`: Update the 'last opened' timestamp for a document.
