function splitMass() {
  if (playerBox.h >= 55) {
    console.log("splitting mass")
    playerBox.h = playerBox.h / 2;
    playerBox.w = playerBox.w / 2;
    console.log(playerBox.h)
    var playerClone = Crafty.e("2D, DOM, Color, Fourway, Collision, Player, DebugRectangle, Gravity")
    .attr(playerStats)
    .collision()
    .debugStroke('red')
    .color("white")
    .fourway(200)
    .gravityConst(250)
    .gravity("Player")
    .bind("Moved", function (evt) { // after player moved    
      if (this.hit('solid')) {
        this[evt.axis] = evt.oldValue;
        console.log("Player Width: " + this.w)
        console.log("Player Height: " + this.h)
      }
    });
    playerClone.x = playerClone.x + 50;
  }
};

var randomDotAttributes = function () {
  var letters = '0123456789ABCDEF';
  var dotColor = '#';
  for (var i = 0; i < 6; i++) {
    dotColor += letters[Math.floor(Math.random() * 16)];
  };//picks random hex codes for color

  var randomX = Math.floor(Math.random() * 501);
  var randomY = Math.floor(Math.random() * 501);//sets random x and y values for each dot
  console.log("Random X: " + randomX)
  var precision = 20; // 2 decimals
  var randomWH = Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1 * precision);
  var newDot = Crafty.e("2D, DOM, Color, Collision, newDot, DebugRectangle")
    .attr({ x: randomX, y: randomY, w: randomWH, h: randomWH })
    .color(dotColor)
    .collision()
    .debugStroke("red")
  newDot.checkHits("Player").bind("HitOn", function (hitData) {
    splitMass();//if player mass is large enough, divides mass by 2 and clones the player
    this.destroy();
  });
  newDot.debugRectangle(newDot)
};

  Crafty.init(500, 500, document.getElementById('cr-stage'));
  var playerStats = { x: 237, y: 225, w: 25, h: 25 }


  //sets the player entity attributes
  var playerBox = Crafty.e("2D, DOM, Color, Fourway, Collision, Player, DebugRectangle")
    .attr(playerStats)
    .collision()
    .debugStroke('red')
    .color("white")
    .fourway(200)
    .bind("Moved", function (evt) { // after player moved    
      if (this.hit('solid')) {
        this[evt.axis] = evt.oldValue;
        console.log("Player Width: " + this.w)
        console.log("Player Height: " + this.h)
      }
    });
  playerBox.debugRectangle(playerBox)

  playerBox.z = 2;

  playerBox.checkHits("newDot").bind("HitOn", function (hitData) {
    var precision = 20; // 2 decimals
    var randomWH = Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1 * precision);
    this.w = this.w + randomWH;
    this.h = this.h + randomWH;
    console.log(this.x)
  });

  //sets up walls for collision with the player entity
  var wallBottom = Crafty.e('solid, 2D, DOM, Color, bottom')
    .attr({ x: 0, y: 525, w: 501, h: 1 })
    .color('red');
  var wallTop = Crafty.e('solid, 2D, DOM, Color, top')
    .attr({ x: 0, y: -25, w: 501, h: 1 })
    .color('red');
  var wallLeft = Crafty.e('solid, 2D, DOM, Color, left')
    .attr({ x: -25, y: 0, w: 1, h: 501 })
    .color('red');
  var wallRight = Crafty.e('solid, 2D, DOM, Color, right')
    .attr({ x: 525, y: 0, w: 1, h: 501 })
    .color('red');




$("#start-button").click(function () {
  var countTime = 0;
  var countIntervalSteps = setInterval(function () {//sets up an interval that stops at 50
    countTime++
    // console.log(countTime)
    randomDotAttributes();//creates a new "dot" on the screen every time this is called
    if (countTime === 50) {
      clearInterval(countIntervalSteps)
    }
  }, 10);
});

