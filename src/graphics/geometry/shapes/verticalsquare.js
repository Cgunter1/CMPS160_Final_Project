
class Verticalsquare extends Geometry {

   constructor(shader, x, y, z, red, green, blue, size) {
       super(shader);
       this.vertices = this.generateverticalsquareVertices(shader, x, y, z, red, green, blue, size);
       this.faces = {0: this.vertices};
       this.matrixTranslation = new Matrix4();
       this.speed = 0;
       this.distance = 0;
       this.on = false;
       this.shader.setUniform("u_Color", new Float32Array([.7, 0, 0, 1]));
       this.interleaveVertices();
   }
 
   generateverticalsquareVertices(shader, x, y, z, red, green, blue, size) {
       var vertices = []
      //  var vertex1 = new Vertex(x, y, z, red, green, blue);
      //  var vertex2 = new Vertex(x+size,  y, z, red, green, blue);
      //  var vertex3 = new Vertex(x, y, z-size, red, green, blue);
      //  var vertex4 = new Vertex(x+size,  y, z, red, green, blue);
      //  var vertex5 = new Vertex(x, y, z-size, red, green, blue);
      //  var vertex6 = new Vertex(x+size, y, z-size, red, green, blue);

      var vertex1 = new Vertex(x, y, z, red, green, blue);
        var vertex2 = new Vertex(x, y+(size/4), z, red, green, blue);
        var vertex3 = new Vertex(x+(size/4),  y, z, red, green, blue);

        var vertex4 = new Vertex(x, y+(size/4), z, red, green, blue);
        var vertex5 = new Vertex(x+(size/4),  y, z, red, green, blue);
        var vertex6 = new Vertex(x+(size/4), y+(size/4), z, red, green, blue);
 
       vertices.push(vertex1);
       vertices.push(vertex2);
       vertices.push(vertex3);
 
       vertices.push(vertex4);
       vertices.push(vertex5);
       vertices.push(vertex6);
 
       return vertices;
   }

   click(){
       if(this.on){
           this.shader.setUniform("u_Color", new Float32Array([.7, 0, 0, 1]));
       } else {
           this.shader.setUniform("u_Color", new Float32Array([0, .7, 0, 1]))
       }
       this.on = !this.on;
   }

   render(){
    this.distance += this.speed;
    this.matrixTranslation.setTranslate(0, 0, this.distance);
    this.shader.setUniform("u_ModelMatrix", this.matrixTranslation.elements);
 }
 }
 