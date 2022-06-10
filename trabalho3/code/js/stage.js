

class Stage{


    constructor(){


        //make floor plane
        var geometry = new THREE.PlaneGeometry(45,1);
        //geometry.rotateX(Math.PI*0.00);
        var material = new THREE.MeshBasicMaterial({color: 0x787878, side: THREE.DoubleSide});
        var plane = new THREE.Mesh(geometry, material);
        scene.add(plane);



        //make first podium step
        var lowerStep = createRectangle(0, 1.75, 0, 30, 2.5, 50, 0xaaaa00, false);
        //make second podium step
        var secondStep = createRectangle(0, 3, 0, 15, 2.5, 25, 0xaaaa00, false);

        //spotlight objects
        var spotlightOneBase = createPyramid(0, 0, 0, 3, 4, 64, 0x000000, false, Math.PI/2);
        var spotlightOneSphere = createSphere(0, 0, -3.5, 3, 0x999900, false);
        
        this.spotlightOne = new THREE.Group();
        this.spotlightOne.add(spotlightOneBase);
        this.spotlightOne.add(spotlightOneSphere);
        

        //lights
        this.actualLight = new THREE.SpotLight( 0x999999, 1, 0, Math.PI/6, 0, 1);
        this.actualLight.position.set(0,0,-3.5);
        scene.add(this.actualLight);
        
        this.spotlightOne.add(this.actualLight);
        this.spotlightOne.position.set(0, 3.75 + 0.875, 21);
        scene.add(this.spotlightOne);
        
        this.spotlightOne.rotateX(Math.PI/7)

    }
}