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
   shaderFire = new Shader(gl, FIRE_VSHADER, FIRE_FSHADER);
   dashShader = new Shader(gl, DASH_VSHADER, DASH_FSHADER);
   shaderFireFog = new Shader(gl, FIRE_FOG_VSHADER, FIRE_FOG_FSHADER);
   buttonShader = new Shader(gl, BUTTON_VSHADER, BUTTON_FSHADER);

   shaderOld.addAttribute("a_Position");
   shaderOld.addAttribute("a_Color");
   shaderOld.addUniform("u_ProjectionMatrix", "mat4", new Matrix4());
   shaderOld.addUniform("u_ViewMatrix", "mat4", new Matrix4());
   shaderOld.addUniform("u_Eye", "vec4", new Float32Array(4));
   shaderOld.addUniform("u_FogColor", "vec3", new Float32Array([.8627450980, 0.858823529, 0.87450980392,]));
   shaderOld.addUniform("u_FogDist", "vec2", new Float32Array([55, 80]));


   shaderFireFog.addAttribute("a_Position");
   shaderFireFog.addAttribute("a_Color");
   shaderFireFog.addUniform("u_ProjectionMatrix", "mat4", new Matrix4());
   shaderFireFog.addUniform("u_ViewMatrix", "mat4", new Matrix4());
   shaderFireFog.addUniform("u_ModelMatrix", "mat4", new Matrix4());
   shaderFireFog.addUniform("u_Eye", "vec4", new Float32Array([camera.eye.elements[0], camera.eye.elements[1], camera.eye.elements[2], 0]));
   shaderFireFog.addUniform("u_FogDist", "vec2", new Float32Array([6, 18]));
   shaderFireFog.addUniform("u_FogColor", "vec3", new Float32Array([.8627450980, 0.858823529, 0.87450980392,]));


   dashShader.addAttribute("a_Position");
   dashShader.addAttribute("a_Color");
   dashShader.addUniform("u_ProjectionMatrix", "mat4", new Matrix4());
   dashShader.addUniform("u_ViewMatrix", "mat4", new Matrix4());
   dashShader.addUniform("u_Eye", "vec4", new Float32Array(4));
   dashShader.addUniform("u_ModelMatrix", "mat4", new Matrix4());

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
   shaderFogTest.addUniform("u_FogDist", "vec2", new Float32Array([0, 14]));
   shaderFogTest.addUniform("u_FogColor", "vec3", new Float32Array([.8627450980, 0.858823529, 0.87450980392,]));


   // Fire Shader.

   shaderFire.addAttribute("a_Position");
   shaderFire.addAttribute("a_Color");
   shaderFire.addUniform("u_ProjectionMatrix", "mat4", new Matrix4());
   shaderFire.addUniform("u_ModelMatrix", "mat4", new Matrix4());
   shaderFire.addUniform("u_ViewMatrix", "mat4", new Matrix4());
   shaderFire.addUniform("u_Eye", "vec4", new Float32Array(4));
   shaderFire.addUniform("u_FogColor", "vec3", new Float32Array([.8627450980, 0.858823529, 0.87450980392,]));
   shaderFire.addUniform("u_FogDist", "vec2", new Float32Array([55, 80]));


   // Button Shader
   buttonShader.addAttribute("a_Position");
   buttonShader.addAttribute("a_Color");
   buttonShader.addUniform("u_ProjectionMatrix", "mat4", new Matrix4());
   buttonShader.addUniform("u_ViewMatrix", "mat4", new Matrix4());
   buttonShader.addUniform("u_Eye", "vec4", new Float32Array(4));
   buttonShader.addUniform("u_ModelMatrix", "mat4", new Matrix4());
   buttonShader.addUniform("u_Color", "vec4", new Float32Array([0, 0, 0, 1]));



   begin(inputHandler, dashboardItems);
   renderer = new Renderer(gl, scene, camera);


   // main2()
   renderer.start();




}

function fogSetup() {

}

