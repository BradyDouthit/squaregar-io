
var randomDotAttributes = function () {
  var letters = '0123456789ABCDEF';
  var dotColor = '#';
  for (var i = 0; i < 6; i++) {
    dotColor += letters[Math.floor(Math.random() * 16)];
  };//picks random hex codes for color

  var randomX = Math.floor(Math.random() * 501);
  var randomY = Math.floor(Math.random() * 501);//sets random x and y values for each dot
  var newDot = Crafty.e("2D, DOM, Color, Collision, newDot, DebugRectangle")
    .attr({ x: randomX, y: randomY, w: 10, h: 10 })
    .color(dotColor)
    .collision()
    .debugStroke("red")
    newDot.checkHits("Player").bind("HitOn", function(hitData) {
      this.color("green");
      this.w = this.w + 3;
      this.h = this.h + 3;
    });
    newDot.debugRectangle(newDot)
};

window.onload = function () {
  Crafty.init(501, 501, document.getElementById('cr-stage'));
  var playerStats = { x: 10, y: 10, w: 50, h: 50 }


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
      }
    });
    playerBox.debugRectangle(playerBox)

    playerBox.z = 2;

    playerBox.checkHits("newDot").bind("HitOn", function(hitData) {
      this.color("green");
      this.w = this.w + 3;
      this.h = this.h + 3;
    });

  //sets up walls for collision with the player entity
  var wallBottom = Crafty.e('solid, 2D, DOM, Color, bottom')
    .attr({ x: 0, y: 500, w: 501, h: 1 })
    .color('red');
  var wallTop = Crafty.e('solid, 2D, DOM, Color, top')
    .attr({ x: 0, y: 0, w: 501, h: 1 })
    .color('red');
  var wallLeft = Crafty.e('solid, 2D, DOM, Color, left')
    .attr({ x: 0, y: 0, w: 1, h: 501 })
    .color('red');
  var wallRight = Crafty.e('solid, 2D, DOM, Color, right')
    .attr({ x: 500, y: 0, w: 1, h: 501 })
    .color('red');
}



$("#start-button").click(function () {
  var countTime = 0;
  var countIntervalSteps = setInterval(function () {//sets up an interval that stops at 50
    countTime++
    console.log(countTime)
    randomDotAttributes();//creates a new "dot" on the screen every time this is called
    if (countTime === 50) {
      clearInterval(countIntervalSteps)
    }
  }, 10);
});
