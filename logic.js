window.onload = function () {
  Crafty.init(501, 501, document.getElementById('cr-stage'));
  var randomX = Math.floor(Math.random() * 451);
  var randomY = Math.floor(Math.random() * 451);
  var playerStats = { x: 10, y: 10, w: 50, h: 50 }


  var playerBox = Crafty.e("2D, DOM, Color, Fourway, Collision, Gravity, Player")
  .attr(playerStats)
  .collision([0, 16, 16, 0, 32, 16, 16, 32])
  .color("white")
  .fourway(2)
  .bind("Move", function(evt) { // after player moved
    var hitDatas, hitData;
    if ((hitDatas = this.hit('Wall'))) { // check for collision with walls
      hitData = hitDatas[0]; // resolving collision for just one collider
      if (hitData.type === 'SAT') { // SAT, advanced collision resolution
        // move player back by amount of overlap
        this.x -= hitData.overlap * hitData.nx;
        this.y -= hitData.overlap * hitData.ny;
      } else { // MBR, simple collision resolution
        // move player to previous position
        this.x = evt._x;
        this.y = evt._y;
      }
    }
  });
  playerBox.z = 2;

  
  
  var wallBottom = Crafty.e('Wall, 2D, DOM, Color, Collision')
    .attr({ x: 0, y: 500, w: 501, h: 1 })
    .color('red');
  var wallTop = Crafty.e('Wall, 2D, DOM, Color, Collision')
    .attr({ x: 0, y: 0, w: 501, h: 1 })
    .color('red');
  var wallLeft = Crafty.e('Wall, 2D, DOM, Color, Collision')
    .attr({ x: 0, y: 0, w: 1, h: 501 })
    .color('red');
  var wallRight = Crafty.e('Wall, 2D, DOM, Color, Collision')
    .attr({ x: 500, y: 0, w: 1, h: 501 })
    .color('red');


  var Dot = function (x, y) {
    this.x = x;
    this.y = y
  }
  var randomCoordinates = function () {
    //for (var i = 0; 1 < 100; i++) {
    //  var randomX = Math.floor(Math.random() * 3) + 1;
    //console.log(randomX)
    //}
    console.log(randomX)
    console.log(randomY)
  };
  $("#start-button").click(randomCoordinates);
}