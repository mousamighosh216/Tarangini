# Tarangini

## AI‑Assisted PCOS Support Platform

Tarangini is a full‑stack health‑tech web application designed to help people with symptoms of Polycystic Ovary Syndrome (PCOS) by providing:

- 🚨 Symptom‑based PCOS risk prediction with an ML model
- 💬 Anonymous public support forum
- 📅 Lightweight menstrual cycle tracker
- 📍 Nearest gynecologist/consultant finder

The project was built during a hackathon and follows a monolithic architecture for rapid development. It uses:

- **Backend:** FastAPI, Python, PostgreSQL
- **Frontend:** React, Vite
- **Machine Learning:** Scikit‑learn (Random Forest, Logistic Regression)
- **Database:** PostgreSQL (SQLAlchemy ORM)

---

## 🚀 Quick Start

### Prerequisites

- Python 3.10+
- node 18+ / npm 9+ or yarn
- PostgreSQL database

### Backend

```bash
cd backend
python -m venv .venv
# Windows
.venv\\Scripts\\activate
# macOS/Linux
source .venv/bin/activate
pip install -r requirements.txt
```

Configure `.env` (see `backend/.env.example`) with your database URL and secret settings.

Run the server:

```bash
uvicorn app.main:app --reload
```

Visit http://localhost:8000/docs for the interactive API documentation.

### Frontend

```bash
cd frontend
npm install     # or yarn
npm run dev     # or yarn dev
```

Open http://localhost:5173 in your browser.

### ML model

The trained model is located at `backend/app/ml/model.pkl`; training scripts are in `backend/app/ml/train.py`.

---

## 📁 Project Structure

```
tarangini/
│
├── backend/
│   │
│   ├── app/
│   │   ├── main.py
│   │   │
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── security.py
│   │   │   └── dependencies.py
│   │   │
│   │   ├── db/
│   │   │   ├── base.py
│   │   │   ├── session.py
│   │   │   └── models/
│   │   │       ├── user.py
│   │   │       ├── post.py
│   │   │       ├── comment.py
│   │   │       ├── cycle.py
│   │   │       └── consultant.py
│   │   │
│   │   ├── schemas/
│   │   │   ├── user_schema.py
│   │   │   ├── post_schema.py
│   │   │   ├── comment_schema.py
│   │   │   ├── cycle_schema.py
│   │   │   └── prediction_schema.py
│   │   │
│   │   ├── services/
│   │   │   ├── auth_service.py
│   │   │   ├── forum_service.py
│   │   │   ├── cycle_service.py
│   │   │   ├── consultant_service.py
│   │   │   └── prediction_service.py
│   │   │
│   │   ├── api/
│   │   │   ├── auth_routes.py
│   │   │   ├── forum_routes.py
│   │   │   ├── cycle_routes.py
│   │   │   ├── consultant_routes.py
│   │   │   └── prediction_routes.py
│   │   │
│   │   └── ml/
│   │       ├── train.py
│   │       ├── preprocess.py
│   │       ├── model.pkl
│   │       └── evaluate.py
│   │
│   ├── requirements.txt
│   ├── .env
│   └── README.md
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── PostCard.jsx
│   │   │   ├── CommentTree.jsx
│   │   │   ├── CycleCalendar.jsx
│   │   │   └── ConsultantCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── PostDetail.jsx
│   │   │   ├── Prediction.jsx
│   │   │   ├── Calendar.jsx
│   │   │   └── Consultants.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── routes.jsx
│   │
│   ├── package.json
│   └── README.md
│
└── README.md
```

_For more details on each subdirectory, see the corresponding README files._

---

## 🧠 Features Overview

- **Risk Prediction:** Input symptoms to receive a PCOS risk score and level.
- **Forum:** Post, comment, and reply anonymously; simple moderation available.
- **Cycle Tracker:** Log periods, view averages and predict next window.
- **Consultant Finder:** Search nearby gynecologists using static demo data.

⚠️ _This application is for educational/demo purposes only; it is not a substitute for professional medical advice._

---

## 🛠️ Contributing

Contributions are welcome! Please fork the repository and create a pull request. Follow the existing code style and update tests where applicable.

---

## 📜 License

This project is open‑source and available under the [MIT License](LICENSE).

---

> Made with ❤️ for the health‑tech community.

1️⃣ Create Virtual Environment
python -m venv venv
source venv/bin/activate
2️⃣ Install Dependencies
pip install -r requirements.txt
3️⃣ Configure Environment Variables

Create .env file:

DATABASE_URL=postgresql://user:password@localhost/tarangini
SECRET_KEY=your_secret_key
4️⃣ Run Server
uvicorn app.main:app --reload

Backend runs at:

http://127.0.0.1:8000
🎨 Frontend Setup
1️⃣ Install Dependencies
npm install
2️⃣ Start Development Server
npm run dev

Frontend runs at:

http://localhost:5173
🛡 Security & Privacy

Password hashing

JWT-based authentication

Anonymous posting (display-level only)

Sensitive health data not logged

Input validation enforced

📦 Core API Endpoints
Prediction
POST /predict
Forum
GET /posts
POST /posts
GET /posts/{id}
POST /posts/{id}/comments
Cycle Tracker
POST /cycles
GET /cycles
Consultants
GET /consultants?lat=...&lng=...
🧪 ML Training

To retrain the model:

python app/ml/train.py

Model file:

app/ml/model.pkl
📌 Project Priorities

AI Model Stability

Forum Reliability

Basic Calendar

Basic Consultant Finder

📜 Disclaimer

This application provides risk estimation and community support.
It does not provide medical diagnosis or treatment.

🏆 Built For Hackathon

Designed with scalability in mind but optimized for rapid deployment and clarity of impact.