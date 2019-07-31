
var randomDotAttributes = function () {
  var letters = '0123456789ABCDEF';
  var dotColor = '#';
  for (var i = 0; i < 6; i++) {
    dotColor += letters[Math.floor(Math.random() * 16)];
  };

  var randomX = Math.floor(Math.random() * 501);
  var randomY = Math.floor(Math.random() * 501);
  var newDot = Crafty.e("2D, DOM, Color, Collision")
    .attr({ x: randomX, y: randomY, w: 10, h: 10 })
    .color(dotColor)
    .collision([0, 16, 16, 0, 32, 16, 16, 32])
    .bind("Moved", function (evt) { // after player moved    
      if (this.hit('solid')) {
        this[evt.axis] = evt.oldValue;
      }
    });
};

window.onload = function () {
  Crafty.init(501, 501, document.getElementById('cr-stage'));
  var playerStats = { x: 10, y: 10, w: 50, h: 50 }


  var playerBox = Crafty.e("2D, DOM, Color, Fourway, Collision, Player")
    .attr(playerStats)
    .collision([0, 16, 16, 0, 32, 16, 16, 32])
    .color("white")
    .fourway(200)
    .bind("Moved", function (evt) { // after player moved    
      if (this.hit('solid')) {
        this[evt.axis] = evt.oldValue;
      }
    });



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
  var countIntervalSteps = setInterval(function () {
    countTime++
    console.log(countTime)
    randomDotAttributes();
    if (countTime === 50) {
      clearInterval(countIntervalSteps)
    }
  }, 10);
});
