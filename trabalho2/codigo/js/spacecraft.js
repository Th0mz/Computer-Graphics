var WIDTH = 0;
var HEIGHT = 1;

var forward_angle = 0;
var backward_angle = Math.PI;
var left_angle = -Math.PI / 2;
var right_angle = Math.PI / 2;

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
        var noseSize =  [3 * this.unit, 3.5 * this.unit]
        var propulsorSize = [1.1 * this.unit, 3 * this.unit]

        var baseCylinder = createCylinder(0, 0, 0, baseSize[WIDTH], baseSize[HEIGHT], 16, 0xc1c1c1);
        var nose = createPyramid(0, baseSize[HEIGHT] / 2 + noseSize[HEIGHT] / 2 , 0, noseSize[WIDTH], noseSize[HEIGHT], 32, 0xde4730)
        var propulsor1 = createCapsule(-baseSize[WIDTH] / 2, -baseSize[HEIGHT] / 2, 0, propulsorSize[WIDTH], propulsorSize[HEIGHT], 0xde4730);
        var propulsor2 = createCapsule(baseSize[WIDTH] / 2, -baseSize[HEIGHT] / 2, 0, propulsorSize[WIDTH], propulsorSize[HEIGHT], 0xde4730);
        var propulsor3 = createCapsule(0, -baseSize[HEIGHT] / 2, -baseSize[WIDTH] / 2, propulsorSize[WIDTH], propulsorSize[HEIGHT], 0xde4730);
        var propulsor4 = createCapsule(0, -baseSize[HEIGHT] / 2, baseSize[WIDTH] / 2, propulsorSize[WIDTH], propulsorSize[HEIGHT], 0xde4730);

        this.components = [baseCylinder, nose, propulsor1, propulsor2, propulsor3, propulsor4];

        // spacecraft camera  
        this.camera = null

        // group spacecraft primitives 
        this.spacecraftGroup = new THREE.Group();
        this.spacecraftGroup.add(baseCylinder);
        this.spacecraftGroup.add(nose);
        this.spacecraftGroup.add(propulsor1, propulsor2, propulsor3, propulsor4);
        this.spacecraftGroup.add(new THREE.AxesHelper(100));
        this.spacecraftGroup.position.set(0, 0, 0);


        this.lookAtGroup = new THREE.Group();
        this.lookAtGroup.add(this.spacecraftGroup);
        this.lookAtGroup.add(new THREE.AxesHelper(100));

        this.spherical = new THREE.Spherical(radius * side_size, phi, theta);
        this.lookAtGroup.position.setFromSpherical(this.spherical);
        
        this.objectGroup = new THREE.Group();
        this.objectGroup.add(this.lookAtGroup);
        this.objectGroup.position.set(0, 0, 0);

    }


    update () {
        
        var phiMovement = this.movementData.phiDir + this.movementData.phiDirInv;
        var thetaMovement = this.movementData.thetaDir + this.movementData.thetaDirInv;

        // TODO : normalizar speed da nave (velociadade angular deve
        //        ser constante)
        this.spherical.set(this.spherical.radius, this.spherical.phi + phiMovement*this.movementData.speed/100, 
                                this.spherical.theta + thetaMovement*this.movementData.speed/100);
        this.lookAtGroup.position.setFromSpherical(this.spherical);
        
        // set the spaceship looking direction to its velocity vector
        // FORWARD
        if (phiMovement == -1) {
            // FORWARD RIGHT
            if (thetaMovement == 1) {
                console.log("forward right");
                this.spacecraftGroup.rotation.set(0, 0, forward_angle + right_angle / 2);

            // FORWARD LEFT
            } else if (thetaMovement == -1) {
                console.log("forward left");
                this.spacecraftGroup.rotation.set(0, 0, forward_angle + left_angle / 2);

            } else {
                console.log("forward");
                this.spacecraftGroup.rotation.set(0, 0, forward_angle);
            }
        
        // BACKWARD
        } else if (phiMovement == 1) {
            // BACKWARD RIGHT
            if (thetaMovement == 1) {
                console.log("backward right");
                this.spacecraftGroup.rotation.set(0, 0, backward_angle - right_angle / 2);

            // BACKWARD LEFT
            } else if (thetaMovement == -1) {
                console.log("backward left");
                this.spacecraftGroup.rotation.set(0, 0, backward_angle - left_angle / 2);

            } else {
                console.log("backward");
                this.spacecraftGroup.rotation.set(0, 0, backward_angle);
            }
        
        // LEFT
        } else if (thetaMovement == -1) {
            console.log("left");
            this.spacecraftGroup.rotation.set(0, 0, left_angle);
        
        // RIGHT
        } else if (thetaMovement == 1) {
            console.log("right");
            this.spacecraftGroup.rotation.set(0, 0, right_angle);
        }

        // north and south poles the spacecraft rotates by PI so
        // in order to cancel this rotation another PI is added on top
        //
        // TODO : isto funciona mas sem o código para a nave olhar no
        //        entido da direção
        
        if ((this.spherical.phi % Math.PI >= 0 && this.spherical.phi % Math.PI <= 0.01) 
        || (this.spherical.phi % Math.PI >= -Math.PI && this.spherical.phi % Math.PI <= -Math.PI + 0.01)) {
            console.log("rotated"); 
            var aux = forward_angle;
            forward_angle = backward_angle;
            backward_angle = aux;
            this.spacecraftGroup.rotation.set(0, 0, this.spacecraftGroup.rotation.z + Math.PI);
        } 

        // y and x axis are always tangent to 
        // the spaceship trajectory
        this.lookAtGroup.lookAt(new THREE.Vector3(0, 0, 0));
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
        this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );

        this.camera.position.set(0, -3 * side_size, -5 * side_size);
        this.camera.lookAt(scene.position);
        this.spacecraftGroup.add(this.camera);
    }
    getCamera () {
        return this.camera;
    }

}