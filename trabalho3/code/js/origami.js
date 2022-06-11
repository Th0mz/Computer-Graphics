


class OrigamiParrot{

    constructor() {
        this.movementData = {speed: 2, posDir: 0, negDir: 0};

        var geometry = new THREE.BufferGeometry();
        geometry.clearGroups();

        var positions = [

            //########### GROUP ONE (HAS TEXTURE) #############
            // ##### One side ####

            //TAIL GREEN
            -9.3, 5.5, 0,
            -6, 0, 3,
            //-3.7, 4.3, 0,
            0, 0, 2,
            //and
            0, 0, 2,
            3.4, 2.5, 0,
            -9.3, 5.5, 0,

            

            //MID SECTON GREEN
            -3.7, 4.3, 0.15,
            0, 0, 2,
            3.4, 2.5, 0, 
            //AND
            -3.7, 4.3, 0,
            -3, 0, 2.5, 
            0, 0, 2,

            //NECK LOWER
            0, 0, 2,
            3.4, 2.5, 0,
            0, 2, 2.5,

            //NECK UPPER
            0, 2, 2.5,
            3.4, 2.5, 0,
            3, 10, 0,
            //AND
            0, 2, 2.5,
            3, 10, 0,
            1.6, 9.8, 1.03,


            //HEAD
            3, 10, 0,
            1.6, 9.8, 1.03,
            6, 7, 0,

            // ##### OTHER side ####

            //TAIL GREEN
            -9.3, 5.5, 0,
            -6, 0, -3,
            //-3.7, 4.3, 0,
            0, 0, -2,
            //and
            0, 0, -2,
            3.4, 2.5, 0,
            -9.3, 5.5, 0,

            

            //MID SECTON GREEN
            -3.7, 4.3, -0.15,
            0, 0, -2,
            3.4, 2.5, 0, 
            //AND
            -3.7, 4.3, 0,
            -3, 0, -2.5, 
            0, 0, -2,

            //NECK LOWER
            0, 0, -2,
            3.4, 2.5, 0,
            0, 2, -2.5,

            //NECK UPPER
            0, 2, -2.5,
            3.4, 2.5, 0,
            3, 10, 0,
            //AND
            0, 2, -2.5,
            3, 10, 0,
            1.6, 9.8, -1.03,


            //HEAD
            3, 10, 0,
            1.6, 9.8, -1.03,
            6, 7, 0,


            

            //########### GROUP TWO (BACK OF PAPER AKA WHITE) #############

            //MID SECTION WHITE
            -3.7, 4.3, 0.15,
            -6, 0, 3,
            -3, 0, 2.5,

            //Other side
            //MID SECTION WHITE
            -3.7, 4.3, -0.15,
            -6, 0, -3,
            -3, 0, -2.5,
            
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
            new THREE.MeshLambertMaterial({color: 0xffffff,  side: THREE.DoubleSide}),
            new THREE.MeshLambertMaterial({color: 0x22ff10, /*map: texture, */ side: THREE.DoubleSide}),
            new THREE.MeshPhongMaterial({color: 0x999999,  side: THREE.DoubleSide}),
            new THREE.MeshPhongMaterial({color: 0x999999, map: texture,  side: THREE.DoubleSide}),
        ];

        geometry.addGroup(0, 16*3, 1);
        geometry.addGroup(16*3, 2*3, 0);
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
        geometry.computeVertexNormals();

        this.object = new THREE.Mesh( geometry, material_list );
        this.object.position.set(0 , 9 , 0);
        //object.geometry.groups[0].materialIndex = 1;
        this.group = new THREE.Group();
        this.group.add(this.object);

    }

    update(delta_time){
        this.group.rotateY(this.movementData.speed * delta_time * (this.movementData.posDir + this.movementData.negDir));

    }

    updatePosRotation(value){
        this.movementData.posDir = value;
    }

    updateNegRotation(value){
        this.movementData.negDir = value;
    }

}