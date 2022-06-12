



class OrigamiInitial{

    constructor() {
        this.movementData = {speed: 0.03, posDir: 0, negDir: 0};

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
            1.0, 0.0,
            1.0, 1.0,

            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,

            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,

            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,

          ])

        //TODO ADD MATERIALS
        var texture = new THREE.TextureLoader().load('assets/origami_pattern.png');

        var material_list = [
            new THREE.MeshLambertMaterial({color: 0xffffff,  side: THREE.FrontSide}),
            new THREE.MeshLambertMaterial({color: 0x22ff10, /*map: texture, */ side: THREE.FrontSide}),
            new THREE.MeshPhongMaterial({color: 0x999999,  side: THREE.FrontSide}),
            new THREE.MeshPhongMaterial({color: 0x999999, map: texture,  side: THREE.FrontSide}),
        ];

        geometry.addGroup(0, 6, 0);
        geometry.addGroup(6, 6, 1);
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
        geometry.computeVertexNormals();

        this.object = new THREE.Mesh( geometry, material_list );
        this.object.position.set(0 , 8 , 0);
        scene.add(this.object);
        this.group = new THREE.Group();
        this.group.add(this.object);
        scene.add(this.group);

       
            

    }

    update(){

        this.group.rotateY(this.movementData.speed * (this.movementData.posDir + this.movementData.negDir));

    }

    updatePosRotation(value){
        this.movementData.posDir = value;
    }

    updateNegRotation(value){
        this.movementData.negDir = value;
    }

}