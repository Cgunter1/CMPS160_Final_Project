var shader = null;
var renderer;
var hud;

var gl = null

function main() {

   canvas = document.getElementById("webgl");
   

   gl = getWebGLContext(canvas);
   if (!gl) {
      console.log("Failed to get WebGL rendering context.");
      return;
   }


   var dashboardItems = [];

   var scene = new Scene();
   var camera = new Camera();
   var inputHandler = new InputHandler(canvas, scene, camera, dashboardItems);


   shaderNew = new Shader(gl, ASG4_VSHADER, ASG4_FSHADER);
   shaderOld = new Shader(gl, ASG1_VSHADER, ASG1_FSHADER);
   shaderDashText = new Shader(gl, DashboardVShaderTexture, DashboardFShaderTexture);   

   shaderFogTest = new Shader(gl, FOG_VSHADER, FOG_FSHADER);

   shaderOld.addAttribute("a_Position");
   shaderOld.addAttribute("a_Color");
   shaderOld.addUniform("u_ProjectionMatrix", "mat4", new Matrix4());
   shaderOld.addUniform("u_ViewMatrix", "mat4", new Matrix4());
   shaderOld.addUniform("u_Eye", "vec4", new Float32Array(4));
   shaderOld.addUniform("u_FogColor", "vec3", new Float32Array([.8627450980, 0.858823529,0.87450980392,]));
   shaderOld.addUniform("u_FogDist", "vec2", new Float32Array([55, 80]));

   shaderDashText.addAttribute("a_Position");
   shaderDashText.addAttribute("a_Color");
   shaderDashText.addAttribute("a_TexCoord");

   shaderDashText.addUniform("u_ProjectionMatrix", "mat4", new Matrix4());
   shaderDashText.addUniform("u_ViewMatrix", "mat4", new Matrix4());
   shaderDashText.addUniform("u_Sampler", "sampler2D", 0);
   shaderDashText.addUniform("u_ModelMatrix", "mat4", new Matrix4());

   shaderNew.addAttribute("a_Position");
   shaderNew.addAttribute("a_Color");
   shaderNew.addAttribute("a_TexCoord");

   shaderNew.addUniform("u_ProjectionMatrix", "mat4", new Matrix4());
   shaderNew.addUniform("u_ViewMatrix", "mat4", new Matrix4());
   shaderNew.addUniform("u_Sampler", "sampler2D", 0);


   // Fog Shader.
   shaderFogTest.addAttribute("a_Position");
   shaderFogTest.addAttribute("a_Color");
   shaderFogTest.addUniform("u_ProjectionMatrix", "mat4", new Matrix4());
   shaderFogTest.addUniform("u_ViewMatrix", "mat4", new Matrix4());
   shaderFogTest.addUniform("u_Eye", "vec4", new Float32Array([camera.eye.elements[0], camera.eye.elements[1], camera.eye.elements[2], 0]));
   shaderFogTest.addUniform("u_FogDist", "vec2", new Float32Array([0, 10]));
   shaderFogTest.addUniform("u_FogColor", "vec3", new Float32Array([.8627450980, 0.858823529,0.87450980392,]));

   begin(inputHandler, dashboardItems);
   renderer = new Renderer(gl, scene, camera);
   renderer.start();


}

function fogSetup(){

}

function hudSetup(context){
   var num = 0;
   hud = document.getElementById("hud");
   var ctx = hud.getContext("2d");

   hud.onmousedown = function(){
      // console.log(context.scene.geometries);
   }

   var tick = function(){
      num = draw2d(ctx, num);
      requestAnimationFrame(tick, hud);
   }

   tick();

}

function draw2d(ctx, num){
   if(num < 50){
      ++num;
   } else {
      num %= 50;
   }
   ctx.clearRect(0, 0, 400, 400);
   ctx.font = '18px "Times New Roman"';
   ctx.fillStyle = 'rgba(255, 255, 255, 1)';
   ctx.fillText('Speed: ' + num, 50, 30);
   return num;
}

