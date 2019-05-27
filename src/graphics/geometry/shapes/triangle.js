/**
 * Specifies a triangle. A subclass of geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Triangle}
 */
class Triangle extends Geometry {
   /**
    * Constructor for Triangle.
    *
    * @constructor
    * @param {Shader} shader Shading object used to shade geometry
    * @returns {Triangle} Triangle created
    */
   constructor(shader, x, y, red, green, blue, size) {
       super(shader);
       this.vertices = this.generateTriangleVertices(x, y, red, green, blue, size);
       this.faces = {0: this.vertices};
       this.interleaveVertices();
   }
 
   generateTriangleVertices(x, y, red, green, blue, size) {
       var vertices = []
 
       var vertex1 = new Vertex(x-size, y-size, 0.0, red, green, blue);
       var vertex2 = new Vertex(x+size, y-size, 0.0, red, green, blue);
       var vertex3 = new Vertex(x, y+size, 0.0, red, green, blue);
 
       vertices.push(vertex1);
       vertices.push(vertex2);
       vertices.push(vertex3);
 
       return vertices;
   }
 }
 