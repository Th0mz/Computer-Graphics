

class Stage{


    constructor(){


        //make floor plane
        var geometry = new THREE.PlaneGeometry(45,1);
        //geometry.rotateX(Math.PI*0.00);
        var material = new THREE.MeshBasicMaterial({color: 0x787878, side: THREE.DoubleSide});
        this.plane = new THREE.Mesh(geometry, material);



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
        this.spotlightOne.position.set(0, 3.75 + 0.875, 21);
        this.spotlightOne.rotateX(Math.PI/7)
        

        //lights
        this.actualLight = new THREE.SpotLight( 0xffffff, 0.7, 0, Math.PI/6, 0, 1);

        var position_aux = new THREE.Vector3(0,0,0);
        spotlightOneSphere.getWorldPosition(position_aux);

        this.actualLight.position.set(position_aux.x, position_aux.y, position_aux.z);
        this.actualLight.target.position.set(0, 19, 0);
        this.actualLight.castShadow = false;
        this.actualLight.target.updateMatrixWorld();

        // TODO remover o sportLightHelper
        const spotLightHelper = new THREE.SpotLightHelper( this.actualLight ); scene.add( spotLightHelper );
        
    }
}