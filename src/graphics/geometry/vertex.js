/**
 * Specifies a vertex. Currently only contains the vertex's position.
 *
 * @author Lucas N. Ferreira
 * @this {Vertex}
 */
class Vertex {
   constructor(x, y, z, red, green, blue) {
       this.point  = new Vector3([x, y, z]);
       this.color  = [red / 255, green / 255, blue / 255, 1.0];
       this.texCoord = [0.0, 0.0];
 
       // This class can be extended to support other attributes such as
       // normals and UV coordinates.
   }
 
 }
 