



class OrigamiInitial{

    constructor() {
        this.movementData = {speed: 1, posDir: 0, negDir: 0};
        this.materialChanged = false;

        var geometry = new THREE.BufferGeometry();
        geometry.clearGroups();

        var positions = [

            //white left
            0, 26, 0,
            -13, 13, 5,
            0, 0, 0,

            //white right
            0, 26, 0,
            0, 0, 0,
            13, 13, 5,

            //green left
            -13, 13, 4.9,
            0, 26, 0,
            0, 0, 0,

            //green right
            13, 13, 4.9,
            0, 0, 0,
            0, 26, 0,
            
        ];

        var uvs = new Float32Array([
            0.0, 0.0,
            0.0, 0.0,
            0.0, 0.0,

            0.0, 0.0,
            0.0, 0.0,
            0.0, 0.0,

            1.0, 0.0,
            0.0, 0.0,
            1.0, 1.0,

            0.0, 1.0,
            1.0, 1.0,
            0.0, 0.0,

          ])

        //TODO ADD MATERIALS
        var texture = new THREE.TextureLoader().load('assets/origami_pattern.png');

        var material_list = [
            new THREE.MeshLambertMaterial({color: 0xffffff,  side: THREE.FrontSide}),
            new THREE.MeshLambertMaterial({color: 0xffffff, map: texture,  side: THREE.FrontSide}),
            new THREE.MeshPhongMaterial({color: 0xffffff,  side: THREE.FrontSide}),
            new THREE.MeshPhongMaterial({color: 0xffffff, map: texture,  side: THREE.FrontSide}),
        ];

        geometry.addGroup(0, 6, 0);
        geometry.addGroup(6, 6, 1);
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
        geometry.computeVertexNormals();

        this.object = new THREE.Mesh( geometry, material_list );
        this.object.position.set(-23, 8 , 0);
        

        this.group = new THREE.Group();
        this.group.add(this.object);
        this.group.position.set(0, 0, 0);
    }

    update(delta_time){
        
        this.object.rotateY(this.movementData.speed* delta_time * (this.movementData.posDir + this.movementData.negDir));
        if(this.materialChanged) {
            this.object.geometry.groups[0].materialIndex = (this.object.geometry.groups[0].materialIndex + 2) % 4;
            this.object.geometry.groups[1].materialIndex = (this.object.geometry.groups[1].materialIndex + 2) % 4;
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
        this.object.geometry.groups[0].materialIndex = 0;
        this.object.geometry.groups[1].materialIndex = 1;

        this.object.rotation.set(0, 0, 0);
    }

}