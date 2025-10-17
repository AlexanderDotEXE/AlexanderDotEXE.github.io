# A* Pathfinding Visualization
## 🎯 Educational Purpose

This project is created for educational purposes only to demonstrate the A* pathfinding algorithm in action. It provides an interactive visualization of how the A* algorithm finds the shortest path between two points while avoiding obstacles.

## 🔍 Features

- Interactive grid-based visualization
- Real-time pathfinding calculation
- Custom start and end point placement
- Obstacle drawing capabilities
- Step-by-step visualization option
- Mobile responsive design (kind of)

## 🛠 Technical Implementation

The project is built using:
- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- CSS Grid/Flexbox for layout
- Modular JavaScript architecture

## 🎮 How to Use

1. **Setup Points**:
   - Right-click to set start (green) and end (red) points
   - Left-click or drag to draw obstacles (black)

2. **Controls**:
   - Use the "Start" button to begin pathfinding
   - Toggle "Visualize" checkbox to see the algorithm working step by step
   - "Reset" button clears the grid

3. **Visualization Colors**:
   - 🟢 Green: Start point
   - 🔴 Red: End point
   - ⚫ Black: Obstacles
   - 🟦 Blue: Final path
   - 🟨 Yellow: Current cell being evaluated
   - 🟧 Orange: Closed cells
   - 🟫 Dark green: Open cells

## 🔬 Algorithm Details

The A* (A-Star) pathfinding algorithm uses a best-first search approach and finds the shortest path between two points. It uses:
- G Cost: Distance from start node
- H Cost: Estimated distance to end node (heuristic)
- F Cost: G Cost + H Cost

## 🚀 Getting Started

1. Clone the repository
2. Open `index.html` in your browser
3. No build process or dependencies required!

## 📝 Note

This project is meant for learning and demonstration purposes. The implementation focuses on clarity and understanding rather than optimization for production use.

## 📖 License

This project is open-source and available for educational purposes. Feel free to use it to learn about pathfinding algorithms and their implementation.

---

Created with ❤️ by AlexanderDotEXE
