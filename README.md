# 🏎️ Smash Events Registration Platform  

Welcome to the **Kart Smasher** tournament management pipeline!  
This repository implements a polished React frontend integrated dynamically with an Express.js backend API and a remote PostgreSQL database, fully packaged inside lightweight Docker containers to simplify hosting processes.

## 🚀 Key Features  
- **Vite React Frontend**: Styled exclusively using utility-classes mapped dynamically to specialized design metrics powered by Tailwind CSS v4.  
- **Centralized Event Listings**: Fetches active databases of ongoing tournaments dynamically mapping states like "Live Now", dates, prices, etc.  
- **Multipart Payment Gateway**: Supports localized file uploads to serve as proof-of-transaction (using Multer).  
- **Duplicate Registration Shield**: Implements a strict `event_id` & `user_id` mapped database constraint to negate duplicate registrations elegantly yielding error handling back down the pipe.
- **Roster & Join Flow**: Real-time list of competitors allowing verified entrance directly down to the Match Links.  

## 📦 Tech Stack  
- **Frontend**: React.js 19, React Router, Vite, Tailwind CSS v4.  
- **Backend**: Node.js, Express, `pg` framework, Multer.  
- **Database**: PostgreSQL (Neon Serverless).  
- **Deployment**: Docker, Docker Compose, Nginx (Alpine).  

## 📂 Folder Structure  
```text
/
├── backend/               # Node.js Express server
│   ├── config/db.js       # Neon db connection pool
│   ├── controllers/       # Registration & Events mapping queries
│   ├── middlewares/       # Multer definitions for processing
│   ├── routes/            # REST endpoint mount definitions
│   ├── uploads/           # Directory persisting user screenshots locally
│   ├── server.js          # Entry binding components
│   └── Dockerfile         # Docker recipe for backend
├── src/                   # React Frontend Base
│   ├── components/        # Isolated Design system structures (EventCard, Button..)
│   ├── pages/             # Layout implementations
│   └── main.jsx
├── Dockerfile             # Multi-stage frontend + nginx compilation image
├── docker-compose.yml     # Composes Backend + Frontend on shared network context
└── nginx.conf             # Proxies /api/ mapping resolving CORS securely
```

## 🛠️ Quick Start (Dockerized)  

1. **Clone & Environment Setup:**   
   Create `.env` file under `backend/` and include your Postgres connection string:
   ```env
   PORT=5000
   DATABASE_URL="postgresql://user:password@endpoint"
   ```

2. **Boot Architecture:**  
   Launch docker-compose to orchestrate both systems.
   ```shell
   docker-compose up --build -d
   ```
   
3. **Access:**  
   - Frontend triggers at: `http://localhost:8080/`
   - Direct API acts at: `http://localhost:5000/api/`

## 🔗 Endpoint List  

**GET /api/events**  
Returns detailed arrays of registered tournaments natively mapping.

**GET /api/events/:id**  
Extracts isolated event metadata used closely inside `EventDetails`.

**POST /api/register**  
Consumes `multipart/form-data` creating mapping relationships.  
*Body parameters:* `name`, `uid`, `email`, `event_id`, `transaction_id`, `screenshot(File)`.  

**GET /api/events/:id/players**  
Produces roster output fetching specifically from user details matching joined parameters.

**GET /api/events/:id/join?email=xyz@email.com**  
Returns validation link ensuring the email passed maps successfully against active event queues.

## 🛟 Common Issues + Fixes  
- **`502 Bad Gateway` pointing to APIs**: Usually means Node server couldn't establish Database link during start. Verify the `DATABASE_URL` environment injection matches Neon criteria accurately.  
- **Tailwind Styles Missing**: Since we actively use Tailwind CSS **v4**, modifying base metrics demands `@config` referencing natively inside `index.css`. Old `@tailwind` directives naturally invoke failure blocks!
