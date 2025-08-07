let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// New elements for blitz mode and timer
let blitzModeToggle = document.querySelector("#blitz-mode");
let timerSidePanel = document.querySelector("#timer-side-panel");
let timerDisplay = document.querySelector("#timer");
let timerStatus = document.querySelector("#timer-status");
let currentPlayerDisplay = document.querySelector(".current-player");

// Game mode elements
let gameModeRadios = document.querySelectorAll('input[name="game-mode"]');

// Audio elements for sound effects
let moveSound = document.querySelector("#move-sound");
let winSound = document.querySelector("#win-sound");
let drawSound = document.querySelector("#draw-sound");

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

// Timer variables
let timer = null;
let timeLeft = 30;
let blitzMode = false;

// Game mode variables
let gameMode = 'human'; // 'human' or 'ai'
let gameActive = true;

// Audio context for sound effects
let audioContext = null;
let audioInitialized = false;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Initialize audio context on first user interaction
function initAudio() {
  if (!audioInitialized) {
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioInitialized = true;
    } catch (e) {
      console.log('Audio context initialization failed:', e);
    }
  }
}

// Sound effect function
function playSound(type) {
  try {
    // Initialize audio context if not already done
    if (!audioInitialized) {
      initAudio();
    }
    
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
    if (audioContext && audioContext.state === 'running') {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      let frequency, duration, volume;
      
      switch(type) {
        case 'move':
          frequency = 800;
          duration = 0.1;
          volume = 0.3;
          break;
        case 'win':
          frequency = 1200;
          duration = 0.3;
          volume = 0.5;
          break;
        case 'draw':
          frequency = 600;
          duration = 0.2;
          volume = 0.4;
          break;
        default:
          frequency = 800;
          duration = 0.1;
          volume = 0.3;
      }
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } else {
      // Fallback to original audio elements if Web Audio API fails
      let sound;
      switch(type) {
        case 'move':
          sound = moveSound;
          break;
        case 'win':
          sound = winSound;
          break;
        case 'draw':
          sound = drawSound;
          break;
      }
      
      if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log('Audio play failed:', e));
      }
    }
    
  } catch (e) {
    console.log('Sound play error:', e);
    // Fallback to original audio elements if Web Audio API fails
    let sound;
    switch(type) {
      case 'move':
        sound = moveSound;
        break;
      case 'win':
        sound = winSound;
        break;
      case 'draw':
        sound = drawSound;
        break;
    }
    
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(e => console.log('Audio play failed:', e));
    }
  }
}

// Game mode handling
function handleGameModeChange() {
  gameMode = document.querySelector('input[name="game-mode"]:checked').value;
}

// AI Logic - Smart AI that tries to win and block
function getAIMove() {
  const availableMoves = [];
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].innerText === '') {
      availableMoves.push(i);
    }
  }
  
  if (availableMoves.length === 0) return -1;
  
  const aiSymbol = 'O';
  const playerSymbol = 'X';
  
  // Try to win
  for (let pattern of winPatterns) {
    if (canWin(pattern, aiSymbol)) {
      return getWinningMove(pattern, aiSymbol);
    }
  }
  
  // Block player from winning
  for (let pattern of winPatterns) {
    if (canWin(pattern, playerSymbol)) {
      return getWinningMove(pattern, playerSymbol);
    }
  }
  
  // Take center if available
  if (boxes[4].innerText === '') return 4;
  
  // Take corners
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(index => boxes[index].innerText === '');
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }
  
  // Take any available move
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

function canWin(pattern, symbol) {
  const [a, b, c] = pattern;
  const cells = [boxes[a].innerText, boxes[b].innerText, boxes[c].innerText];
  const symbolCount = cells.filter(cell => cell === symbol).length;
  const emptyCount = cells.filter(cell => cell === '').length;
  return symbolCount === 2 && emptyCount === 1;
}

function getWinningMove(pattern, symbol) {
  const [a, b, c] = pattern;
  if (boxes[a].innerText === '') return a;
  if (boxes[b].innerText === '') return b;
  if (boxes[c].innerText === '') return c;
  return -1;
}

