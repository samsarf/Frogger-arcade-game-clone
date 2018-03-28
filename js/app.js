// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 40;
    this.speed= 100 + Math.floor(Math.random() * 150);
    

};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
   
    this.x +=  (dt * this.speed);
// When bug goes off one side, reappear on the other side
  
  if (this.x > 650){
    this.x = -100;
  }
};


// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class

var Player = function (x,y) {

    this.sprite = 'images/char-princess-girl.png';
    this.x =x;
    this.y = y;
    this.width = 20;
    this.height = 40;

};


// This class requires an update(), render() and
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.checkCollisions();
    
    // When player reaches water, game is won and player moves back to original start
    if (this.y <= 1) {
    alert('You Win!');
    this.reset();
    }
};


// Draw player on screen

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Players reset location 

Player.prototype.reset = function() {
  this.x = 200;
  this.y = 420;
};


// a handleInput() method. How player will move.

Player.prototype.handleInput = function(key){

switch(key) {
    case 'right':
        this.x += 101;
        break;
    case 'left':
        this.x -= 101;
        break;
    case 'up':
        this.y -= 83;
        break;
    case 'down':
        this.y += 83;
        break;
    }
  

  if (this.x < 0) this.x = 0;
  if (this.x > 410) this.x =410;
  if (this.y < 0) this.y = 0;
  if (this.y > 425) this.y = 425;

};


// Method that checks for player enemy collision and resets game.

Player.prototype.checkCollisions = function(){

  for (var i=1 ; i < allEnemies.length; i++){
    if (this.x < allEnemies[i].x + 20 &&
        this.x + 40 > allEnemies[i].x && 
        this.y < allEnemies[i].y + 40 &&
        this.y + 50 > allEnemies[i].y)
 
  {
    this.reset();
    console.log("Collision detected!");
  }

  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = [];
for (var i=1; i<4; i++) {
    var enemy = new Enemy(50-i*101, 83*i-20);
    allEnemies.push(enemy);
    console.log(enemy);
}

// Place the player object in a variable called player

var player = new Player(200,420);

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
