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

// Handles player/enemy collisions
function collision() {
  allEnemies.forEach(function(bug){
    if (player.y == bug.y && bug.x > (player.x - 50) && bug.x < (player.x + 50)) {
        player.x = 202;
        player.y = 375;
    }
  })

}

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
    if (player.y == -25) {
      setTimeout(function() {
        player.x = 202;
        player.y = 375;
      }, 400)}
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
const bug1 = new Enemy(-400, 55, 100)
const bug2 = new Enemy(-150, 55, 300);
const bug3 = new Enemy(-220, 55, 450);
const bug4 = new Enemy(-300, 135, 250);
const bug5 = new Enemy(-200, 135, 150);
const bug6 = new Enemy(-220, 215, 280);
const bug7 = new Enemy(-150, 215, 120);

const allEnemies = [bug1, bug2]//, bug3, bug4, bug5, bug6, bug7];

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
