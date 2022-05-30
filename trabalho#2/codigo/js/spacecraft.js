class Spacecraft {
    constructor (x, y, z, height) {
        this.unit = height/11;
        this.height = height;
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
        
        var propulsor1 = new THREE.CapsuleGeometry(this.unit/2, this.unit*2);
        var propulsor2 = new THREE.CapsuleGeometry(this.unit/2, this.unit*2);
        var propulsor3 = new THREE.CapsuleGeometry(this.unit/2, this.unit*2);
        var propulsor4 = new THREE.CapsuleGeometry(this.unit/2, this.unit*2);
        
        //TODO check initial orientation, might have to change intial values
        propulsor1.position.set(this.unit, 0, 0);
        propulsor2.position.set(-this.unit, 0, 0);
        propulsor3.position.set(0 , 0, -this.unit);
        propulsor4.position.set(0 , 0, this.unit);

        this.propulsorGroup = new THREE.Group();
        this.propulsorGroup.add(propulsor1, propulsor2, propulsor3, propulsor4);
        this.propulsorGroup.position.set(0, -4.5 * this.unit, 0);


        var mainCylinder = new THREE.CylinderGeometry(1.5 * this.unit, 1.5 * this.unit, 7 * this.unit, 16);

        this.mainCylinderGroup = new THREE.Goup();
        this.mainCylinderGroup.add(mainCylinder);
        this.mainCylinderGroup.add(this.propulsorGroup);
        this.mainCylinderGroup.position.set(0, -4.5 * this.unit, 0);


        var noseCylinder = new THREE.CylinderGeometry(1.5 * this.unit, 1.5 * this.unit, 2 * this.unit, 16);

        this.spacecraftGroup = new THREE.Group();
        this.spacecraftGroup.add(noseCylinder);
        this.spacecraftGroup.add(this.mainCylinderGroup);
        this.spacecraftGroup.position.set(0, 0, 4.5 * this.unit);
        this.spacecraftGroup.rotateX(Math.PI/2);

        this.objectGroup = new THREE.Group();
        this.objectGroup.add(this.spacecraftGroup);
        this.objectGroup.position.set(0, 0, 0);
    }


    update () {

        //TODO rotations necessary ? 
        /* x_rotation = (this.rotationData.pyramidRotationDir+this.rotationData.pyramidRotationDirInv);
        y_rotation = (this.rotationData.cylinderRotationDir+this.rotationData.cylinderRotationDirInv);
        z_rotation = (this.rotationData.cubeRotationDir+this.rotationData.cubeRotationDirInv);
        num_dim_rot = Math.abs(x_rotation)+Math.abs(y_rotation)+Math.abs(z_rotation);
 */
        x_transl = (this.movementData.xDir+this.movementData.xDirInv);
        y_transl = (this.movementData.yDir+this.movementData.yDirInv);
        z_transl = (this.movementData.zDir+this.movementData.zDirInv);
        num_dim_transl = Math.abs(x_transl)+Math.abs(y_transl)+Math.abs(z_transl);

        /* if (num_dim_rot > 1) {
            x_rotation = Math.sqrt(x_rotation / num_dim_rot);
            y_rotation = Math.sqrt(y_rotation / num_dim_rot);
            z_rotation = Math.sqrt(z_rotation / num_dim_rot);
        } */

        if (num_dim_transl > 1) {
            x_transl = Math.sqrt(x_transl / num_dim_transl);
            y_transl = Math.sqrt(y_transl / num_dim_transl);
            z_transl = Math.sqrt(z_transl / num_dim_transl);
        }

        /* this.cubeGroup.rotateZ(this.rotationData.cubeRotationSpeed * z_rotation);
        this.cylinderGroup.rotateY(this.rotationData.cylinderRotationSpeed * y_rotation);
        this.pyramidGroup.rotateX(this.rotationData.pyramidRotationSpeed * x_rotation); */

        this.objectGroup.translateX( x_transl * this.movementData.speed);
        this.objectGroup.translateY( y_transl * this.movementData.speed);
        this.objectGroup.translateZ( z_transl * this.movementData.speed);
    }

    moveX () { this.movementData.xDir = 1; }
    stopX () { this.movementData.xDir = 0; }

    moveXInv () { this.movementData.xDirInv = -1; }
    stopXInv () { this.movementData.xDirInv = 0; }

    moveY () { this.movementData.yDir = 1; }
    stopY () { this.movementData.yDir = 0; }

    moveYInv () { this.movementData.yDirInv = -1; }
    stopYInv () { this.movementData.yDirInv = 0; }

    moveZ () { this.movementData.zDir = 1; }
    stopZ () { this.movementData.zDir = 0; }

    moveZInv () { this.movementData.zDirInv = -1; }
    stopZInv () { this.movementData.zDirInv = 0; }

    //TODO rotations necessary ? 

    /* updateCubeRotation (direction) {
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
    } */
}