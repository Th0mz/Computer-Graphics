var vector;
class RotatingObject {
    constructor (x, y, z) {
        this.speed = 0;
        this.cubeRotation = 0;
        this.cylinderRotation = 0;
        this.pyramidRotation = 0;
        this.rotationData = {cubeRotationDir:     0, cubeRotationSpeed:      0.01,
                             cylinderRotationDir: 0,  cylinderRotationSpeed: 0.02,
                             pyramidRotationDir:  0, pyramidRotationSpeed:   0.03};
        


        //Pyramid and Group 1
        var pyramid = new Pyramid(0.5 * side_size, side_size, 4, 0x00ff00);
        pyramid.rotateZ(Math.PI * 0.5);
                
        this.pyramidGroup = new THREE.Group();
        this.pyramidGroup.add(pyramid);
        this.pyramidGroup.position.set(side_size,0,-2*side_size);

        //Cylinder and Group2 (Includes Group1)
        var cylinder = new Cylinder(0.5 * side_size, 4 * side_size, 32, 0x0000ff);
        cylinder.rotateX(Math.PI/2);
        
        this.cylinderGroup = new THREE.Group();
        this.cylinderGroup.add(cylinder);
        this.cylinderGroup.add(this.pyramidGroup);
        this.cylinderGroup.position.set(0, -2*side_size, 0);

        //Cube and Group3 (Includes Group2)
        var cube = new Cube(3 * side_size, 0xff0000);

        this.cubeGroup = new THREE.Group();
        this.cubeGroup.add(cube);
        this.cubeGroup.add(this.cylinderGroup);
        this.cubeGroup.position.set(x * side_size, y * side_size, z * side_size);
    }


    update () {
        this.cubeGroup.rotateZ(this.rotationData.cubeRotationSpeed * this.rotationData.cubeRotationDir);
        this.cylinderGroup.rotateY(this.rotationData.cylinderRotationSpeed * this.rotationData.cylinderRotationDir);
        this.pyramidGroup.rotateX(this.rotationData.pyramidRotationSpeed * this.rotationData.pyramidRotationDir);
    }

    updateCubeRotation (direction) {
        this.rotationData.cubeRotationDir = direction;
    }

    updateCylinderRotation (direction) {
        //this.cylinderRotation = degree;
        this.rotationData.cylinderRotationDir = direction;
    }

    updatePyramidRotation (direction) {
        //this.pyramidRotation = degree;
        this.rotationData.pyramidRotationDir = direction;
    }
}