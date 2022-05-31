var WIDTH = 0
var HEIGHT = 1

class Spacecraft {
    constructor (radius, phi, theta, height) {
        this.unit = height/11;
        this.height = height;
        this.speed = 0;
        
        this.movementData = {
            phiDir : 0, phiDirInv : 0,
            thetaDir : 0, thetaDirInv : 0,
            speed : 1
        };
        
        // spacecraft primitives definition
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

        // spacecraft camera  
        this.camera = null

        // group spacecraft primitives 
        this.spacecraftGroup = new THREE.Group();
        this.spacecraftGroup.add(baseCylinder);
        this.spacecraftGroup.add(midCylinder);
        this.spacecraftGroup.add(noseCylinder);
        this.spacecraftGroup.add(propulsor1, propulsor2, propulsor3, propulsor4);

        this.spherical = new THREE.Spherical(radius * side_size, phi, theta);
        this.spacecraftGroup.position.setFromSpherical(this.spherical);

        this.objectGroup = new THREE.Group();
        this.objectGroup.add(this.spacecraftGroup);
        this.objectGroup.position.set(0, 0, 0);

    }


    update () {
        
        var phiMovement = this.movementData.phiDir + this.movementData.phiDirInv;
        var thetaMovement = this.movementData.thetaDir + this.movementData.thetaDirInv;

        // TODO : normalizar speed da nave (velociadade angular deve
        //        ser constante)
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

    createCamera () {
        // TODO : must be perspective camera
        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );

        this.camera.position.set(-5 * side_size, side_size, 0);
        this.camera.lookAt(scene.position);
        this.spacecraftGroup.add(this.camera)
    }
    getCamera () {
        return this.camera;
    }

}