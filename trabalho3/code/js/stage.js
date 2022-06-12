

class Stage{


    constructor(){


        //make floor plane
        var geometry = new THREE.PlaneGeometry(45,1);
        //geometry.rotateX(Math.PI*0.00);
        var material = new THREE.MeshBasicMaterial({color: 0x787878, side: THREE.DoubleSide});
        var plane = new THREE.Mesh(geometry, material);
        scene.add(plane);



        //make first podium step
        var lowerStep = createRectangle(0, 1.75, 0, 80, 2.5, 50, 0xaaaa00, false);
        //make second podium step
        var secondStep = createRectangle(0, 3, 0, 60, 2.5, 25, 0xaaaa00, false);

        /*===================================================== */
        /*===============     LEFT SPOTLIGHT     ============== */
        /*===================================================== */
        //spotlight objects
        var spotlightOneBase = createPyramid(0, 0, 0, 3, 4, 64, 0x000000, false, Math.PI/2);
        var spotlightOneSphere = createSphere(0, 0, -3.5, 3, 0x999900, false);
        
        this.spotlightOne = new THREE.Group();
        this.spotlightOne.add(spotlightOneBase);
        this.spotlightOne.add(spotlightOneSphere);
        this.spotlightOne.position.set(-23, 3.75 + 0.875, 21);
        scene.add(this.spotlightOne);
        this.spotlightOne.rotateX(Math.PI/7)
        

        //lights
        this.actualLight = new THREE.SpotLight( 0xffffff, 0.7, 0, Math.PI/6, 0, 1);

        var position_aux = new THREE.Vector3(-23,0,0);
        spotlightOneSphere.getWorldPosition(position_aux);

        this.actualLight.position.set(position_aux.x, position_aux.y, position_aux.z);
        this.actualLight.target.position.set(-23, 19, 0);
        this.actualLight.castShadow = false;
        this.actualLight.target.updateMatrixWorld();

        scene.add(this.actualLight);

        const spotLightHelper = new THREE.SpotLightHelper( this.actualLight );
        scene.add( spotLightHelper );

        
        console.log(this.actualLight)
        console.log(this.spotlightOne)

        /*===================================================== */
        /*==============    CENTRAL SPOTLIGHT    ============== */
        /*===================================================== */
        //spotlight objects
        var spotlightTwoBase = createPyramid(0, 0, 0, 3, 4, 64, 0x000000, false, Math.PI/2);
        var spotlightTwoSphere = createSphere(0, 0, -3.5, 3, 0x999900, false);
        
        this.spotlightTwo = new THREE.Group();
        this.spotlightTwo.add(spotlightTwoBase);
        this.spotlightTwo.add(spotlightTwoSphere);
        this.spotlightTwo.position.set(0, 3.75 + 0.875, 21);
        scene.add(this.spotlightTwo);
        this.spotlightTwo.rotateX(Math.PI/7)
        

        //lights
        this.actualLightTwo = new THREE.SpotLight( 0xffffff, 0.7, 0, Math.PI/6, 0, 1);

        var position_auxTwo = new THREE.Vector3(0,0,0);
        spotlightTwoSphere.getWorldPosition(position_auxTwo);

        this.actualLightTwo.position.set(position_auxTwo.x, position_auxTwo.y, position_auxTwo.z);
        this.actualLightTwo.target.position.set(0, 19, 0);
        this.actualLightTwo.castShadow = false;
        this.actualLightTwo.target.updateMatrixWorld();

        scene.add(this.actualLightTwo);

        const spotLightHelperTwo = new THREE.SpotLightHelper( this.actualLightTwo );
        scene.add( spotLightHelperTwo );

        
        console.log(this.actualLightTwo)
        console.log(this.spotlightTwo)



        /*===================================================== */
        /*===============    RIGHT SPOTLIGHT    =============== */
        /*===================================================== */
        //spotlight objects
        var spotlightThreeBase = createPyramid(0, 0, 0, 3, 4, 64, 0x000000, false, Math.PI/2);
        var spotlightThreeSphere = createSphere(0, 0, -3.5, 3, 0x999900, false);
        
        this.spotlightThree = new THREE.Group();
        this.spotlightThree.add(spotlightThreeBase);
        this.spotlightThree.add(spotlightThreeSphere);
        this.spotlightThree.position.set(23, 3.75 + 0.875, 21);
        scene.add(this.spotlightThree);
        this.spotlightThree.rotateX(Math.PI/7)
        

        //lights
        this.actualLightThree = new THREE.SpotLight( 0xffffff, 0.7, 0, Math.PI/6, 0, 1);

        var position_auxThree = new THREE.Vector3(23,0,0);
        spotlightThreeSphere.getWorldPosition(position_auxThree);

        this.actualLightThree.position.set(position_auxThree.x, position_auxThree.y, position_auxThree.z);
        this.actualLightThree.target.position.set(23, 19, 0);
        this.actualLightThree.castShadow = false;
        this.actualLightThree.target.updateMatrixWorld();

        scene.add(this.actualLightThree);

        const spotLightHelperThree = new THREE.SpotLightHelper( this.actualLightThree );
        scene.add( spotLightHelperThree );

        
        console.log(this.actualLightThree)
        console.log(this.spotlightThree)
    }

    toggleLeft() {
        this.actualLight.visible = !this.actualLight.visible;
    }

    toggleCenter() {
        this.actualLightTwo.visible = !this.actualLightTwo.visible;
    }

    toggleRight() {
        this.actualLightThree.visible = !this.actualLightThree.visible;
    }
}