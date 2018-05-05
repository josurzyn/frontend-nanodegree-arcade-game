// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Start location and speed
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
      this.x = this.x + (this.speed * dt);
    } else {
      this.x = -200;
    }
    collision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//Player as ES6 Class
class Player {
  constructor(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
  }

  update(dt) {
    // Reset player on win
    collectItem();
    if (player.y == -25) {
      //setTimeout(function() {
        player.x = 202;
        player.y = 375;
      //}, 400)
      win();
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(allowedKeys) {
    if (allowedKeys == 'left' && player.x > 0) {
      player.x -= 101;
    }
    if (allowedKeys == 'up' && player.y > 0) {
      player.y -= 80;
    }
    if (allowedKeys == 'right' && player.x < 404) {
      player.x += 101;
    }
    if (allowedKeys == 'down' && player.y < 375) {
      player.y += 80;
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const bug1 = new Enemy(-150, 215, 100)
const bug2 = new Enemy(-200, 55, 150);
const bug3 = new Enemy(-320, 135, 175);
const bug4 = new Enemy(-300, 55, 50);
const bug5 = new Enemy(-100, 135, 120);
const bug6 = new Enemy(-220, 215, 230);
const bug7 = new Enemy(-150, 215, 120);
const bug8 = new Enemy(-150, 55, 120);
const bug9 = new Enemy(-150, 135, 200);
const bug10 = new Enemy(-150, 215, 220);

let allEnemies = [bug1, bug2];

// Place the player object in a variable called player
const player =  new Player(202, 375);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Handles player/enemy collisions
function collision() {
  allEnemies.forEach(function(bug){
    if (player.y == bug.y && bug.x > (player.x - 50) && bug.x < (player.x + 50)) {
        player.x = 202;
        player.y = 375;
        updateScores();
        score = 0;
        displayScore.innerText = 'Score: ' + score;
        let speedIncrease = runs * 10;
        allEnemies.forEach(function(bug) {
          bug.speed -= speedIncrease;
          bug.x = -100;
        })
        allEnemies = [bug1, bug2];
        runs = 0;
        allSpecialItems = [];
    }
  })
}

// Add score to game
// Variables to access Scores
let displayScore = document.querySelector('.score');
let score = 0;
let runs = 0;
displayScore.innerText = 'Score: ' + score;
let lastScore = document.querySelector('.last-score');
let displayBestScore = document.querySelector('.best-score');
let bestScore = 0;

// Hold top score for session
function updateScores() {
  lastScore.innerText = 'Last score: ' + score;
  if (score > bestScore) {
    bestScore = score;
    displayBestScore.innerText = 'Best Score: ' + bestScore;
  }
}

// Update score on player win and increase difficulty
function win() {
  score += 1000;
  displayScore.innerText = 'Score: ' + score;
  runs += 1;
  //speed up bugs
  allEnemies.forEach(function(bug){
    bug.speed += 10;
  });
  if (runs == 1){
    allEnemies.push(bug3);
  }
  if (runs == 2){
    allEnemies.push(bug4);
    allSpecialItems.push(blueGem);
  }
  if (runs == 3){
    allEnemies.push(bug5);
  }
  if (runs == 4){
    allEnemies.push(bug6);
    allSpecialItems.push(greenGem);
  }
  if (runs == 5){
    allEnemies.push(bug7);
  }
  if (runs == 6){
    allEnemies.push(bug8);
    allSpecialItems.push(orangeGem);
  }
  if (runs == 7){
    allEnemies.push(bug8);
  }
  if (runs == 8){
    allEnemies.push(bug8);
    allSpecialItems.push(goldKey);
  }
  if (runs == 9){
    allEnemies.push(bug9);
  }
  if (runs == 10){
      allEnemies.push(bug10);
      allSpecialItems.push(star);
    }
}

// Add Gem class
class SpecialItem {
  constructor(sprite, x, y, value) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.value = value;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

const blueGem = new SpecialItem('images/Gem-Blue.png', 101, 215, 200);
const greenGem = new SpecialItem('images/Gem-Green.png', 404, 55, 400);
const orangeGem = new SpecialItem('images/Gem-Orange.png', 202, 135, 600);
const goldKey = new SpecialItem('images/Key.png', 404, 215, 1000);
const star = new SpecialItem('images/Star.png', 0, 55, 5000);

let allSpecialItems = [];

function collectItem(){
  allSpecialItems.forEach(function(item){
    if (player.x == item.x && player.y == item.y){
      score += item.value;
      displayScore.innerText = 'Score: ' + score;
      allSpecialItems.pop();
    }
  })
}
