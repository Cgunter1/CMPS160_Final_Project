var FOG_VSHADER =
  `precision mediump float;
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  varying vec4 v_Color;
  uniform mat4 u_ProjectionMatrix;
  uniform mat4 u_ViewMatrix;
  uniform vec4 u_Eye;
  varying float v_Dist;

  void main() {
    v_Color = a_Color;
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * a_Position;
    v_Dist = distance(a_Position, u_Eye);
  }`;

// Fragment Shader
var FOG_FSHADER =
  `precision mediump float;
  varying vec4 v_Color;
  uniform vec3 u_FogColor;
  uniform vec2 u_FogDist;
  varying float v_Dist;

  void main() {
    float fogFactor = clamp((u_FogDist.y - v_Dist) / (u_FogDist.y - u_FogDist.x), 0.0, 1.0);
    vec3 color = mix(u_FogColor, vec3(v_Color), fogFactor);

    gl_FragColor = vec4(color, v_Color.a);
  }`;

