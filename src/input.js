var _inputHandler = null;

/**
 * Specifies a Input Handler. Used to parse input events from a HTML page.
 *
 * @author Lucas N. Ferreira
 * @this {Scene}
 */
var size = 32;
class InputHandler {
    /**
     * Initializes the event handeling functions within the program.
     */
    constructor(canvas, scene, camera) {
      this.canvas = canvas;
      this.scene = scene;
      this.camera = camera;

      _inputHandler = this;

      this.image = null;

      this.canvas.onmousemove = function(ev) { _inputHandler.mouseMove(ev) };
      this.canvas.onmousedown = function(ev) { _inputHandler.mouseDown(ev); };
      this.canvas.onmouseup = function() { _inputHandler.mouseUp(); };
      document.addEventListener('keydown', function(ev) {_inputHandler.keyDown(ev)});
      document.addEventListener('keyup', function(ev) {_inputHandler.keyUp(ev)});
      document.addEventListener("wheel", function(ev) {_inputHandler.mouseWheel(ev)});
    }

    keyDown(ev){
      var keyName = event.key;
      if(keyName == "a"){
        this.camera.truck(-1);
      }
      else if (keyName == "d"){
        this.camera.truck(1);
      }
      else if (keyName == "w"){
        this.camera.dolly(1);
      }
      else if (keyName == "s"){
        this.camera.dolly(-1);
      }
      else if(keyName == "z"){
        this.camera.switchView(1);
      }
    }

    mouseUp(ev) {
      this.isMouseDown = false;
    }

    mouseMove(ev) {
      var movementX = ev.movementX;
      if(movementX != 0 && this.isMouseDown){
        this.camera.pan(ev.movementX);
      }
      var movementY = ev.movementY;
      if(movementY != 0 && this.isMouseDown){
        this.camera.tilt(ev.movementY);
      }
    }
    mouseDown(ev) {
    this.isMouseDown = true;
    }

    mouseWheel(ev){
      var dir = Math.sign(ev.deltaY);
      this.camera.zoom(dir);
    }

    keyUp(ev) {
        return true;
    }
}

function start(){
  var sky = new Image();
  sky.src = "objs/sky.jpg";
  sky.onload = function() {
      _inputHandler.image = sky;
      var shape = new tiltedCube(shaderNew, -.0001, -.0001, 0, null, null, null, size, sky);
      _inputHandler.scene.addGeometry(shape);
  };
  var ground = new Square(shaderOld, 0, 0.001, 0, 34, 139, 50, size);
  _inputHandler.scene.addGeometry(ground);
  var walls = new Image();
  walls.onload = function() {
      _inputHandler.image = walls;
      generateWalls(walls);
  };
  walls.src = "objs/redbrick.jpg";
}

function generateWalls(walls){
  var wall =  [[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
               [4,1,0,2,4,0,2,0,3,0,0,0,0,0,0,4,0,3,2,2,0,0,0,0,0,0,0,3,4,0,0,4],
               [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
               [4,3,0,0,0,1,0,0,0,0,2,0,0,0,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,4],
               [4,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,4],
               [4,0,3,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,4],
               [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,4],
               [4,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,4],
               [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,2,0,0,0,0,0,0,0,3,0,4],
               [4,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
               [4,0,0,3,0,0,0,0,0,0,1,0,0,0,4,3,2,0,0,0,0,0,4,0,0,0,3,0,0,0,0,4],
               [4,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
               [4,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,4],
               [4,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
               [4,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
               [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
               [4,0,0,0,0,0,0,0,0,0,2,3,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
               [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,2,4],
               [4,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,4,0,0,0,0,0,0,0,4],
               [4,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,4],
               [4,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
               [4,0,0,0,0,0,0,0,2,2,4,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,4],
               [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,4],
               [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
               [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,4,0,0,0,0,0,0,4],
               [4,0,0,0,2,0,0,0,0,0,0,0,0,2,1,1,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,4],
               [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
               [4,0,0,0,2,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
               [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,3,0,4],
               [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
               [4,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,3,0,0,0,0,0,0,4],
               [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]];
  for(let i=0; i<wall.length; i++){
    for(let j=0; j<wall[i].length; j++){
      if(wall[i][j] != 0){
        for(var height = 0; height<wall[i][j]; height++){
          var shape = new tiltedCube(shaderNew, i, height, -j, null, null, null, 1, walls);
          _inputHandler.scene.addGeometry(shape);
        }
      }
    }
  }
}
