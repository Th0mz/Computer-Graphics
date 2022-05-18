
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
        
        this.cubeGroup = new THREE.Group();
        this.cubeGroup.add(cube)
        this.cubeGroup.add(this.cylinderGroup)
        
        this.rot = 0;
    }

    update () {
        //this.rot += 0.001
        //this.cubeGroup.rotateZ(this.rot);
    }

    rotateCube (direction) {
        this.cubeRotation = direction;
    }

    rotateCylinder (direction) {
        this.cylinderRotation = direction;
    }

    rotatePyramid (direction) {
        this.pyramidRotation = direction;
    }
}