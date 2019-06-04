
class Rectangle extends Geometry {

   constructor(shader, x, y, z, red, green, blue, size, image) {
       super(shader);
       this.image = image;
       this.center = [x, y, z];
       this.vertices = this.generaterectangleVertices(shader, x, y, z, red, green, blue, size, image);
       this.faces = {0: this.vertices};
       this.interleaveVertices();
       this.matrixTranslation = new Matrix4();
       this.speed = 0;
       this.distance = 0;
       this.angle = 0;
   }
 
   generaterectangleVertices(shader, x, y, z, red, green, blue, size,image) {
       var vertices = [];
      //  var vertex1 = new Vertex(x, y, z, red, green, blue);
      //  var vertex2 = new Vertex(x+size,  y, z, red, green, blue);
      //  var vertex3 = new Vertex(x, y, z-size, red, green, blue);
      //  var vertex4 = new Vertex(x+size,  y, z, red, green, blue);
      //  var vertex5 = new Vertex(x, y, z-size, red, green, blue);
      //  var vertex6 = new Vertex(x+size, y, z-size, red, green, blue);

      // this.image = image
      // console.log(image);

      var vertex1 = new Vertex(x, y, z, red, green, blue);
        var vertex2 = new Vertex(x, y+(size/4), z, red, green, blue);
        var vertex3 = new Vertex(x+(size/1.5),  y, z, red, green, blue);

        var vertex4 = new Vertex(x, y+(size/4), z, red, green, blue);
        var vertex5 = new Vertex(x+(size/1.5),  y, z, red, green, blue);
        var vertex6 = new Vertex(x+(size/1.5), y+(size/4), z, red, green, blue);

        
       vertex1.texCoord = [0,.5];
       vertex2.texCoord = [0,1];
       vertex3.texCoord = [1,.5];
       
       vertex4.texCoord = [0,1];
       vertex5.texCoord = [1,.5];
       vertex6.texCoord = [1,1];

       vertices.push(vertex1);
       vertices.push(vertex2);
       vertices.push(vertex3);
 
       vertices.push(vertex4);
       vertices.push(vertex5);
       vertices.push(vertex6);
 
       return vertices;
   }
   render(){
     this.distance += this.speed;
     this.matrixTranslation.setTranslate(0, 0, this.distance);
     this.shader.setUniform("u_ModelMatrix", this.matrixTranslation.elements);
   }

   rotate(eyePosition){

   }

 }
 