function hudSetup(context) {
   var direction = "North";
   var num = 0;
   hud = document.getElementById("hud");
   var ctx = hud.getContext("2d");

   hud.onmousedown = function () {
      // console.log(context.scene.geometries);
   }

   var tick = function () {
      num = draw2d(ctx, num, direction, context);
      requestAnimationFrame(tick, hud);
   }

   tick();

}

function draw2d(ctx, num, dir, context) {

   switch(context.camera.relativeSpeed){
      case .0625:
         dir = "North";
         num = 10;
         break;
      case .125:
         dir = "North";
         num = 20;
         break;
      case .25:
         dir = "North";
         num = 35;
         break;
      case .5:
         dir = "North";
         num = 47;
         break;
      case 1:
         dir = "North";
         num = 60;
         break;
      case -.0625:
         dir = "South";
         num = 10;
         break;
      case -.125:
         dir = "South";
         num = 20;
         break;
      case -.25:
         dir = "South";
         num = 35;
         break;
      case -.5:
         dir = "South";
         num = 47;
         break;
      case -1:
         dir = "South";
         num = 60;
         break;
      default:
         dir = "N/A";
         num = 0;
         break;
   }
   
   ctx.clearRect(0, 0, 400, 500);
   if(context.camera.eye.elements[2] < -66.625){
      ctx.clearRect(0, 0, 700, 500);
      console.log("sdadsa");
      ctx.font = '30px "Comic Sans"';
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillText('You have reached the end.', 50, 30);
      ctx.fillText('Go Back.', 50, 62);
   }else if(context.camera.eye.elements[2] > -15){
      ctx.clearRect(0, 0, 700, 500);
      console.log("sdadsa");
      ctx.font = '30px "Comic Sans"';
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillText('You have reached the beginning.', 50, 30);
      ctx.fillText('Go Forward.', 50, 62);
   }
   else {
      ctx.clearRect(0, 0, 700, 500);
      ctx.font = '18px "Times New Roman"';
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillText('Speed: ' + num + ' mph', 50, 30);
      ctx.fillText('Direction: ' + dir, 50, 50);
   }
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









   circ = new Circle(dashShader, 14.37, 0.70, -18.1, 0, 1, 1, .70);
   _inputHandler.scene.addGeometry(circ);
   dashboardItems.push(circ);


   rect = new Rectangle(dashShader, 15.9, 0.37, -18.0, 50, 50, 50, 2);
   _inputHandler.scene.addGeometry(rect);
   dashboardItems.push(rect);

   circ = new Circle(dashShader, 16.15, 0.7, -17.9, 255, 165, 0, 1.0);
   _inputHandler.scene.addGeometry(circ);
   dashboardItems.push(circ);

   rect = new Verticalsquare(buttonShader, 16.78, 0.70, -17.8, 255, 0, 0, 0.5);
   rect.on = false;
   _inputHandler.scene.addGeometry(rect);
   dashboardItems.push(rect);

   var cube = new tiltedCubeFog(shaderFogTest, 21.3, -0.4, -23, 125, 125, 125, 10, null);
   _inputHandler.scene.addGeometry(cube);

   var cube = new tiltedCubeFog(shaderFogTest, 0.3, -0.4, -23, 125, 125, 125, 10, null);
   _inputHandler.scene.addGeometry(cube);

   var cube = new tiltedCubeFog(shaderFogTest, 21.3, -0.4, -43, 125, 125, 125, 10, null);
   _inputHandler.scene.addGeometry(cube);

   var cube = new tiltedCubeFog(shaderFogTest, 0.3, -0.4, -43, 125, 125, 125, 10, null);
   _inputHandler.scene.addGeometry(cube);

   var cube = new tiltedCubeFog(shaderFogTest, 21.3, -0.4, -63, 125, 125, 125, 10, null);
   _inputHandler.scene.addGeometry(cube);

   var cube = new tiltedCubeFog(shaderFogTest, 0.3, -0.4, -63, 125, 125, 125, 10, null);
   _inputHandler.scene.addGeometry(cube);

   var cube = new tiltedCubeFog(shaderFogTest, 10, -0.4, -73, 125, 125, 125, 12, null);
   _inputHandler.scene.addGeometry(cube);

   ground = new Square(shaderFogTest, 10, -.6, -23.5, 0, 0, 0, 12);
   _inputHandler.scene.addGeometry(ground);
   ground = new Square(shaderFogTest, 10, -.6, -33.5, 0, 0, 0, 12);
   _inputHandler.scene.addGeometry(ground);
   ground = new Square(shaderFogTest, .5, -.6, -33.5, 0, 0, 0, 12);
   _inputHandler.scene.addGeometry(ground);
   ground = new Square(shaderFogTest, 21, -.6, -33.5, 0, 0, 0, 12);
   _inputHandler.scene.addGeometry(ground);
   ground = new Square(shaderFogTest, 10, -.6, -43.5, 0, 0, 0, 12);
   _inputHandler.scene.addGeometry(ground);
   ground = new Square(shaderFogTest, 10, -.6, -53.5, 0, 0, 0, 12);
   _inputHandler.scene.addGeometry(ground);
   ground = new Square(shaderFogTest, .5, -.6, -53.5, 0, 0, 0, 12);
   _inputHandler.scene.addGeometry(ground);
   ground = new Square(shaderFogTest, 21, -.6, -53.5, 0, 0, 0, 12);
   _inputHandler.scene.addGeometry(ground);
   ground = new Square(shaderFogTest, 10, -.6, -63.5, 0, 0, 0, 12);
   _inputHandler.scene.addGeometry(ground);


   



   addFire()
   addRain()



    


   
   

   hudSetup(inputHandler);

   

   // fogSetup();
   // canvas = document.getElementById("webgl");
   // var gl = getWebGLContext(canvas);

}

