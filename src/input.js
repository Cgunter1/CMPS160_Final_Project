var _inputHandler = null;


var size = 32;
class InputHandler {

   constructor(canvas, scene, camera) {
      this.canvas = canvas;
      this.scene = scene;
      this.camera = camera;
      _inputHandler = this;
      this.image = null;
      this.canvas.onmousemove = function (ev) { _inputHandler.mouseMove(ev) };
      this.canvas.onmousedown = function (ev) { _inputHandler.mouseDown(ev); };
      this.canvas.onmouseup = function () { _inputHandler.mouseUp(); };
      document.addEventListener('keydown', function (ev) { _inputHandler.keyDown(ev) });
      document.addEventListener('keyup', function (ev) { _inputHandler.keyUp(ev) });
      document.addEventListener("wheel", function (ev) { _inputHandler.mouseWheel(ev) });
   }

   keyDown(ev) {
      var keyName = event.key;

      switch (keyName) {
         case "a":
            this.camera.truck(-1);
            break
         case "d":
            this.camera.truck(1);
            break
         case "w":
            this.camera.dolly(1);
            break
         case "s":
            this.camera.dolly(-1);
            break
         case "z":
            this.camera.switchView(1);
            break
      }
   }

   mouseUp(ev) {
      this.isMouseDown = false;
   }

   mouseMove(ev) {
      var movementX = ev.movementX;
      if (movementX != 0 && this.isMouseDown) {
         this.camera.pan(ev.movementX);
      }
      var movementY = ev.movementY;
      if (movementY != 0 && this.isMouseDown) {
         this.camera.tilt(ev.movementY);
      }
   }
   mouseDown(ev) {
      this.isMouseDown = true;
   }

   mouseWheel(ev) {
      var dir = Math.sign(ev.deltaY);
      this.camera.zoom(dir);
   }

   keyUp(ev) {
      return true;
   }
}


function getRandomArbitrary(min, max) {
   return Math.random() * (max - min) + min;
}
function generateWalls(walls) {

   for (let i = 0; i < 32; i++) {
      for (let j = 0; j < 32; j++) {

         if (i==0 || j == 0 || i== 31 || j == 31){
            for (var height = 0; height < 4; height++) {
               var shape = new tiltedCube(shaderNew, i, height, -j, null, null, null, 1, walls);
               _inputHandler.scene.addGeometry(shape);
            }

         }
         else{

            for (var height = 0; height < getRandomArbitrary(-10,4); height++) {
               var shape = new tiltedCube(shaderNew, i, height, -j, null, null, null, 1, walls);
               _inputHandler.scene.addGeometry(shape);
            }

         }

        

      }
   }
}
