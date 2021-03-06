var WIDTH = 0;
var HEIGHT = 1;

var flipped = 1
var forward_angle = Math.PI;
var backward_angle = 0;
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
            speed : 50
        };
        
        // spacecraft primitives definition
        var baseSize = [3 * this.unit, 6 * this.unit]
        var noseSize =  [3 * this.unit, 3.5 * this.unit]
        var propulsorSize = [1.1 * this.unit, 3 * this.unit]

        var base = createCylinder(0, 0, 0, baseSize[WIDTH], baseSize[HEIGHT], 16, 0xc1c1c1);
        var nose = createPyramid(0, baseSize[HEIGHT] / 2 + noseSize[HEIGHT] / 2 , 0, noseSize[WIDTH], noseSize[HEIGHT], 32, 0xde4730)
        var propulsor1 = createCapsule(-baseSize[WIDTH] / 2, -baseSize[HEIGHT] / 2, 0, propulsorSize[WIDTH], propulsorSize[HEIGHT], 0xde4730);
        var propulsor2 = createCapsule(baseSize[WIDTH] / 2, -baseSize[HEIGHT] / 2, 0, propulsorSize[WIDTH], propulsorSize[HEIGHT], 0xde4730);
        var propulsor3 = createCapsule(0, -baseSize[HEIGHT] / 2, -baseSize[WIDTH] / 2, propulsorSize[WIDTH], propulsorSize[HEIGHT], 0xde4730);
        var propulsor4 = createCapsule(0, -baseSize[HEIGHT] / 2, baseSize[WIDTH] / 2, propulsorSize[WIDTH], propulsorSize[HEIGHT], 0xde4730);


        this.sphereBoundry = new THREE.Sphere(new THREE.Vector3(0,0,0), Math.sqrt(Math.pow(3/2,2)*Math.pow(height/2,2))*side_size);

        // spacecraft camera  
        this.camera = null

        // group spacecraft primitives 
        this.spacecraftGroup = new THREE.Group();
        this.spacecraftGroup.add(base);
        this.spacecraftGroup.add(nose);
        this.spacecraftGroup.add(propulsor1, propulsor2, propulsor3, propulsor4);
        
        this.spacecraftGroup.position.set(0, 0, 0);

        this.lookAtGroup = new THREE.Group();
        this.lookAtGroup.add(this.spacecraftGroup);
        

        this.spherical = new THREE.Spherical(radius * side_size, phi, theta);
        this.lookAtGroup.position.setFromSpherical(this.spherical);

        this.sphereBoundry.center.setFromSpherical(this.spherical);
        
        this.objectGroup = new THREE.Group();
        this.objectGroup.add(this.lookAtGroup);
        this.objectGroup.position.set(0, 0, 0);

    }


    update (delta_time) {
        
        var phiMovement = this.movementData.phiDir + this.movementData.phiDirInv;
        var thetaMovement = this.movementData.thetaDir + this.movementData.thetaDirInv;

        //calculate the "hypotenuse" on a spherical surface
        var speed = (phiMovement!=0 && thetaMovement!=0) ? Math.acos(Math.sqrt(Math.cos(this.movementData.speed/100))) : this.movementData.speed/100;
        
        var next_phi = this.spherical.phi + phiMovement*speed*delta_time;
        var next_theta = this.spherical.theta + thetaMovement*speed*delta_time;

        if (next_theta >= 2*Math.PI) { next_theta = next_theta - (2*Math.PI); }
        if (next_theta < 0) { next_theta = 2*Math.PI + next_theta; }

        if (next_phi >= 2*Math.PI) { next_phi = next_phi - (2*Math.PI) }
        if(next_phi < 0) { next_phi = 2*Math.PI + next_phi; }


        this.spherical.set(this.spherical.radius, next_phi, next_theta);
        this.lookAtGroup.position.setFromSpherical(this.spherical);
        this.sphereBoundry.center.setFromSpherical(this.spherical);
        
        // set the spaceship looking direction to its velocity vector
        // FORWARD
        if (phiMovement == -1) {
            // FORWARD RIGHT
            if (thetaMovement == 1) {
                this.spacecraftGroup.rotation.set(0, 0, forward_angle - flipped * right_angle / 2);

            // FORWARD LEFT
            } else if (thetaMovement == -1) {
                this.spacecraftGroup.rotation.set(0, 0, forward_angle - flipped * left_angle / 2);

            } else {
                this.spacecraftGroup.rotation.set(0, 0, forward_angle);
            }
        
        // BACKWARD
        } else if (phiMovement == 1) {
            // BACKWARD RIGHT
            if (thetaMovement == 1) {
                this.spacecraftGroup.rotation.set(0, 0, backward_angle + flipped * right_angle / 2);

            // BACKWARD LEFT
            } else if (thetaMovement == -1) {
                this.spacecraftGroup.rotation.set(0, 0, backward_angle + flipped * left_angle / 2);

            } else {
                this.spacecraftGroup.rotation.set(0, 0, backward_angle);
            }
        
        // LEFT
        } else if (thetaMovement == -1) {
            this.spacecraftGroup.rotation.set(0, 0, left_angle);
        
        // RIGHT
        } else if (thetaMovement == 1) {
            this.spacecraftGroup.rotation.set(0, 0, right_angle);
        }

        // north and south poles the spacecraft rotates by PI so
        // in order to cancel this rotation another PI is added on top
        //
        
        if ((this.spherical.phi % Math.PI >= 0 && this.spherical.phi % Math.PI <= 0.01) 
        || (this.spherical.phi % Math.PI >= -Math.PI && this.spherical.phi % Math.PI <= -Math.PI + 0.01)) {
            //console.log("rotated"); 
            var aux = forward_angle;
            forward_angle = backward_angle;
            backward_angle = aux;
            flipped = flipped * -1;
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
        return (radius+(this.sphereBoundry.radius))**2 >= (x-this.sphereBoundry.center.x)**2 + 
        (y-this.sphereBoundry.center.y)**2 + (z-this.sphereBoundry.center.z)**2;
    }

    whichQuadrant() {
        //1 radian -> angle for which the length of the arc equals the length of the radius
        //radians for the spacecraft = height/radius
        let radians = this.height / R;

        if (this.spherical.phi <= Math.PI) { //standard calculation
            var standard = Math.floor(this.spherical.phi / (Math.PI/4));
            var marginBelow = Math.floor((this.spherical.phi-radians) / (Math.PI/4));
            var marginAbove = Math.floor((this.spherical.phi+radians) / (Math.PI/4));
            if(standard != marginBelow) {
                return [standard, marginBelow];
            } else if(standard != marginAbove) {
                return [standard,marginAbove];
            } else {
                return [standard];
            }
        } else { //calculation when the spacecraft has passed one of the poles
            var standard = Math.floor((Math.PI-(this.spherical.phi-Math.PI)) / (Math.PI/4));
            var marginBelow = Math.floor((Math.PI-((this.spherical.phi+radians)-Math.PI)) / (Math.PI/4));
            var marginAbove = Math.floor((Math.PI-((this.spherical.phi-radians)-Math.PI)) / (Math.PI/4));
            if(standard != marginBelow) {
                return [standard, marginBelow];
            } else if(standard != marginAbove) {
                return [standard,marginAbove];
            } else {
                return [standard];
            }
        }
    }

    createCamera () {
        this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );

        this.camera.position.set(0, -3 * side_size, -5 * side_size);
        this.camera.lookAt(scene.position);
        this.spacecraftGroup.add(this.camera);
    }
    getCamera () {
        return this.camera;
    }

}