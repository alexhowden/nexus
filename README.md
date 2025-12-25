# Nexus

A cyberpunk-themed productivity and task management system. Built with React, Material-UI, and Electron.

## ✨ Features

### Task Management
- **To-Do List**: Create, edit, and delete tasks with descriptions, priorities, and due dates
- **Kanban Board**: Drag-and-drop tasks between columns with visual reordering
- **Dashboard**: Real-time task statistics and alerts

### Productivity Tools
- **Pomodoro Timer**: 25/5 minute work/break cycles with session tracking
- **Notes**: Quick note-taking with full CRUD functionality
- **Settings**: Data export/import and management

### Key Capabilities
- Calendar picker for due dates
- Filter tasks by status and priority
- Mini timer widget in sidebar
- Browser notifications
- Full data persistence with localStorage
- Data backup and restore

See [docs/FEATURES.md](docs/FEATURES.md) for detailed feature list.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run the app (web version on port 3001)
npm start

# Run as Electron desktop app
npm run start:electron
```

The app will open at `http://localhost:3001`

## 🛠️ Tech Stack

- **Frontend**: React + Material-UI
- **Desktop**: Electron
- **Drag & Drop**: @dnd-kit
- **Date Picker**: react-datepicker
- **Storage**: localStorage
- **Fonts**: Orbitron, Rajdhani, Share Tech Mono

## 🎨 UI Theme

Cyberpunk-inspired design with:
- Neon pink (#ff0040) and cyan (#00ffff) accents
- Scanline and noise effects
- Custom gradient borders
- Glowing text effects
- Dark theme optimized for focus

## 📁 Project Structure

```
nexus/
├── src/
│   ├── components/     # React components
│   ├── App.js         # Main app with state management
│   └── App.css        # Cyberpunk theme styles
├── electron/          # Electron main process
├── docs/             # Documentation
└── public/           # Static assets
```

## License

MIT
