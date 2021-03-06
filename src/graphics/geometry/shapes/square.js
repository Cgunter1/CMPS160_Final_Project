
class Square extends Geometry {

   constructor(shader, x, y, z, red, green, blue, size) {
       super(shader);
       this.vertices = this.generateSquareVertices(shader, x, y, z, red, green, blue, size);
       this.faces = {0: this.vertices};
       this.interleaveVertices();
   }
 
   generateSquareVertices(shader, x, y, z, red, green, blue, size) {
       var vertices = []
       var vertex1 = new Vertex(x, y, z, red, green, blue);
       var vertex2 = new Vertex(x+size,  y, z, red, green, blue);
       var vertex3 = new Vertex(x, y, z-size, red, green, blue);
       var vertex4 = new Vertex(x+size,  y, z, red, green, blue);
       var vertex5 = new Vertex(x, y, z-size, red, green, blue);
       var vertex6 = new Vertex(x+size, y, z-size, red, green, blue);


 
       vertices.push(vertex1);
       vertices.push(vertex2);
       vertices.push(vertex3);
 
       vertices.push(vertex4);
       vertices.push(vertex5);
       vertices.push(vertex6);
 
       return vertices;
   }
 }
 