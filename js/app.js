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
      this.x = (this.x + this.speed);
    } else {
      this.x = -100;
    }
    collision();
};

function collision() {
  allEnemies.forEach(function(bug){
    if (player.y == bug.y && bug.x > (player.x - 40) && bug.x < (player.x + 40)) {
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
    //add update method
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
// Place the player object in a variable called player
const bug1 = new Enemy(-100, 55, 3);
const bug2 = new Enemy(-100, 135, 2);
const bug3 = new Enemy(-100, 215, 3);
const bug4 = new Enemy(-100, 135, 4);
const bug5 = new Enemy(-100, 55, 5);

const allEnemies = [bug1, bug2, bug3, bug4, bug5];

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
