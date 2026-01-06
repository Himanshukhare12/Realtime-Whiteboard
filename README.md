
## Overview
Realtime-Whiteboard is a collaborative online whiteboard application that allows multiple users to draw, write, and share ideas in real-time. It supports various tools like pencil, eraser, sticky notes, and image uploads.

## Features
- **Drawing Tools**: Pencil with adjustable size and color.
- **Eraser**: Erase parts of the drawing.
- **Sticky Notes**: Add and move sticky notes on the board.
- **Image Upload**: Upload and place images on the board.
- **Undo/Redo**: Undo and redo actions.
- **Download**: Download the current state of the whiteboard.
- **Real-time Collaboration**: Multiple users can collaborate in real-time.
 - **Light/Dark Theme**: Toggle between light and dark modes; preference is saved.

## UI/UX Improvements
- Modern, clean toolbar and brand header for clarity.
- Improved accessibility: descriptive labels, better focus/hover states.
- Subtle canvas grid background for orientation without distraction.
- Responsive layout: toolbar and controls adapt to smaller screens.

## Run Locally
1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

3. Open `http://localhost:3000` in your browser.

Note: The client currently connects to a hosted Socket.IO server for collaboration. Local-only drawing works without a socket connection.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Real-time Communication**: Socket.io