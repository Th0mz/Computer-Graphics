

class Stage{

    constructor(){

        //make floor plane
        var geometry = new THREE.PlaneGeometry(100,100);
        geometry.rotateX(Math.PI/2);
        
        this.materialList = [
            new THREE.MeshBasicMaterial({color: 0x787878, side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({color: 0xAAAA00, side: THREE.DoubleSide}),
            new THREE.MeshPhongMaterial({color: 0x787878, side: THREE.DoubleSide}),
            new THREE.MeshPhongMaterial({color: 0xAAAA00, side: THREE.DoubleSide}),
            new THREE.MeshLambertMaterial({color: 0x787878, side: THREE.DoubleSide}),
            new THREE.MeshLambertMaterial({color: 0xAAAA00, side: THREE.DoubleSide})
        ]  
        

        this.plane = new THREE.Mesh(geometry, this.materialList[2]);

        this.materialChanged = false;
        this.illuminationOn = true;


        //make first podium step
        var podiumLowInfo = createRectangle(0, 1.75, 0, 80, 2.5, 50, 0xaaaa00, false); 
        this.podiumLow = podiumLowInfo[0];
        this.podiumLowMesh = podiumLowInfo[1];

        this.podiumLowMesh.material = this.materialList[3];

        console.log(this.podiumLowMesh);

        //make second podium step
        var podiumHighInfo = createRectangle(0, 3, 0, 60, 2.5, 25, 0xaaaa00, false); 
        this.podiumHigh = podiumHighInfo[0];
        this.podiumHighMesh = podiumHighInfo[1];

        this.podiumHighMesh.material = this.materialList[3];



        this.spotlightOne = new SpotLight(-23, 3.75 + 0.875, 21, 0xffffff, 1, new THREE.Vector3(0, 10, -10));
        this.spotlightTwo = new SpotLight(0, 3.75 + 0.875, 21, 0xffffff, 1, new THREE.Vector3(0, 10, -10));
        this.spotlightThree = new SpotLight(23, 3.75 + 0.875, 21, 0xffffff, 1, new THREE.Vector3(0, 8, -10));

    }

    applyReflectionChange () {
        if(this.materialChanged && this.illuminationOn) {
            this.object.geometry.groups[0].materialIndex = (this.object.geometry.groups[0].materialIndex + 3) % 6;
            this.object.geometry.groups[1].materialIndex = (this.object.geometry.groups[1].materialIndex + 3) % 6;
            this.object.geometry.groups[2].materialIndex = (this.object.geometry.groups[2].materialIndex + 3) % 6;
            
            this.last_material = (this.last_material + 3) % 6;
            this.materialChanged = false;
        }
    }

    updateReflection(){
        if(this.illuminationOn){
            this.materialChanged = true;
        }
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