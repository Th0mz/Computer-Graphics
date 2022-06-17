class SpotLight {
    constructor (x, y, z, color, intensity, direction) {

        this.materialChanged = false;
        this.illuminationOn = true;
        this.last_material = 0;

        var materialIndex = this.last_material * 2

        this.materialList = [
            new THREE.MeshLambertMaterial({color: 0x000000, side: THREE.DoubleSide}),
            new THREE.MeshLambertMaterial({color: 0x999900, side: THREE.DoubleSide}),
            new THREE.MeshPhongMaterial({color: 0x000000, side: THREE.DoubleSide}),
            new THREE.MeshPhongMaterial({color: 0x999900, side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({color: 0x999900, side: THREE.DoubleSide})
        ]

        var pyramidInfo = createPyramid(0, 0, 0, 3, 4, 64, 0x000000, false, Math.PI/2); 
        var pyramid = pyramidInfo[0];
        this.pyramidMesh = pyramidInfo[1];
        this.pyramidMesh.material = this.materialList[materialIndex]

        var sphereInfo = createSphere(0, 0, -3.5, 3, 0x999900, false); 
        var sphere = sphereInfo[0];
        this.sphereMesh = sphereInfo[1];
        this.sphereMesh.material = this.materialList[materialIndex + 1];
        
        
        this.base = new THREE.Group();
        this.base.add(pyramid, sphere);

        this.base.position.set(x, y, z);
        this.base.rotateX(Math.PI/7)
        

        this.light = new THREE.SpotLight( color, intensity, 0, Math.PI/6, 0, 1);

        var lightPosition = new THREE.Vector3(0,0,0);
        sphere.getWorldPosition(lightPosition);
        
        direction.add(lightPosition);

        this.light.position.set(lightPosition.x, lightPosition.y, lightPosition.z);
        this.light.target.position.set(direction.x, direction.y, direction.z);
        this.light.castShadow = true;
        this.light.target.updateMatrixWorld();

        this.object = new THREE.Group();
        this.object.add(this.base, this.light);

    }

    applyReflectionChange () {
        if(this.materialChanged && this.illuminationOn) {
            var materialIndex = this.last_material * 2

            this.pyramidMesh.material = this.materialList[materialIndex];
            this.sphereMesh.material = this.materialList[materialIndex + 1];
            
            this.last_material = (this.last_material + 1) % 2;
            this.materialChanged = false;
            
        }
    } 

    toggleIllumCalculation(){
        if(this.illuminationOn){
            
            this.pyramidMesh.material = this.materialList[4];
            this.sphereMesh.material = this.materialList[5];
            this.illuminationOn = false; 
        } else {
            var materialIndex = this.last_material * 2

            this.pyramidMesh.material = this.materialList[materialIndex];
            this.sphereMesh.material = this.materialList[materialIndex + 1];
            this.illuminationOn = true;
        }

    }

    toggleLight () {
        this.light.visible = !this.light.visible
    }

    setLight (visibility) {
        this.light.visible = visibility;
    }
}