function begin(inputHandler, dashboardItems) {

   var walls = new Image();
   walls.onload = function () {
      _inputHandler.image = walls;
      // generateWalls(walls);
   };


   walls.src = "objs/redbrick.jpg";



   var dashboard = new Image();
   dashboard.src = "objs/dashboardedited.jpg";


   dashboard.onload = function () {
      _inputHandler.image = dashboard;
      var rect = new Rectangle(shaderDashText, 12.6, -1.3, -18.3, 125, 125, 125, 10, dashboard);
      _inputHandler.scene.addGeometry(rect);
      dashboardItems.push(rect);
   };
  



 

  


   var circ = new Circle(shaderOld, 14.5, 0.65, -18.2, 255, 125, 0, 5);
   _inputHandler.scene.addGeometry(circ);
   dashboardItems.push(circ);


   circ = new Circle(shaderOld, 14.55, 0.68, -18.1, 255, 255, 0, 1);
   _inputHandler.scene.addGeometry(circ);
   dashboardItems.push(circ);


   rect = new Rectangle(shaderOld, 16.5, 0.5, -18.0, 125, 100, 50, 2);
   _inputHandler.scene.addGeometry(rect);
   dashboardItems.push(rect);

   circ = new Circle(shaderOld, 16.75, 0.8, -17.9, 255, 165, 0, 1.0);
   _inputHandler.scene.addGeometry(circ);
   dashboardItems.push(circ);

   rect = new Verticalsquare(shaderOld, 17.3, 0.81, -17.8, 255, 0, 0, 0.5);
   _inputHandler.scene.addGeometry(rect);
   dashboardItems.push(rect);

   var cube = new tiltedCubeFog(shaderFogTest, 20.3, 0.81, -23, 255, 0, 0, 10, null);
   _inputHandler.scene.addGeometry(cube);

   var cube = new tiltedCubeFog(shaderFogTest, 1.8, 0.81, -23, 255, 0, 0, 10, null);
   _inputHandler.scene.addGeometry(cube);

   var cube = new tiltedCubeFog(shaderFogTest, 20.3, 0.81, -43, 255, 0, 0, 10, null);
   _inputHandler.scene.addGeometry(cube);

   var cube = new tiltedCubeFog(shaderFogTest, 1.8, 0.81, -43, 255, 0, 0, 10, null);
   _inputHandler.scene.addGeometry(cube);

   var cube = new tiltedCubeFog(shaderFogTest, 20.3, 0.81, -63, 255, 0, 0, 10, null);
   _inputHandler.scene.addGeometry(cube);

   var cube = new tiltedCubeFog(shaderFogTest, 1.8, 0.81, -63, 255, 0, 0, 10, null);
   _inputHandler.scene.addGeometry(cube);

   ground = new Square(shaderFogTest, 11, .4, -23.5, 0, 0, 0, 10.7);
   _inputHandler.scene.addGeometry(ground);
   ground = new Square(shaderFogTest, 11, .4, -33.5, 0, 0, 0, 10.7);
   _inputHandler.scene.addGeometry(ground);
   ground = new Square(shaderFogTest, .5, .4, -33.5, 0, 0, 0, 10.7);
   _inputHandler.scene.addGeometry(ground);
   ground = new Square(shaderFogTest, 21, .4, -33.5, 0, 0, 0, 10.7);
   _inputHandler.scene.addGeometry(ground);
   ground = new Square(shaderFogTest, 11, .4, -43.5, 0, 0, 0, 10.7);
   _inputHandler.scene.addGeometry(ground);
   ground = new Square(shaderFogTest, 11, .4, -53.5, 0, 0, 0, 10.7);
   _inputHandler.scene.addGeometry(ground);


   hudSetup(inputHandler);

   // fogSetup();
   // canvas = document.getElementById("webgl");
   // var gl = getWebGLContext(canvas);

}

