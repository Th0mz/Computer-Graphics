

class Stage{

    constructor(){

        // material change variables
        this.materialChanged = false;
        this.illuminationOn = true;
        this.last_material = 0;

        this.materialList = [
            new THREE.MeshLambertMaterial({color: 0x787878, side: THREE.DoubleSide}),
            new THREE.MeshLambertMaterial({color: 0xAAAA00, side: THREE.DoubleSide}),
            new THREE.MeshPhongMaterial({color: 0x787878, side: THREE.DoubleSide}),
            new THREE.MeshPhongMaterial({color: 0xAAAA00, side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({color: 0x787878, side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({color: 0xAAAA00, side: THREE.DoubleSide})
        ]

        //make floor plane
        var geometry = new THREE.PlaneGeometry(100,100);
        geometry.rotateX(Math.PI/2); 

        var materialIndex = this.last_material * 2
        this.plane = new THREE.Mesh(geometry, this.materialList[materialIndex]);

        //this.plane.castShadow = true;
        this.plane.receiveShadow = true;

        //make first podium step
        var podiumLowInfo = createRectangle(0, 1.75, 0, 80, 2.5, 50, 0xaaaa00, false); 
        this.podiumLow = podiumLowInfo[0];
        this.podiumLowMesh = podiumLowInfo[1];

        this.podiumLowMesh.material = this.materialList[materialIndex + 1];
        //podiumLowInfo[1].castShadow = true;
        podiumLowInfo[1].receiveShadow = true;
        console.log(this.podiumLowMesh);

        //make second podium step
        var podiumHighInfo = createRectangle(0, 3, 0, 60, 2.5, 25, 0xaaaa00, false); 
        this.podiumHigh = podiumHighInfo[0];
        this.podiumHighMesh = podiumHighInfo[1];

        this.podiumHighMesh.material = this.materialList[materialIndex + 1];
        //podiumHighInfo[1].castShadow = true;
        podiumHighInfo[1].receiveShadow = true;



        this.spotlightOne = new SpotLight(-23, 3.75 + 0.875, 21, 0xffffff, 1, new THREE.Vector3(0, 10, -10));
        this.spotlightTwo = new SpotLight(0, 3.75 + 0.875, 21, 0xffffff, 1, new THREE.Vector3(0, 10, -10));
        this.spotlightThree = new SpotLight(23, 3.75 + 0.875, 21, 0xffffff, 1, new THREE.Vector3(0, 8, -10));

    }

    applyReflectionChange () {
        if(this.materialChanged && this.illuminationOn) {
            var materialIndex = this.last_material * 2

            this.podiumLowMesh.material = this.materialList[materialIndex + 1];
            this.podiumHighMesh.material = this.materialList[materialIndex + 1];
            this.plane.material = this.materialList[materialIndex]

            
            this.last_material = (this.last_material + 1) % 2;
            this.materialChanged = false;
        }

        this.spotlightOne.applyReflectionChange();
        this.spotlightTwo.applyReflectionChange();
        this.spotlightThree.applyReflectionChange();
    }

    updateReflection(){
        if(this.illuminationOn){
            this.materialChanged = true;
        }

        this.spotlightOne.updateReflection();
        this.spotlightTwo.updateReflection();
        this.spotlightThree.updateReflection();
    }

    toggleIllumCalculation(){
        if(this.illuminationOn){
            
            this.podiumLowMesh.material = this.materialList[5];
            this.podiumHighMesh.material = this.materialList[5];
            this.plane.material = this.materialList[4]
            this.illuminationOn = false; 
        } else {
            var materialIndex = this.last_material * 2

            this.podiumLowMesh.material = this.materialList[materialIndex + 1];
            this.podiumHighMesh.material = this.materialList[materialIndex + 1];
            this.plane.material = this.materialList[materialIndex];
            this.illuminationOn = true;
        }

        this.spotlightOne.toggleIllumCalculation();
        this.spotlightTwo.toggleIllumCalculation();
        this.spotlightThree.toggleIllumCalculation();
    }

    toggleLeft()   { this.spotlightOne.toggleLight(); } 
    toggleCenter() { this.spotlightTwo.toggleLight(); }
    toggleRight()  { this.spotlightThree.toggleLight(); }

    doReset () {
        this.spotlightOne.setLight(true);
        this.spotlightTwo.setLight(true);
        this.spotlightThree.setLight(true);
    }
}