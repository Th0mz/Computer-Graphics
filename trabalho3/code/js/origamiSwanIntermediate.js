class OrigamiIntermediateSwan{

    constructor() {
        this.movementData = {speed: 1, posDir: 0, negDir: 0};
        this.materialChanged = false;

        var geometry = new THREE.BufferGeometry();
        geometry.clearGroups();

        var positions = [

            //GREEN FRONT FACE (R)
            0, 25.46, 0,
            0, 0, 0,
            84/17, 21, 42/17,
            //GREEN FRONT FACE (L)
            0, 25.46, 0,
            -84/17, 21, 42/17,
            0, 0, 0,

            //BACK GREEN FACE (R)
            0.5, 17, -1,
            4, 17, 2,
            0, 0, 0,
            //BACK GREEN FACE (L)
            -4, 17, 2,
            -0.5, 17, -1,
            0, 0, 0,

            //WHITE BACK FACE (R)
            0, 25.46, 0,
            84/17, 21, 42/17,
            0, 0, 0,
            //WHITE BACK FACE (L)
            0, 25.46, 0,
            0, 0, 0,
            -84/17, 21, 42/17,

            //WHITE BACK OF BACK GREEN FACE (R)
            4, 17, 2,
            0.5, 17, -1,
            0, 0, 0,

            //WHITE BACK OF BACK GREEN FACE (L)
            -0.5, 17, -1,
            -4, 17, 2,
            0, 0, 0,

            //WHITE FRONT TRIANGLE (R)
            84/17, 21, 42/17,
            0.5, 19, 2,
            4, 17, 2,

            //WHITE FRONT TRIANGLE (L)
            -0.5, 19, 2,
            -84/17, 21, 42/17,
            -4, 17, 2,

            //GREEN FRONT SMALL TRIANGLE TWOSIDED (R)
            4, 17, 2,
            0.5, 19, 2,
            0, 0, 0,

            //GREEN FRONT SMALL TRIANGLE TWOSIDED (L)
            -0.5, 19, 2,
            -4, 17, 2,
            0, 0, 0,
            
            

            

            
        ];

        var uvs = new Float32Array([
          

          ])

        //TODO ADD MATERIALS
        var texture = new THREE.TextureLoader().load('assets/origami_pattern.png');

        var material_list = [
            new THREE.MeshLambertMaterial({color: 0xffffff,  side: THREE.FrontSide}),
            new THREE.MeshLambertMaterial({color: 0x22ff10, /*map: texture, */ side: THREE.DoubleSide}),
            new THREE.MeshLambertMaterial({color: 0x22ff10, /*map: texture, */ side: THREE.FrontSide}),
            new THREE.MeshPhongMaterial({color: 0xffffff,  side: THREE.FrontSide}),
            new THREE.MeshPhongMaterial({color: 0x22ff10, /*map: texture,*/  side: THREE.DoubleSide}),
            new THREE.MeshPhongMaterial({color: 0x22ff10, /*map: texture,*/  side: THREE.FrontSide}),
        ];

        geometry.addGroup(0, 4*3, 2);
        geometry.addGroup(4*3, 6*3, 0);
        geometry.addGroup(10*3, 2*3, 1);
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
        geometry.computeVertexNormals();

        this.object = new THREE.Mesh( geometry, material_list );
        this.object.position.set(0, 8 , 0);
        
        this.group = new THREE.Group();
        this.group.add(this.object);
        this.group.position.set(0, 0, 0);   
    }

    update(delta_time){

        this.object.rotateY(this.movementData.speed*delta_time * (this.movementData.posDir + this.movementData.negDir));
        if(this.materialChanged) {
            
            this.object.geometry.groups[0].materialIndex = (this.object.geometry.groups[0].materialIndex + 3) % 6;
            this.object.geometry.groups[1].materialIndex = (this.object.geometry.groups[1].materialIndex + 3) % 6;
            this.object.geometry.groups[2].materialIndex = (this.object.geometry.groups[2].materialIndex + 3) % 6;
            this.materialChanged = false;
        }
    }

    updatePosRotation(value){
        this.movementData.posDir = value;
    }

    updateNegRotation(value){
        this.movementData.negDir = value;
    }

    updateReflection(){
        this.materialChanged = true;
    }

    doReset() {
        // TODO
    }

}