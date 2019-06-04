var _inputHandler = null;


var size = 32;
class InputHandler {

   constructor(canvas, scene, camera, dashboardItems) {
      this.canvas = canvas;
      this.scene = scene;
      this.camera = camera;
      _inputHandler = this;
      this.image = null;
      this.dashboardItems = dashboardItems;
      this.canvas.onmousemove = function (ev) { _inputHandler.mouseMove(ev) };
      this.canvas.onmousedown = function (ev) { _inputHandler.mouseDown(ev); };
      this.canvas.onmouseup = function () { _inputHandler.mouseUp(); };
      document.addEventListener('keydown', function (ev) { _inputHandler.keyDown(ev) });
      document.addEventListener('keyup', function (ev) { _inputHandler.keyUp(ev) });
      this.songs = [document.getElementById("song1"), document.getElementById("song2")];
      this.currentSong = 0;
      this.radioOn = false;
   }

   

   // Make speed a certain volume of the engine noise. The higher the speed the louder the noise.
   keyDown(ev) {
      var keyName = event.key;
      let newSpeed;

      switch (keyName) {
         case "a":
            this.camera.pan(10);
            break
         case "d":
            this.camera.pan(-10);
            break
         case "w":
            newSpeed = 0;
            if(this.camera.relativeSpeed == 1){
               return;
            }
            if(this.camera.relativeSpeed == 0){
               document.getElementById("drivesound").volume = .125;
               document.getElementById("drivesound").play();
               this.camera.relativeSpeed = 1/8;
               newSpeed = -.0625;
            } else if(this.camera.relativeSpeed == -1/8) {
               document.getElementById("drivesound").pause();
               this.camera.relativeSpeed = 0;
               newSpeed = 0.0;
            } else if(this.camera.relativeSpeed < 0) {
               switch(this.camera.relativeSpeed){
                  case -1/4:
                     document.getElementById("drivesound").volume = .125;
                     this.camera.relativeSpeed = -1/8;
                     newSpeed = .0625;
                     break;
                  case -1/2:
                     document.getElementById("drivesound").volume = .20;
                     this.camera.relativeSpeed = -1/4;
                     newSpeed = .125;
                     break;
                  case -1:
                     document.getElementById("drivesound").volume = .35;
                     this.camera.relativeSpeed = -1/2;
                     newSpeed = .25;
                     break;
                  default:
                     console.log("Can't get here");
                     break;
               }
            } else {
               switch(this.camera.relativeSpeed){
                  case 1/8:
                     document.getElementById("drivesound").volume = .20;
                     this.camera.relativeSpeed = 1/4;
                     newSpeed = -.125;
                     break;
                  case 1/4:
                     document.getElementById("drivesound").volume = .35;
                     this.camera.relativeSpeed = 1/2;
                     newSpeed = -.25;
                     break;
                  case 1/2:
                     document.getElementById("drivesound").volume = .44;
                     this.camera.relativeSpeed = 1;
                     newSpeed = -.5;
                     break;
                  default:
                     console.log("Can't get here either.");
                     break;
               }
            }
            for(let i = 0; i < this.dashboardItems.length; ++i){
               this.dashboardItems[i].speed = newSpeed;
            }
            break;
         case "s":
               newSpeed = 0;
               if(this.camera.relativeSpeed == -1){
                  return;
               }
               if(this.camera.relativeSpeed == 0){
                  this.camera.relativeSpeed = -1/8;
                  document.getElementById("drivesound").volume = .125;
                  document.getElementById("drivesound").play();
                  newSpeed = .0625;
               } else if(this.camera.relativeSpeed == 1/8) {
                  document.getElementById("drivesound").pause();
                  this.camera.relativeSpeed = 0;
                  newSpeed = 0.0;
               } else if(this.camera.relativeSpeed > 0) {
                  switch(this.camera.relativeSpeed){
                     case 1/4:
                        document.getElementById("drivesound").volume = .125;
                        this.camera.relativeSpeed = 1/8;
                        newSpeed = -.0625;
                        break;
                     case 1/2:
                        document.getElementById("drivesound").volume = .20;
                        this.camera.relativeSpeed = 1/4;
                        newSpeed = -.125;
                        break;
                     case 1:
                        document.getElementById("drivesound").volume = .35;
                        this.camera.relativeSpeed = 1/2;
                        newSpeed = -.25;
                        break;
                     default:
                        console.log("Can't get here");
                        break;
                  }
               } else {
                  switch(this.camera.relativeSpeed){
                     case -1/8:
                        document.getElementById("drivesound").volume = .20;
                        this.camera.relativeSpeed = -1/4;
                        newSpeed = .125;
                        break;
                     case -1/4:
                        document.getElementById("drivesound").volume = .35;
                        this.camera.relativeSpeed = -1/2;
                        newSpeed = .25;
                        break;
                     case -1/2:
                        document.getElementById("drivesound").volume = .44;
                        this.camera.relativeSpeed = -1;
                        newSpeed = .5;
                        break;
                     case -1:
                        break;
                     default:
                        console.log("Can't get here either.");
                        break;
                  }
               }
               console.log(this.camera.relativeSpeed);
               for(let i = 0; i < this.dashboardItems.length; ++i){
                  this.dashboardItems[i].speed = newSpeed;
               }
            break;
         case "z":
            break
         case "m":
            document.getElementById("ambientnoise").volume = .4;
            document.getElementById("ambientnoise").play();
            document.getElementById("rainandthunder").volume = .5;
            document.getElementById("rainandthunder").play();
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

   // for (let i = 0; i < 32; i++) {
   //    for (let j = 0; j < 32; j++) {

   //       if (i == 0 || j == 0 || i == 31 || j == 31) {
   //          for (var height = 0; height < 4; height++) {
   //             var shape = new tiltedCube(shaderNew, i, height, -j, null, null, null, 1, walls);
   //             _inputHandler.scene.addGeometry(shape);
   //          }

   //       }
   //       else {

   //          for (var height = 0; height < getRandomArbitrary(-10, 4); height++) {
   //             var shape = new tiltedCube(shaderNew, i, height, -j, null, null, null, 1, walls);
   //             _inputHandler.scene.addGeometry(shape);
   //          }

   //       }



   //    }
   // }


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
            var shape = new tiltedCube(shaderOld, i, height, -j, null, null, null, 1, walls);
               _inputHandler.scene.addGeometry(shape);

         }
      
      }
   }







}
