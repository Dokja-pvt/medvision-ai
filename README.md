<div align="center">
  <h1>🚀 Medvision AI</h1>
  <h3>Multimodal Intelligent Pharmaceutical Assistant</h3>
</div>

<br />

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=3ECF8E" alt="Supabase" />
  <img src="https://img.shields.io/badge/Gemini_2.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini" />
</div>

---

## 🌟 Overview
Medvision AI is a highly advanced clinical assistant designed to democratize medical knowledge. It uses advanced multimodal AI to securely parse complex physical prescriptions, translate chemical structures from medication labels, and provide an interactive, persistent pharmaceutical chatting experience directly in your pocket.

## ✨ Core Features
- **📸 Smart Scanner (Gemini 2.5 Flash)**: Natively parses hardware camera captures or physical file uploads of pill bottles and prescription labels, synthesizing them into readable generated markdown grids.
- **💬 Pharma Bot (Persistent Chat)**: Engage deeply with your medical records using ChatGPT-style session memory buffers explicitly tied to your user arrays.
- **🔐 Secure Medical History (Supabase)**: Edge-hosted Postgres databases mapped via JSONB ensure your intelligence interactions stay securely connected to your isolated profile.
- **📄 PDF Report Export**: Export clinical scan data directly into a sanitized document dynamically stripped of application UI layers for clean medical printing.

---

## 🛠️ Tech Stack
- **Frontend Engine**: React + Vite
- **UI Architecture**: Tailwind CSS
- **Database & Authentication**: Supabase (Postgres Edge Hook)
- **Artificial Intelligence**: Google Gemini 2.5 Flash Vision API

---

## 🚀 Setup Instructions

1. **Clone the repository:**
```bash
git clone https://github.com/Dokja-pvt/medvision-ai.git
cd medvision-ai
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure Environment Variables:**
Create a `.env` file natively in the root directory and securely map the following endpoints:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_vision_api_key
```

4. **Launch the Application:**
```bash
npm run dev
```

---

## 👨‍💻 Developed By

**Dokja (Furqan Mohammad)**
- 📧 **Email:** [mabbpl1@gmail.com](mailto:mabbpl1@gmail.com)
- 💼 **LinkedIn:** [furqan-mohammad](https://www.linkedin.com/in/furqan-mohammad/)

---

## ⚠️ Medical Disclaimer
**Medvision AI is strictly an educational tool.** The Generative AI outputs and clinical abstractions formulated within this ecosystem do not substitute the advice of licensed healthcare professionals. Always consult your personal doctor or pharmacist before modifying, ceasing, or initiating any medication protocols.
