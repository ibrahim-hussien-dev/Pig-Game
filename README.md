# Pig Game

A simple two-player dice game where players race to reach a target score by balancing risk and reward.

## How to Play

1. Players take turns rolling a die.
2. Each roll (except `1`) is added to the **current turn score**.
3. A player can choose to **Hold** to add the current turn score to their total score.
4. If a player rolls a `1`, their turn ends and the current turn score is lost.
5. First player to reach the winning score (commonly 100) wins.

## Features

- Two-player turn-based gameplay
- Current turn and total score tracking
- Hold mechanic to bank points
- Automatic turn switching on rolling `1`
- Win condition handling

## Project Structure

```text
.
└── README.md
```

## Getting Started

Since this repository currently contains only documentation, add your game implementation files (for example, `index.html`, `style.css`, and `script.js`) and then open the app in a browser or run it with your preferred local server.

## Suggested Next Steps

- Add the game UI (player panels, score areas, and controls)
- Implement game logic in JavaScript
- Add reset/new game functionality
- Write tests for core scoring and turn-switching logic
