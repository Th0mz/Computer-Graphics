class RotatingObject {
    constructor (x, y, z) {
        this.speed = 0;
        this.cubeRotation = 0;
        this.cylinderRotation = 0;
        this.pyramidRotation = 0;
        this.rotationData = {
            cubeRotationDir:     0, cubeRotationSpeed:      0.01,
            cubeRotationDirInv:     0,
            cylinderRotationDir: 0,  cylinderRotationSpeed: 0.02,
            cylinderRotationDirInv: 0,
            pyramidRotationDir:  0, pyramidRotationSpeed:   0.03,
            pyramidRotationDirInv:  0
        };

        this.movementData = {
            xDir : 0,
            xDirInv : 0,
            yDir : 0,
            yDirInv : 0,
            zDir : 0,
            zDirInv : 0,
            speed : 5
        };

        //Pyramid and Group 1
        var pyramid = new Pyramid(0.5 * side_size, side_size, 4, 0xf4e285);
        pyramid.rotateZ(Math.PI * 0.5);
                
        this.pyramidGroup = new THREE.Group();
        this.pyramidGroup.add(pyramid);
        this.pyramidGroup.position.set(side_size,0,-2*side_size);

        //Cylinder and Group2 (Includes Group1)
        var cylinder = new Cylinder(0.5 * side_size, 4 * side_size, 32, 0x8cb369);
        cylinder.rotateX(Math.PI/2);
        
        this.cylinderGroup = new THREE.Group();
        this.cylinderGroup.add(cylinder);
        this.cylinderGroup.add(this.pyramidGroup);
        this.cylinderGroup.position.set(0, -2*side_size, 0);

        //Cube and Group3 (Includes Group2)
        var cube = new Cube(3 * side_size, 0xf4a259);

        this.cubeGroup = new THREE.Group();
        this.cubeGroup.add(cube);
        this.cubeGroup.add(this.cylinderGroup);
        this.cubeGroup.position.set(x * side_size, y * side_size, z * side_size);

        this.objectGroup = new THREE.Group();
        this.objectGroup.add(this.cubeGroup);
        this.objectGroup.position.set(0, 0, 0);
    }


    update () {
        this.cubeGroup.rotateZ(this.rotationData.cubeRotationSpeed * (this.rotationData.cubeRotationDir+this.rotationData.cubeRotationDirInv));
        this.cylinderGroup.rotateY(this.rotationData.cylinderRotationSpeed * (this.rotationData.cylinderRotationDir+this.rotationData.cylinderRotationDirInv));
        this.pyramidGroup.rotateX(this.rotationData.pyramidRotationSpeed * (this.rotationData.pyramidRotationDir+this.rotationData.pyramidRotationDirInv));

        this.objectGroup.translateX((this.movementData.xDir+this.movementData.xDirInv) * this.movementData.speed);
        this.objectGroup.translateY((this.movementData.yDir+this.movementData.yDirInv) * this.movementData.speed);
        this.objectGroup.translateZ((this.movementData.zDir+this.movementData.zDirInv) * this.movementData.speed);
    }

    updateMovementX (xDir) {
        this.movementData.xDir = xDir;
    }
    updateMovementXInv (xDirInv) {
        this.movementData.xDirInv = xDirInv;
    }

    updateMovementY (yDir) {
        this.movementData.yDir = yDir;
    }

    updateMovementYInv (yDirInv) {
        this.movementData.yDirInv = yDirInv;
    }

    updateMovementZ (zDir) {
        this.movementData.zDir = zDir;
    }

    updateMovementZInv (zDirInv) {
        this.movementData.zDirInv = zDirInv;
    }

    updateCubeRotation (direction) {
        this.rotationData.cubeRotationDir = direction;
    }
    
    updateCubeRotationInv (direction) {
        this.rotationData.cubeRotationDirInv = direction;
    }

    updateCylinderRotation (direction) {
        this.rotationData.cylinderRotationDir = direction;
    }

    updateCylinderRotationInv (direction) {
        this.rotationData.cylinderRotationDirInv = direction;
    }

    updatePyramidRotation (direction) {
        this.rotationData.pyramidRotationDir = direction;
    }

    updatePyramidRotationInv (direction) {
        this.rotationData.pyramidRotationDirInv = direction;
    }
}