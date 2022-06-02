

const C = R/22;
const phi_max = Math.PI;
const theta_max = Math.PI*2;




class Debris {
    
    constructor (nr){
        this.quadrant = [[], [], [], []];   

        for (let i = 0; i < nr/3 ; i++) {

            let debris = createCube(0, 0, 0, C, 0xC0C0C0, false);
            let spherical = new THREE.Spherical(0,0,0);
            spherical.set(-1.2*R * side_size, Math.random()*phi_max, Math.random()*theta_max);
            debris.position.setFromSpherical(spherical);

            let sphereBoundry = new THREE.Sphere(debris.position, Math.sqrt(2*Math.pow(C/2,2)) * side_size);

            this.placeInQuadrant(debris, sphereBoundry, spherical);

            scene.add(debris);
            
        }

        for (let i = 0; i < nr/3; i++) {

            let debris = createPyramid(0, 0, 0, C, C, 3, 0x982F3F, false);
            let spherical = new THREE.Spherical(0,0,0);
            spherical.set(-1.2*R * side_size, Math.random()*phi_max, Math.random()*theta_max);
            debris.position.setFromSpherical(spherical);

            let sphereBoundry = new THREE.Sphere(debris.position, Math.sqrt(Math.pow(C,2)*Math.pow(C/2,2))*side_size);

            this.placeInQuadrant(debris, sphereBoundry, spherical);

            scene.add(debris);
            
        }

        for (let i = 0; i < nr/3; i++) {

            let debris = createSphere(0, 0, 0, C, 0xFFD700, false);
            let spherical = new THREE.Spherical(0,0,0);
            spherical.set(-1.2*R * side_size, Math.random()*phi_max, Math.random()*theta_max);
            debris.position.setFromSpherical(spherical);

            let sphereBoundry = new THREE.Sphere(debris.position, C*side_size);

            this.placeInQuadrant(debris, sphereBoundry, spherical);

            scene.add(debris);
            
        }

    }


    placeInQuadrant(debris, boundry, spherical) {
        this.quadrant[Math.floor(spherical.phi / (Math.PI/4))].push({deb : debris, bo : boundry});
    }


    update () {

    }
}