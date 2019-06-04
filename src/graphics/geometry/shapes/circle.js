/**
 * Specifies a Circle. A subclass of geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Circle}
 */
class Circle extends Geometry {
   /**
    * Constructor for Circle.
    *
    * @constructor
    * @param {Shader} shader Shading object used to shade geometry
    * @returns {Circle} Circle created
    */
   constructor(shader, x, y, z,r, g, b, size) {

      super(shader);

      this.vertices = this.generateCircleVertices(x, y, z,r, g, b, size);
      this.faces = { 0: this.vertices };

      this.matrixTranslation = new Matrix4();
      this.speed = 0;
      this.distance = 0;

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
   }

   generateCircleVertices(x, y, z,r, g, b, size) {


      var vertices = []

      const scaledSize= size/10;


     var center = new Vertex(x, y,z,r,g,b); 
     var last = new Vertex(x, y,z,r,g,b); 
     
     
   //   const segmentCount = document.getElementById("segment").value;

   const segmentCount = 17



      for (var i = 0; i <= segmentCount; i++){
        
         vertices.push(center);
         var vtext = new Vertex(x + scaledSize*Math.cos(i*2*Math.PI/segmentCount),y + scaledSize*Math.sin(i*2*Math.PI/segmentCount) ,z,r,g,b)

         vertices.push(vtext);
         vertices.push(last)
         last = vtext
 
       }

   
      return vertices;

   }

   render(){
      this.distance += this.speed;
      this.matrixTranslation.setTranslate(0, 0, this.distance);
      this.shader.setUniform("u_ModelMatrix", this.matrixTranslation.elements);
   }
}
