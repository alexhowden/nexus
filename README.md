# Nexus

A cyberpunk-themed AI automation platform for handling boring tasks. Built with React, Material-UI, and Electron.

## 🎯 Vision

Nexus is your AI-powered automation hub that eliminates boring, repetitive tasks. Built to integrate with Gmail, Google Calendar, and Google Tasks, it intelligently manages your digital life.

### Core Features
- **Gmail → Calendar**: Auto-extract events from emails (flights, hotels, appointments)
- **Task Automation**: Parse emails for action items and sync with Google Tasks
- **Unified To-Do List**: Manage all tasks from one place with smart prioritization
- **Email Management**: Smart categorization, priority detection, auto-archiving

### Planned Automations
- **Meeting Assistant**: Prep, notes, and action item extraction
- **Travel Automation**: Itinerary building, flight tracking, packing lists
- **Bill Tracking**: Payment reminders and expense categorization
- **Contact Management**: Auto-update contacts, birthday reminders, follow-ups
- **Document Organization**: Smart filing, receipt management, search
- **Shopping & Errands**: Lists, price tracking, package tracking

See [FEATURES.md](FEATURES.md) for the complete roadmap.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run the app (web version)
npm start

# Run as Electron app
npm run start:electron
```

## 🛠️ Tech Stack

- **Frontend**: React + Material-UI with cyberpunk theme
- **Desktop**: Electron (optional)
- **Styling**: Custom cyberpunk theme with animations

## 📁 Project Structure

```
nexus/
├── src/
│   ├── components/     # React components
│   ├── App.js          # Main app component
│   ├── App.css         # Cyberpunk styling
│   └── index.js        # Theme configuration
├── public/             # Static assets
└── electron/           # Electron configuration (optional)
```

## 🎨 UI Theme

The app features a custom cyberpunk theme with:
- Neon pink (#ff0040) and cyan (#00ffff) accents
- Orbitron and Rajdhani fonts
- Scanline and noise effects
- Glowing buttons and borders
- Smooth animations

## 🔮 Roadmap

This is a barebones starter. Future development will focus on:
1. AI agent integration
2. Gmail API connection
3. Google Calendar automation
4. Task extraction and management
5. Custom automation workflows

## License

MIT
