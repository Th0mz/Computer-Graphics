var WIDTH = 0
var HEIGHT = 1

class Spacecraft {
    constructor (x, y, z, height) {
        // TODO : not using x, y, z 
        this.unit = height/11;
        this.height = height;
        this.speed = 0;

        this.movementData = {
            phiDir : 0, phiDirInv : 0,
            thetaDir : 0, thetaDirInv : 0,
            speed : 1
        };
        
        /*
        var propulsor1 = new THREE.CapsuleGeometry(this.unit/2, this.unit*2);
        var propulsor2 = new THREE.CapsuleGeometry(this.unit/2, this.unit*2);
        var propulsor3 = new THREE.CapsuleGeometry(this.unit/2, this.unit*2);
        var propulsor4 = new THREE.CapsuleGeometry(this.unit/2, this.unit*2);
        */

        //TODO check initial orientation, might have to change intial values
        // TODO : heirarquicamente, não há distinção em grupos deste objeto
        // já que ele se comporta como um todo

        var baseSize = [3 * this.unit, 6 * this.unit]
        var midSize =  [2.5 * this.unit, 2 * this.unit]
        var noseSize = [1.2 * this.unit, 1.5 * this.unit]
        var propulsorSize = [1.1 * this.unit, 3 * this.unit]

        var baseCylinder = createCylinder(0, 0, 0, baseSize[WIDTH], baseSize[HEIGHT], 16, 0xc1c1c1);
        var midCylinder = createCylinder(0, baseSize[HEIGHT] / 2 + midSize[HEIGHT] / 2 , 0, midSize[WIDTH], midSize[HEIGHT], 16, 0xb8b8b8);
        var noseCylinder = createCylinder(0, baseSize[HEIGHT] / 2 + midSize[HEIGHT] + noseSize[HEIGHT] / 2, 0, noseSize[WIDTH], noseSize[HEIGHT], 16, 0xde4730);
        var propulsor1 = createCylinder(-baseSize[WIDTH] / 2, -baseSize[HEIGHT] / 2, 0, propulsorSize[WIDTH], propulsorSize[HEIGHT], 16, 0xde4730);
        var propulsor2 = createCylinder(baseSize[WIDTH] / 2, -baseSize[HEIGHT] / 2, 0, propulsorSize[WIDTH], propulsorSize[HEIGHT], 16, 0xde4730);
        var propulsor3 = createCylinder(0, -baseSize[HEIGHT] / 2, -baseSize[WIDTH] / 2, propulsorSize[WIDTH], propulsorSize[HEIGHT], 16, 0xde4730);
        var propulsor4 = createCylinder(0, -baseSize[HEIGHT] / 2, baseSize[WIDTH] / 2, propulsorSize[WIDTH], propulsorSize[HEIGHT], 16, 0xde4730);

        this.components = [baseCylinder, midCylinder, noseCylinder, propulsor1, propulsor2, propulsor3, propulsor4];

        this.spacecraftGroup = new THREE.Group();
        this.spacecraftGroup.add(baseCylinder);
        this.spacecraftGroup.add(midCylinder);
        this.spacecraftGroup.add(noseCylinder);
        this.spacecraftGroup.add(propulsor1, propulsor2, propulsor3, propulsor4);

        this.spacecraftGroup.position.set(x * side_size, y * side_size, z * side_size);

        this.objectGroup = new THREE.Group();
        this.objectGroup.add(this.spacecraftGroup);
        this.objectGroup.position.set(0, 0, 0);

        this.spherical = new THREE.Spherical(0,0,0);
        this.spherical.setFromVector3(this.spacecraftGroup.position);

    }


    update () {
        
        /* Use JS built in Vector class for defining the direction
           of the spaceship (functions like a normal vector) */
        /* x_transl = (this.movementData.phiDir+this.movementData.phiDirInv);
        y_transl = (this.movementData.thetaDir+this.movementData.thetaDirInv);
        z_transl = (this.movementData.zDir+this.movementData.zDirInv);
        num_dim_transl = Math.abs(x_transl)+Math.abs(y_transl)+Math.abs(z_transl);

        if (num_dim_transl > 1) {
            x_transl = Math.sqrt(x_transl / num_dim_transl);
            y_transl = Math.sqrt(y_transl / num_dim_transl);
            z_transl = Math.sqrt(z_transl / num_dim_transl);
        }

        this.objectGroup.translateX( x_transl * this.movementData.speed);
        this.objectGroup.translateY( y_transl * this.movementData.speed);
        this.objectGroup.translateZ( z_transl * this.movementData.speed); */

        var phiMovement = this.movementData.phiDir + this.movementData.phiDirInv;
        var thetaMovement = this.movementData.thetaDir + this.movementData.thetaDirInv;

        this.spherical.set(this.spherical.radius, this.spherical.phi + phiMovement*this.movementData.speed/100, 
                                this.spherical.theta + thetaMovement*this.movementData.speed/100);
        this.spacecraftGroup.position.setFromSpherical(this.spherical);
    }

    movePhi () { this.movementData.phiDir = 1; }
    stopPhi () { this.movementData.phiDir = 0; }

    movePhiInv () { this.movementData.phiDirInv = -1; }
    stopPhiInv () { this.movementData.phiDirInv = 0; }

    moveTheta () { this.movementData.thetaDir = 1; }
    stopTheta () { this.movementData.thetaDir = 0; }

    moveThetaInv () { this.movementData.thetaDirInv = -1; }
    stopThetaInv () { this.movementData.thetaDirInv = 0; }

    doCollide(radius, x, y, z) {
        for (component in components){
            if((radius+(component.getAttribute(height)/2))**2 >= (x-component.position.x)**2 + 
                            (y-component.position.y)**2 + (z-component.position.z)**2) {
                                return true;
            }
        }
        return false;
    }

    whichQuadrant() {
        return Math.floor(this.spherical.phi/(Math.PI/2));
    }

}