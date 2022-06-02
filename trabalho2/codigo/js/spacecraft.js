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
        var propulsor1 = createCapsule(-baseSize[WIDTH] / 2, -baseSize[HEIGHT] / 2, 0, propulsorSize[WIDTH], propulsorSize[HEIGHT], 0xde4730);
        var propulsor2 = createCapsule(baseSize[WIDTH] / 2, -baseSize[HEIGHT] / 2, 0, propulsorSize[WIDTH], propulsorSize[HEIGHT], 0xde4730);
        var propulsor3 = createCapsule(0, -baseSize[HEIGHT] / 2, -baseSize[WIDTH] / 2, propulsorSize[WIDTH], propulsorSize[HEIGHT], 0xde4730);
        var propulsor4 = createCapsule(0, -baseSize[HEIGHT] / 2, baseSize[WIDTH] / 2, propulsorSize[WIDTH], propulsorSize[HEIGHT], 0xde4730);

        this.sphereBoundry = new THREE.Sphere(new THREE.Vector3(0,0,0), (height/2)*side_size);
        // spacecraft camera  
        this.camera = null

        // group spacecraft primitives 
        this.spacecraftGroup = new THREE.Group();
        this.spacecraftGroup.add(baseCylinder);
        this.spacecraftGroup.add(midCylinder);
        this.spacecraftGroup.add(noseCylinder);
        this.spacecraftGroup.add(propulsor1, propulsor2, propulsor3, propulsor4);
        this.spacecraftGroup.add(new THREE.AxesHelper(100));
        this.spacecraftGroup.position.set(0, 0, 0);

        this.lookAtGroup = new THREE.Group();
        this.lookAtGroup.add(this.spacecraftGroup);
        this.lookAtGroup.add(new THREE.AxesHelper(100));

        this.spherical = new THREE.Spherical(radius * side_size, phi, theta);
        this.spacecraftGroup.position.setFromSpherical(this.spherical);
        this.sphereBoundry.center.setFromSpherical(this.spherical);
        
        this.objectGroup = new THREE.Group();
        this.objectGroup.add(this.spacecraftGroup);
        this.objectGroup.position.set(0, 0, 0);

    }


    update () {
        
        var phiMovement = this.movementData.phiDir + this.movementData.phiDirInv;
        var thetaMovement = this.movementData.thetaDir + this.movementData.thetaDirInv;

        // TODO : normalizar speed da nave (velociadade angular deve
        //        ser constante)

        var next_phi = this.spherical.phi + phiMovement*this.movementData.speed/100;
        var next_theta = this.spherical.theta + thetaMovement*this.movementData.speed/100;

        if (next_theta >= 2*Math.PI) { next_theta = next_theta - (2*Math.PI); }
        if (next_theta < 0) { next_theta = 2*Math.PI + next_theta; }

        if (next_phi >= 2*Math.PI) { next_phi = next_phi - (2*Math.PI) }
        if(next_phi < 0) { next_phi = 2*Math.PI + next_phi; }


        this.spherical.set(this.spherical.radius, next_phi, next_theta);
        this.spacecraftGroup.position.setFromSpherical(this.spherical);
        this.sphereBoundry.center.setFromSpherical(this.spherical);
        
        if (this.spherical.phi % Math.PI >= 0 && this.spherical.phi % Math.PI <= 0.01) {
            this.lookAtGroup.rotateZ(Math.PI);
            this.spacecraftGroup.rotateZ(Math.PI);

            console.log("oleeeee");
        } else if (this.spherical.phi % Math.PI >= -Math.PI && this.spherical.phi % Math.PI <= -Math.PI + 0.01) {
            this.spacecraftGroup.rotateZ(Math.PI);
            console.log("olaaaaaaaa");
        }

        this.spacecraftGroup.lookAt(new THREE.Vector3(0, 0, 0));
    }

    toCartesianCoordinates (radius, phi, theta) {
        var x = radius * Math.sin(phi) * Math.cos(theta);
        var y = radius * Math.sin(phi) * Math.sin(theta);
        var z = radius * Math.cos(phi);

        return new THREE.Vector3(x, y, z);
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
        return (radius+(this.sphereBoundry.radius))**2 >= (x-this.sphereBoundry.center.x)**2 + 
        (y-this.sphereBoundry.center.y)**2 + (z-this.sphereBoundry.center.z)**2;
    }

    whichQuadrant() {
        if (this.spherical.phi <= Math.PI) {
            return Math.floor(this.spherical.phi / (Math.PI/4));  
        } else {
            return Math.floor((Math.PI-(this.spherical.phi-Math.PI)) / (Math.PI/4));
        }
        
    }

    createCamera () {
        // TODO : must be perspective camera
        this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );

        this.camera.position.set(0, -3 * side_size, -5 * side_size);
        this.camera.lookAt(scene.position);
        this.spacecraftGroup.add(this.camera);
    }
    getCamera () {
        return this.camera;
    }

}