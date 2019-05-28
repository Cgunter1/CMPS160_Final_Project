var shader = null;

var gl = null

function main() {
   // main2();
   canvas = document.getElementById("webgl");

   gl = getWebGLContext(canvas);
   if (!gl) {
      console.log("Failed to get WebGL rendering context.");
      return;
   }
   // var pixels = new Uint8Array(4);
   // gl.readPixels(0,0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

   // console.log(pixels);
   var scene = new Scene();
   var camera = new Camera();
   var inputHandler = new InputHandler(canvas, scene, camera);

   shaderNew = new Shader(gl, ASG4_VSHADER, ASG4_FSHADER);
   shaderOld = new Shader(gl, ASG1_VSHADER, ASG1_FSHADER);
   shaderOld.addAttribute("a_Position");
   shaderOld.addAttribute("a_Color");
   shaderOld.addUniform("u_ProjectionMatrix", "mat4", new Matrix4());
   shaderOld.addUniform("u_ViewMatrix", "mat4", new Matrix4());

   shaderNew.addAttribute("a_Position");
   shaderNew.addAttribute("a_Color");
   shaderNew.addAttribute("a_TexCoord");

   shaderNew.addUniform("u_ProjectionMatrix", "mat4", new Matrix4());
   shaderNew.addUniform("u_ViewMatrix", "mat4", new Matrix4());
   shaderNew.addUniform("u_Sampler", "sampler2D", 0);

   begin();
   renderer = new Renderer(gl, scene, camera);
   renderer.start();


}

function begin() {

   var walls = new Image();
   walls.onload = function () {
      _inputHandler.image = walls;
      generateWalls(walls);
   };



   walls.src = "objs/redbrick.jpg";



   var sky = new Image();
   sky.src = "objs/sky.jpg";

   sky.onload = function () {
      _inputHandler.image = sky;
      var shape = new tiltedCube(shaderNew, -.0001, -.0001, 0, null, null, null, size, sky);
      _inputHandler.scene.addGeometry(shape);
   };
   var ground = new Square(shaderOld, 0, 0.001, 0, 34, 139, 50, size);
   _inputHandler.scene.addGeometry(ground);


   var ground = new Square(shaderOld, 0, 0.001, 0, 34, 139, 50, size);
   _inputHandler.scene.addGeometry(ground);




   var dashboard = new Image();
   dashboard.src = "objs/dashboardedited.jpg";


   dashboard.onload = function () {
      _inputHandler.image = dashboard;
      // var shape = new tiltedCube(shaderNew, -.0001, -.0001, 0, null, null, null, size, sky);
      // _inputHandler.scene.addGeometry(shape);
      var rect = new Rectangle(shaderNew, 12.6, -1.3, -18.3, 125, 125, 125, 10, dashboard);
      _inputHandler.scene.addGeometry(rect);
   };
  



 

  


   var circ = new Circle(shaderOld, 14.5, 0.65, -18.2, 255, 125, 0, 5);
   _inputHandler.scene.addGeometry(circ);

   circ = new Circle(shaderOld, 14.55, 0.68, -18.1, 255, 255, 0, 1);
   _inputHandler.scene.addGeometry(circ);


   rect = new Rectangle(shaderOld, 16.5, 0.5, -18.0, 125, 100, 50, 2);
   _inputHandler.scene.addGeometry(rect);

   circ = new Circle(shaderOld, 16.75, 0.8, -17.9, 255, 165, 0, 1.0);
   _inputHandler.scene.addGeometry(circ);

   rect = new Verticalsquare(shaderOld, 17.3, 0.81, -17.8, 255, 0, 0, 0.5);
   _inputHandler.scene.addGeometry(rect);


   // canvas = document.getElementById("webgl");
   // var gl = getWebGLContext(canvas);

}


