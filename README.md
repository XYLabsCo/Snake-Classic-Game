# Classic Snake Game

![alt text](https://i.ibb.co/DtGW2sM/screen-capture-1.gif)

This repository contains a simple implementation of the classic Snake game in HTML, CSS, and JavaScript. You control a snake which grows by eating apples that randomly appear in the game area. The game speeds up as the score increases and the game ends if the snake touches itself or the border of the game area.

## Overview

Here's a quick look at the game's main elements:

- The snake - a line of dots that the player controls.
- The apple - a single dot that the snake can eat to grow longer.
- The game area - a defined space in which the snake can move. The snake dies if it hits the border of this area.
- The leaderboard - displays the top 10 high scores stored in the local storage of the user's browser.

## Usage

- Clone this repository
- Open the index.html file in your web browser to start the game.

### Use the arrow keys to control the snake:

- ArrowUp to move up
- ArrowDown to move down
- ArrowLeft to move left
- ArrowRight to move right

## Code Structure

The project contains three main files:

- index.html - contains the basic structure of the game including game container, game board, score display, status, and the leaderboard.

- snake.css - defines the styles for the game. It's linked to index.html.

- snake.js - contains the JavaScript code that controls the game logic. This file is also linked to index.html.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT