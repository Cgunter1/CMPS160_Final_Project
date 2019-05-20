var shader = null;

function main() {
  // Retrieve the canvas from the HTML document
  canvas = document.getElementById("webgl");

  // Retrieve WebGL rendering context
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log("Failed to get WebGL rendering context.");
    return;
  }

  // Initialize the scene
  var scene = new Scene();
  var camera = new Camera();
  var inputHandler = new InputHandler(canvas, scene, camera);

  // Initialize shader
  shaderNew = new Shader(gl, ASG4_VSHADER, ASG4_FSHADER);
  shaderOld = new Shader(gl, ASG1_VSHADER, ASG1_FSHADER);
  shaderOld.addAttribute("a_Position");
  shaderOld.addAttribute("a_Color");
  shaderOld.addUniform("u_ProjectionMatrix", "mat4", new Matrix4());
  shaderOld.addUniform("u_ViewMatrix", "mat4", new Matrix4());

  // Add attibutes
  shaderNew.addAttribute("a_Position");
  shaderNew.addAttribute("a_Color");
  shaderNew.addAttribute("a_TexCoord");

  shaderNew.addUniform("u_ProjectionMatrix", "mat4", new Matrix4());
  shaderNew.addUniform("u_ViewMatrix", "mat4", new Matrix4());
  shaderNew.addUniform("u_Sampler", "sampler2D", 0);

  start();

  // Initialize renderer with scene and camera
  renderer = new Renderer(gl, scene, camera);
  renderer.start();
}
