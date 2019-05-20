/**
 * Specifies a triangle. A subclass of geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Triangle}
 */
class tiltedCube extends Geometry {
   /**
    * Constructor for Triangle.
    *
    * @constructor
    * @param {Shader} shader Shading object used to shade geometry
    * @param x
    * @param y
    * @returns {Square} Triangle created
    */
    constructor(shader, x, y, z, red, green, blue, size, image) {
        super(shader);
        this.x = x;
        this.y = y;
        this.vertices = this.generateTexCubeVertices(x, y, z, red, green, blue, size);
        this.faces = {0: this.vertices};
        this.image = image;
        this.interleaveVertices();
    }
 
    generateTexCubeVertices(x, y, z, red, green, blue, size) {
        var vertices = []
 
        var vertex1 = new Vertex(x, y, z, 0, 0, 0);
        var vertex2 = new Vertex(x, y+size, z, 0, 0, 0);
        var vertex3 = new Vertex(x+size,  y, z, 0, 0, 0);
        var vertex4 = new Vertex(x, y+size, z, 0, 0, 0);
        var vertex5 = new Vertex(x+size,  y, z, 0, 0, 0);
        var vertex6 = new Vertex(x+size, y+size, z, 0, 0, 0);
 
        var vertex7 = new Vertex(x+size, y+size, z, 0, 0, 0);
        var vertex8 = new Vertex(x, y+size, z, 0, 0, 0);
        var vertex9 = new Vertex(x, y+size, z-size, 0, 0, 0);
        var vertex10 = new Vertex(x+size, y+size, z, 0, 0, 0);
        var vertex11 = new Vertex(x, y+size, z-size, 0, 0, 0);
        var vertex12 = new Vertex(x+size, y+size, z-size, 0, 0, 0);

        // Image is given so color doesn't matter
 
        var vertex13 = new Vertex(x, y, z, red, green, blue);
        var vertex14 = new Vertex(x+size,  y, z, red, green, blue);
        var vertex15 = new Vertex(x, y, z-size, red, green, blue);
        var vertex16 = new Vertex(x+size, y, z-size, red, green, blue);
        var vertex17 = new Vertex(x+size,  y, z, red, green, blue);
        var vertex18 = new Vertex(x, y, z-size, red, green, blue);
        var vertex19 = new Vertex(x, y, z, red, green, blue);
        var vertex20 = new Vertex(x, y, z-size, red, green, blue);
        var vertex21 = new Vertex(x, y+size, z-size, red, green, blue);
        var vertex22 = new Vertex(x, y+size, z, red, green, blue);
        var vertex23 = new Vertex(x, y, z, red, green, blue);
        var vertex24 = new Vertex(x, y+size, z-size, red, green, blue);
 
        var vertex25 = new Vertex(x+size,  y, z, red, green, blue);
        var vertex26 = new Vertex(x+size, y+size, z, red, green, blue);
        var vertex27 = new Vertex(x+size, y+size, z-size, red, green, blue);
        var vertex28 = new Vertex(x+size, y, z-size, red, green, blue);
        var vertex29 = new Vertex(x+size,  y, z, red, green, blue);
        var vertex30 = new Vertex(x+size, y+size, z-size, red, green, blue);
        var vertex31 = new Vertex(x, y, z-size, red, green, blue);
        var vertex32 = new Vertex(x+size, y, z-size, red, green, blue);
        var vertex33 = new Vertex(x, y+size, z-size, red, green, blue);
        var vertex34 = new Vertex(x+size, y+size, z-size, red, green, blue);
        var vertex35 = new Vertex(x+size, y, z-size, red, green, blue);
        var vertex36 = new Vertex(x, y+size, z-size, red, green, blue);
 
        vertex1.texCoord = [0,0];
        vertex2.texCoord = [0,1];
        vertex3.texCoord = [1,0];
        vertex4.texCoord = [0,1];
        vertex5.texCoord = [1,0];
        vertex6.texCoord = [1,1];
        vertex7.texCoord = [0,1];
        vertex8.texCoord = [0,0];
        vertex9.texCoord = [1,0];
        vertex10.texCoord = [0,1];
        vertex11.texCoord = [1,0];
        vertex12.texCoord = [1,1];
        vertex19.texCoord = [0,0];
        vertex20.texCoord = [1,0];
        vertex21.texCoord = [1,1];
        vertex22.texCoord = [0,1];
        vertex23.texCoord = [0,0];
        vertex24.texCoord = [1,1];
        vertex25.texCoord = [1,0];
        vertex26.texCoord = [1,1];
        vertex27.texCoord = [0,1];
        vertex28.texCoord = [0,0];
        vertex29.texCoord = [1,0];
        vertex30.texCoord = [0,1];
        vertex31.texCoord = [1,0];
        vertex32.texCoord = [0,0];
        vertex33.texCoord = [1,1];
        vertex34.texCoord = [0,1];
        vertex35.texCoord = [0,0];
        vertex36.texCoord = [1,1];
 
        vertices.push(vertex1);
        vertices.push(vertex2);
        vertices.push(vertex3);
        vertices.push(vertex4);
        vertices.push(vertex5);
        vertices.push(vertex6);
        vertices.push(vertex7);
        vertices.push(vertex8);
        vertices.push(vertex9);
        vertices.push(vertex10);
        vertices.push(vertex11);
        vertices.push(vertex12);
        vertices.push(vertex13);
        vertices.push(vertex14);
        vertices.push(vertex15);
        vertices.push(vertex16);
        vertices.push(vertex17);
        vertices.push(vertex18);
        vertices.push(vertex19);
        vertices.push(vertex20);
        vertices.push(vertex21);
        vertices.push(vertex22);
        vertices.push(vertex23);
        vertices.push(vertex24);
        vertices.push(vertex25);
        vertices.push(vertex26);
        vertices.push(vertex27);
        vertices.push(vertex28);
        vertices.push(vertex29);
        vertices.push(vertex30);
        vertices.push(vertex31);
        vertices.push(vertex32);
        vertices.push(vertex33);
        vertices.push(vertex34);
        vertices.push(vertex35);
        vertices.push(vertex36);
 
 
        return vertices;
    }
   }
 