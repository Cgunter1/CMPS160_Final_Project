/**
 * Specifies a Scene full of Geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Scene}
 */
let ortho = true;
let fov = 95;
let zFrom = .01;
let zTo = 45;


class Camera {
   /**
    * Constructor for Camera.
    *
    * @constructor
    * @returns {Scene} Scene object created
    */

   constructor() {
      this.speed = 0.5;
      this.relativeSpeed = 0.0;

      this.eye = new Vector3([16.0, 2.0, -16.0]);
      this.center = new Vector3([16.0, 2.0, -17.0]);
      this.up = new Vector3([0.0, 1.0, 0.0]);
      this.viewMatrix = new Matrix4();
      this.projectionMatrix = new Matrix4();

      this.updateView();
      this.switchView(1);

   }
   switchView(flag) {
      if (ortho == true && flag == 1) {
         this.projectionMatrix.setPerspective(fov, 1, zFrom, zTo);
         ortho = false;
      }
      else if (ortho == false || flag == 0) {
         this.projectionMatrix.setOrtho(-2, 5, -2, 5, zFrom, zTo);
         ortho = true;
      }
   }

   truck(dir) {
      var n = this.eye.sub(this.center);
      n = n.normalize()
      var u = this.up.cross(n);
      u = u.normalize();
      u = u.mul(dir * this.speed);
      this.eye = this.eye.add(u);
      this.center = this.center.add(u);
      this.updateView();
   }

   zoom(dir) {
      if ((fov + dir) < 180 && (fov + dir) > 0) {
         fov = fov += dir;
         this.projectionMatrix.setPerspective(fov, 1, zFrom, zTo);
      }
      
   }

   

   dolly(dir) {
      var n = this.eye.sub(this.center);
      n = n.normalize();
      zTo = zTo - (dir * this.speed);
      n = n.mul(-dir * this.speed);
      this.eye = this.eye.add(n);
      this.center = this.center.add(n);
      this.updateView();
      console.log(this.eye, this.center, this.speed);
   }

   tilt(dir) {
      var n = this.eye.sub(this.center);
      n = n.normalize();
      var u = this.up.cross(n);
      u = u.normalize();
      var newCenter = this.center.sub(this.eye);
      var rotMatrix = new Matrix4();
      rotMatrix.setRotate(dir * this.speed, u.elements[0], u.elements[1], u.elements[2]);
      newCenter = rotMatrix.multiplyVector3(newCenter);
      this.center = newCenter.add(this.eye);
      this.updateView();
      console.log(this.eye, this.center, this.speed);
   }

   pan(dir) {
      var newCenter = this.center.sub(this.eye);
      var rotMatrix = new Matrix4();
      rotMatrix.setRotate(dir * this.speed, this.up.elements[0], this.up.elements[1], this.up.elements[2]);
      newCenter = rotMatrix.multiplyVector3(newCenter);
      this.center = newCenter.add(this.eye);
      this.updateView();
      console.log(this.eye, this.center, this.speed);
   }

   updateView() {
      this.viewMatrix.setLookAt(this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
         this.center.elements[0], this.center.elements[1], this.center.elements[2],
         this.up.elements[0], this.up.elements[1], this.up.elements[2]);
   }
   changeEye(shader){
      shader.setUniform("u_Eye", new Vector4(this.eye.elements[0], this.eye.elements[1], this.eye.elements[2]));
   }
}
