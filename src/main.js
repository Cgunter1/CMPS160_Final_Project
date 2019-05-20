var shader = null;

function main() {
  canvas = document.getElementById("webgl");

  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log("Failed to get WebGL rendering context.");
    return;
  }
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



function begin(){
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
