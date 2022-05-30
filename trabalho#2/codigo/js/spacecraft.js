class Spacecraft {
    constructor (x, y, z, height) {
        // TODO : not using x, y, z 
        this.unit = height/11;
        this.height = height;
        this.speed = 0;

        this.movementData = {
            xDir : 0, xDirInv : 0,
            yDir : 0, yDirInv : 0,
            zDir : 0, zDirInv : 0,
            speed : 5
        };
        
        /*
        var propulsor1 = new THREE.CapsuleGeometry(this.unit/2, this.unit*2);
        var propulsor2 = new THREE.CapsuleGeometry(this.unit/2, this.unit*2);
        var propulsor3 = new THREE.CapsuleGeometry(this.unit/2, this.unit*2);
        var propulsor4 = new THREE.CapsuleGeometry(this.unit/2, this.unit*2);
        */

        // var capsule = new THREE.CapsuleGeometry( 1, 1, 4, 8 );

        var propulsor1 = createSphere(this.unit, 0, 0, this.unit, 0x00ff00) 
        var propulsor2 = createSphere(-this.unit, 0, 0, this.unit, 0x00ff00)
        var propulsor3 = createSphere(0, 0, -this.unit, this.unit, 0x00ff00)
        var propulsor4 = createSphere(0, 0, this.unit, this.unit, 0x00ff00)

        //TODO check initial orientation, might have to change intial values
        // TODO : heirarquicamente, não há distinção em grupos deste objeto
        // já que ele se comporta como um todo
        this.propulsorGroup = new THREE.Group();
        this.propulsorGroup.add(propulsor1, propulsor2, propulsor3, propulsor4);
        this.propulsorGroup.position.set(0, -4.5 * this.unit, 0);


        var baseCylinder = createCylinder(0, 0, 0, 3 * this.unit,  7 * this.unit, 16, 0xff0000) 
        
        this.baseGroup = new THREE.Group();
        this.baseGroup.add(baseCylinder);
        this.baseGroup.add(this.propulsorGroup);
        this.baseGroup.position.set(0, -4.5 * this.unit, 0);


        var noseCylinder = createCylinder(0, 0, 0, 3 * this.unit, 2 * this.unit, 16, 0x0000ff)

        this.spacecraftGroup = new THREE.Group();
        this.spacecraftGroup.add(noseCylinder);
        this.spacecraftGroup.add(this.baseGroup);
        this.spacecraftGroup.position.set(0, 0, 4.5 * this.unit);
        this.spacecraftGroup.rotateX(Math.PI/2);

        this.objectGroup = new THREE.Group();
        this.objectGroup.add(this.spacecraftGroup);
        this.objectGroup.position.set(0, 0, 0);
    }


    update () {
        
        /* Use JS built in Vector class for defining the direction
           of the spaceship (functions like a normal vector) */
        x_transl = (this.movementData.xDir+this.movementData.xDirInv);
        y_transl = (this.movementData.yDir+this.movementData.yDirInv);
        z_transl = (this.movementData.zDir+this.movementData.zDirInv);
        num_dim_transl = Math.abs(x_transl)+Math.abs(y_transl)+Math.abs(z_transl);

        if (num_dim_transl > 1) {
            x_transl = Math.sqrt(x_transl / num_dim_transl);
            y_transl = Math.sqrt(y_transl / num_dim_transl);
            z_transl = Math.sqrt(z_transl / num_dim_transl);
        }

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

}