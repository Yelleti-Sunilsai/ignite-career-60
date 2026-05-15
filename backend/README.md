# Ignite Career 60 - Backend

The backend of Ignite Career 60 is a robust Node.js and Express application written in TypeScript. It handles resume text extraction, AI analysis, and persistent storage of recent documents.

## 🛠️ Technologies
- **Express**: Web framework for Node.js.
- **TypeScript**: Static typing for safer development.
- **MySQL2**: Database driver for MySQL.
- **Multer**: Middleware for handling `multipart/form-data` (file uploads).
- **Axios**: For making requests to AI APIs.
- **JWT**: For secure user authentication.

## ⚙️ Environment Variables
Create a `.env` file in the root of the `backend` directory with the following variables:

```env
PORT=5000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=ai_resume_analyzer
OPENROUTER_API_KEY=your_openrouter_api_key
JWT_SECRET=your_jwt_secret
```

## 🗄️ Database Setup
The project uses MySQL. Ensure the database `ai_resume_analyzer` exists and run the following table creations:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE recent_resumes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    ats_score INT DEFAULT 0,
    opened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY user_file (user_id, file_name),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

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