// Timer functions
function startTimer() {
  if (!blitzMode) return;
  
  timeLeft = 30;
  updateTimerDisplay();
  timerSidePanel.classList.remove('hide');
  updateCurrentPlayerDisplay();
  
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    
    // Update timer circle styling based on time remaining
    const timerCircle = document.querySelector('.timer-circle');
    timerCircle.classList.remove('warning', 'danger');
    
    if (timeLeft <= 10 && timeLeft > 5) {
      timerCircle.classList.add('warning');
    } else if (timeLeft <= 5) {
      timerCircle.classList.add('danger');
    }
    
    if (timeLeft <= 0) {
      // Time's up - current player loses
      stopTimer();
      const winner = turnO ? "X" : "O";
      showWinner(winner);
    }
  }, 1000);
}

function stopTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  const timerCircle = document.querySelector('.timer-circle');
  timerCircle.classList.remove('warning', 'danger');
}

function updateTimerDisplay() {
  timerDisplay.textContent = timeLeft;
}

function updateCurrentPlayerDisplay() {
  const currentPlayer = turnO ? "O" : "X";
  const playerType = gameMode === 'ai' && currentPlayer === 'O' ? 'AI' : `Player ${currentPlayer}`;
  currentPlayerDisplay.textContent = `${playerType}'s Turn`;
}

// Handle blitz mode toggle
blitzModeToggle.addEventListener('change', function() {
  initAudio();
  blitzMode = this.checked;
  if (blitzMode) {
    timerSidePanel.classList.remove('hide');
    startTimer();
  } else {
    timerSidePanel.classList.add('hide');
    stopTimer();
  }
});

// Handle game mode changes
gameModeRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    initAudio();
    handleGameModeChange();
  });
});

const resetGame = () => {
  turnO = true;
  count = 0;
  gameActive = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  
  // Reset timer
  stopTimer();
  if (blitzMode) {
    startTimer();
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // Initialize audio on first click
    initAudio();
    
    if (!gameActive || box.innerText !== '') return;
    
    // Always reset timer on every move if blitz mode is enabled
    if (blitzMode) {
      stopTimer();
      startTimer();
    }
    
    // Human player's turn (always X in AI mode)
    if (gameMode === 'ai') {
      // In AI mode, human is always X
      box.innerText = "X";
      box.classList.add('player-x');
      box.disabled = true;
      count++;
      
      // Play move sound
      playSound('move');
      
      // Check for human win
      if (checkWinner()) return;
      if (count === 9) {
        gameDraw();
        return;
      }
      
      // AI responds immediately
      setTimeout(() => {
        if (gameActive) {
          const aiMove = getAIMove();
          if (aiMove !== -1) {
            boxes[aiMove].innerText = 'O';
            boxes[aiMove].classList.add('player-o');
            boxes[aiMove].disabled = true;
            count++;
            
            // Play move sound for AI
            playSound('move');
            
            if (checkWinner()) return;
            if (count === 9) {
              gameDraw();
              return;
            }
          }
        }
      }, 100); // Very short delay for immediate response
      
    } else {
      // Human vs Human mode
      if (turnO) {
        box.innerText = "O";
        box.classList.add('player-o');
        turnO = false;
      } else {
        box.innerText = "X";
        box.classList.add('player-x');
        turnO = true;
      }
      box.disabled = true;
      count++;

      // Play move sound
      playSound('move');

      let isWinner = checkWinner();

      if (count === 9 && !isWinner) {
        gameDraw();
      } else if (!isWinner) {
        // Start timer for next player if blitz mode is enabled
        if (blitzMode) {
          stopTimer(); // Stop previous timer before starting a new one
          startTimer();
        }
      }
    }
  });
});

const gameDraw = () => {
  gameActive = false;
  stopTimer();
  playSound('draw');
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove('player-x', 'player-o', 'winning');
  }
};

const showWinner = (winner) => {
  gameActive = false;
  stopTimer();
  playSound('win');
  const winnerName = gameMode === 'ai' && winner === 'O' ? 'AI' : `Player ${winner}`;
  msg.innerText = `Congratulations, Winner is ${winnerName}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        // Highlight winning boxes
        pattern.forEach(index => {
          boxes[index].classList.add('winning');
        });
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", () => {
  initAudio();
  resetGame();
});
resetBtn.addEventListener("click", () => {
  initAudio();
  resetGame();
});
