# ⚖️ AI Legal Assistant | Multi-Agent Intelligence

A production-ready, professional-grade frontend for an AI-powered legal research platform. Built with **React 19**, **Vite**, and **Tailwind CSS**, this platform provides a high-fidelity interface for complex legal analysis and multi-agent execution tracing.

---

## 🌟 Key Features

- **Multi-Agent Conversational Interface**: Interactive chat UI designed for complex legal queries.
- **Agent Execution Tracing**: Real-time visualization of agent decision-making and tool usage.
- **Robust Citation System**: Track sources and legal precedents with integrated citation panels.
- **Premium Design System**: Modern, trustworthy UI using a custom design language with dark mode support.
- **Dynamic Animations**: Smooth transitions and micro-interactions powered by Framer Motion.

---

## 🛠️ Tech Stack

- **Core**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **API Handling**: [Axios](https://axios-http.com/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd ai-legal-assistant-web
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Production Build

Create an optimized extraction for production:
```bash
npm run build
```

---

## 📂 Project Structure

```text
src/
├── assets/             # Images, SVGs, and global assets
├── components/         # Reusable UI components (buttons, inputs, etc.)
│   ├── agent/          # Agent-specific tracing components
│   ├── chat/           # Conversational interface components
│   ├── layout/         # Header, Sidebar, and Layout wrappers
│   └── feedback/       # Banners and user response components
├── context/            # Global state management
├── pages/              # Top-level route components
├── services/           # API integration and external data handling
└── styles/             # Global CSS and Tailwind configurations
```

---

## 📜 Disclaimer

*This application is an AI-powered research assistant. It is intended for informational purposes only and does not constitute legal advice. Users should always consult with qualified legal professionals.*

---

## 📄 License

[MIT](LICENSE)
