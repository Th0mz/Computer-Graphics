

const C = R/22;
const phi_max = Math.PI*2;
const theta_max = Math.PI;




class Debris {
    
    constructor (nr){
        this.firstQuadrant = [];
        this.firstQuadrantColSphere = [];
        this.secondQuadrant = [];
        this.secondQuadrantColSphere = [];
        this.thirdQuadrant = [];
        this.thirdQuadrantColSphere = [];
        this.fourthQuadrant = [];
        this.fourthQuadrantColSphere = [];


        let spherical = new THREE.Spherical(0,0,0);


        for (let i = 0; i < nr/3 ; i++) {

            let debris = createCube(0, 0, 0, C, 0xC0C0C0, false);
            spherical.set(1.2*R * side_size, Math.random()*phi_max, Math.random()*theta_max);
            debris.position.setFromSpherical(spherical);

            let sphereBoundry = new THREE.Sphere(debris.position, Math.sqrt(2*Math.pow(C,2)) * side_size);

            this.placeInQuadrant(debris, sphereBoundry, spherical);

            scene.add(debris);
            
        }

        for (let i = 0; i < nr/3; i++) {

            let debris = createPyramid(0, 0, 0, C, C, 3, 0x982F3F, false);
            spherical.set(1.2*R * side_size, Math.random()*phi_max, Math.random()*theta_max);
            debris.position.setFromSpherical(spherical);

            let sphereBoundry = new THREE.Sphere(debris.position, C*side_size);

            this.placeInQuadrant(debris, sphereBoundry, spherical);

            scene.add(debris);
            
        }

        for (let i = 0; i < nr/3; i++) {

            let debris = createSphere(0, 0, 0, C, 0xFFD700, false);
            spherical.set(1.2*R * side_size, Math.random()*phi_max, Math.random()*theta_max);
            debris.position.setFromSpherical(spherical);

            let sphereBoundry = new THREE.Sphere(debris.position, C*side_size);

            this.placeInQuadrant(debris, sphereBoundry, spherical);

            scene.add(debris);
            
        }

        /*console.log(this.firstQuadrant);
        console.log(this.secondQuadrant);
        console.log(this.thirdQuadrant);
        console.log(this.fourthQuadrant);*/


    }


    placeInQuadrant(debris, boundry, spherical) {
        
        //console.log(spherical);
        let debris_Phi = spherical.phi;
        let debris_Theta = spherical.theta;
        if(debris_Phi >= 0 && debris_Phi < phi_max/2 && debris_Theta >= 0 && debris_Theta < theta_max/2) { //firstQuadrant
            this.firstQuadrant.push(debris);
            this.firstQuadrantColSphere.push(boundry);
        } else if(debris_Phi >= phi_max/2 && debris_Phi < phi_max && debris_Theta >= 0 && debris_Theta < theta_max/2) { //secondQuadrant
            this.secondQuadrant.push(debris);
            this.secondQuadrantColSphere.push(boundry);
        } else if(debris_Phi >= phi_max/2 && debris_Phi < phi_max && debris_Theta >= theta_max/2 && debris_Theta < theta_max) { //thirdQuadrant
            this.thirdQuadrant.push(debris);
            this.thirdQuadrantColSphere.push(boundry);
        } else if(debris_Phi >= 0 && debris_Phi < phi_max/2 && debris_Theta >= theta_max/2 && debris_Theta < theta_max) { //fourthQuadrant
            this.fourthQuadrant.push(debris);
            this.fourthQuadrantColSphere.push(boundry);
        }

    }


    update () {

    }
}