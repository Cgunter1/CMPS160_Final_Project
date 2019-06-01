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
      this.songs = [document.getElementById("song1"), document.getElementById("song2")];
      this.currentSong = 0;
      this.radioOn = false;
   }

   

   keyDown(ev) {
      var keyName = event.key;

      switch (keyName) {
         case "a":
            break
         case "d":
            break
         case "w":
         this.camera.dolly(1);
            break
         case "s":
         this.camera.dolly(-1);
            break
         case "z":
            break
         case "m":
            document.getElementById("ambientnoise").volume = .5;
            document.getElementById("ambientnoise").play();
            break;
      }
   }

   mouseUp(ev) {
      this.isMouseDown = false;
   }

   mouseMove(ev) {
      var movementX = ev.movementX;
      // console.log("The x is "+ev.movementX)
      // console.log("The y is "+ev.movementY)
      if (this.isMouseDown && movementX != 0) {

         
         this.camera.pan(ev.movementX);
      }
      var movementY = ev.movementY;
      if (this.isMouseDown && movementY != 0) {

         
         this.camera.tilt(ev.movementY);
      }
   }
   mouseDown(ev) {
      renderer.render();
      let x = ev.clientX;
      let y = ev.clientY;
      let rect = ev.target.getBoundingClientRect();
      x = (x - rect.left);
      y = (rect.bottom - y);
      console.log(x, y);
      var pixels = new Uint8Array(4);
      gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
      console.log(pixels);


   //    const x=200
   //    const y=200


   //    var pixels = new Uint8Array(
   //       4 * context.drawingBufferWidth * context.drawingBufferHeight
   //   );
   //   context.readPixels(
   //       0,
   //       0,
   //       context.drawingBufferWidth,
   //       context.drawingBufferHeight,
   //       context.RGBA,
   //       context.UNSIGNED_BYTE,
   //       pixels
   //   );
   //   // And here's components of a pixel on (x, y):
   //   var pixelR = pixels[4 * (y * context.drawingBufferWidth + x)];
   //   var pixelG = pixels[4 * (y * context.drawingBufferWidth + x) + 1];
   //   var pixelB = pixels[4 * (y * context.drawingBufferWidth + x) + 2];
   //   var pixelA = pixels[4 * (y * context.drawingBufferWidth + x) + 3];

   //   console.log(pixelR,pixelG,pixelB,pixelA)


   

      // var x = ev.clientX;
      // var y = ev.clientY;


      if (pixels[0] === 255 && pixels[1] === 255 && pixels[2] === 0){
         let horn = document.getElementById("carhorn");
         horn.play();
         console.log(horn);
      }


      if (pixels[0] === 255 && pixels[1] === 0 && pixels[2] === 0){
         if(!this.radioOn){
            this.radioOn = !this.radioOn;
            this.songs[this.currentSong].play();
         } else {
            this.radioOn = !this.radioOn;
            this.songs[this.currentSong].pause();
         }
         this.songs[this.currentSong].volume = .05;
      }

      if (pixels[0] === 255 && pixels[1] === 165 && pixels[2] === 0){
         if(this.radioOn){
            this.songs[this.currentSong].pause();
            ++this.currentSong;
            this.currentSong %= this.songs.length
            this.songs[this.currentSong].play();
         }
         this.songs[this.currentSong].volume = .05;
      }



      console.log(x,y)
     
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

   var thewalls = [
      [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,1,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2],
      [1,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,1,0,0,0,0,0,2],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,2],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [1,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,2],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,2],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,2],
      [1,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,2],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]

   ]

   for (let i=0; i < 32; i++){
      for (let j=0; j < 32; j++){


         for (var height =0; height < thewalls[i][j]; height++){
            var shape = new tiltedCube(shaderNew, i, height, -j, null, null, null, 1, walls);
               _inputHandler.scene.addGeometry(shape);

         }
      
      }
   }







}
