# 🎮 Tic-Tac-Toe Game

A modern, feature-rich Tic-tac-toe game with stunning 90's purple aesthetic, smart AI opponent, and immersive sound effects.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## ✨ Features

### 🎨 **Visual Design**
- **90's Purple Color Scheme**: Beautiful gradient background using "Minimal Colors - Purple 90'S" palette
- **Distinct Player Colors**: Player X (Ice Cold blue) vs Player O (Purple Pain)
- **Winning Animation**: Special effects for victorious combinations
- **Responsive Design**: Perfect on desktop, tablet, and mobile

### 🎵 **Audio Experience**
- **Web Audio API**: High-quality programmatically generated sounds
- **Three Sound Types**: Move (800Hz), Win (1200Hz), Draw (600Hz)
- **Automatic Initialization**: Works seamlessly across all browsers

### 🧠 **Game Modes**
- **👥 Human vs Human**: Classic two-player gameplay
- **🤖 Human vs AI**: Smart AI with strategic win/block detection
- **⏱️ Blitz Mode**: 30-second timer with visual countdown and warnings

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software required!

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/sandeepbehera21/Tic-Tac-Toe.git
   cd tic-tac-toe
   ```

2. **Open the game**
   - Double-click `index.html` to open in your browser
   - Or use: `python -m http.server 8000` then visit `http://localhost:8000`

## 🎮 How to Play

1. **Choose Game Mode**: Human vs Human or Human vs AI
2. **Optional Blitz Mode**: Enable 30-second timer for fast-paced action
3. **Take Turns**: Click empty squares to place X or O
4. **Win**: Get three in a row (horizontally, vertically, or diagonally)
5. **Reset**: Click "Reset Game" to start over

## 🎨 Color Palette

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Ice Cold** | `#A0D2EB` | Player X, Background start |
| **Freeze Purple** | `#E5EAF5` | Background transition |
| **Medium Purple** | `#D0BDF4` | Background middle, Winning animation |
| **Purple Pain** | `#8458B3` | Player O, Background end |
| **Heavy Purple** | `#494D5F` | Player O, Background end |

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic structure and accessibility
- **CSS3**: Modern styling with gradients, animations, responsive design
- **JavaScript (ES6+)**: Game logic, AI implementation, audio handling
- **Web Audio API**: High-quality sound generation
- **CSS Grid & Flexbox**: Responsive layout system

### AI Strategy
1. **Win Detection**: Looks for winning opportunities
2. **Block Defense**: Prevents player from winning
3. **Center Control**: Prioritizes center position
4. **Corner Strategy**: Takes corner positions when available
5. **Random Fallback**: Makes random moves when no strategy applies

## 📱 Responsive Design

- **Desktop**: Full layout with side timer panel
- **Tablet**: Optimized spacing and touch-friendly controls
- **Mobile**: Stacked layout with compact timer display

## 🎯 Future Enhancements

- [ ] Score Tracking: Persistent win/loss statistics
- [ ] Multiple AI Difficulties: Easy, Medium, Hard modes
- [ ] Custom Themes: Additional color schemes
- [ ] Sound Customization: Volume controls and sound selection
- [ ] Online Multiplayer: Real-time gameplay with friends

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## 📞 Contact

- **Project Link**: (https://github.com/sandeepbehera21/Tic-Tac-Toe.git)

---

<div align="center">

**⭐ Star this repository if you found it helpful! ⭐**

Made with ❤️ and lots of 🟪 purple 🟪

</div>
