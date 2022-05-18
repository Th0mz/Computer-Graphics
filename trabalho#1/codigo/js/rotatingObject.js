var vector;
class RotatingObject {
    constructor (x, y, z) {
        this.speed = 0;
        this.cubeRotation = 0;
        this.cylinderRotation = 0;
        this.pyramidRotation = 0;

        //this.rotatingObject = new THREE.Group();
        

        var pyramid = new Pyramid(0.5 * side_size, side_size, 4, 0x00ff00);
        pyramid.rotateZ(Math.PI * 0.5);
        pyramid.position.set(side_size + x * side_size, -2 * side_size + y * side_size, -2 * side_size + z * side_size);
        
        this.pyramidGroup = new THREE.Group();
        this.pyramidGroup.add(pyramid);

        var cylinder = new Cylinder(0.5 * side_size, 4 * side_size, 32, 0x0000ff);
        cylinder.rotateX(Math.PI/2);
        cylinder.position.set(x * side_size, -2 * side_size + y * side_size, z * side_size);
        
        this.cylinderGroup = new THREE.Group();
        this.cylinderGroup.add(cylinder);
        this.cylinderGroup.add(this.pyramidGroup);

        var cube = new Cube(3 * side_size, 0xff0000);
        cube.position.set(x * side_size, y * side_size, z * side_size);
        vector = new THREE.Vector3(x * side_size, y * side_size, z * side_size);
        console.log(vector);
        this.cubeGroup = new THREE.Group();
        this.cubeGroup.add(cube);
        //this.cubeGroup.position.set(x * side_size, y * side_size, z * side_size);
        this.cubeGroup.add(this.cylinderGroup);

        this.fullObject = new THREE.Group();
        this.fullObject.add(this.cubeGroup);
        this.fullObject.position.set(x * side_size, y * side_size, z * side_size);
        //console.log('fullObject position ' + this.fullObject.position);

    }


    // obj - your object (THREE.Object3D or derived)
    // point - the point of rotation (THREE.Vector3)
    // axis - the axis of rotation (normalized THREE.Vector3)
    // theta - radian value of rotation
    // pointIsWorld - boolean indicating the point is in world coordinates (default = false)
    rotateAboutPoint(obj, point, axis, theta, pointIsWorld){
        pointIsWorld = (pointIsWorld === undefined)? false : pointIsWorld;
    
        if(pointIsWorld){
            obj.parent.localToWorld(obj.position); // compensate for world coordinate
        }
    
        obj.position.sub(point); // remove the offset
        obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
        obj.position.add(point); // re-add the offset
    
        if(pointIsWorld){
            obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
        }
    
        obj.rotateOnAxis(axis, theta); // rotate the OBJECT
    }

    update () {
                
    }

    rotateCube (degree) {
        this.rotateAboutPoint(this.cubeGroup, vector, new THREE.Vector3(0,0,1), degree);
    }

    rotateCylinder (degree) {
        this.cylinderRotation = degree;
    }

    rotatePyramid (degree) {
        this.pyramidRotation = degree;
    }
}