function addFire(){

   for (var k = 30; k < 90; k += 30) {
      trashFire(10.3, -0.4, -k)
      trashFire(20.3, -0.4, -k)
   }

}


function addRain(){
   for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 70; j++) {
            rain(i,0,-j)
    
      }
   }

}


// x = 16
// y = 0
// z = -19


function rain(x,y,z){


   var rain = new rainCube(shaderFire, x ,y, z, 135, 206, 250, 0.08, null, 0, 5)

      _inputHandler.scene.addGeometry(rain)



}



function trashFire(x, y, z) {
   var trashCan = new tiltedCubeFog(shaderFogTest, x, y, z, null, null, null, 1, null)
   _inputHandler.scene.addGeometry(trashCan)



   for (var k = 0.2; k < 0.5; k += 0.01) {
      var fCube = new fireCube(shaderFireFog, x + 0.1 + k, y + 0.8, z + (-0.4) + ((Math.random()) - 0.5), 25, 25, 25, 0.12, null, 1.5, 3)

      _inputHandler.scene.addGeometry(fCube)

   }


   for (var k = 0.1; k < 0.6; k += 0.01) {
      var fCube = new fireCube(shaderFireFog, x + 0.1 + k, y + 0.8, z + (-0.4) + ((Math.random()) - 0.5), 255, 105, 0, 0.14, null, 0.9, 1.50)

      _inputHandler.scene.addGeometry(fCube)

   }

   // Orange

   for (var k = 0; k < 0.7; k += 0.01) {
      var fCube = new fireCube(shaderFireFog, x + 0.1 + k, y + 0.8, z + (-0.4) + ((Math.random()) - 0.5), 255, 125, 0, 0.14, null, 0.3, 0.8)

      _inputHandler.scene.addGeometry(fCube)

   }


   // Yellow

   for (var k = 0; k < 0.7; k += 0.01) {
      var fCube = new fireCube(shaderFireFog, x + 0.1 + k, y + 0.8, z + (-0.4) + ((Math.random()) - 0.5), 255, 200, 0, 0.14, null, 0.2, 0.21)

      _inputHandler.scene.addGeometry(fCube)

   }



}

