


class OrigamiParrot{

    constructor() {
        this.movementData = {speed: 0.01, posDir: 0, negDir: 0};

        var geometry = new THREE.BufferGeometry();
        geometry.clearGroups();

        var positions = [
            // ##### One side ####

            //Tail
            -16, 10, 0,    
            -1.25, 11.5, 2.9,  
            -4, 15, 0,
            
            //Mid-section
            -4, 15, 0,
            -1.5, 11, 3.25,
            -1.5, 19, 0,
            //and
            -1.5, 19, 0,
            -1.5, 11, 3.25,
            7, 13, 7.9625,
            //and
            -1.5, 19, 0,
            7, 13, 7.9625,
            7.5, 19.25, 5.74844,

            //Neck
            -1.75, 19, 0,
            7.5, 19.25, 5.74844,
            4.75, 29, 0,
            //and
            4.75, 29, 0,
            7.5, 19.25, 5.74844,
            7.75, 30, 1.48653,

            //Beak
            4.75, 29, 0,
            10, 28, 0,
            7.75, 30, 1.48653,

            //Leg
            7, 13, 7.9625,
            -1.5, 19, 0,
            -1.5, 13,  0.5,
            //and
            7, 13, 7.9625,
            -1.5, 13,  0.5,
            0, 8, 2.23358,

 
            //Claw
            -1.5, 13, 0.5,
            0, 8, 2.23358,
            4.5, 8, 2.23358,

            // ##### Other side ####

            //Tail
            -16, 10, 0,   
            -4, 15, 0, 
            -1.25, 11.5, -2.9,  
            
            
            //Mid-section
            -4, 15, 0,
            -1.5, 19, 0,
            -1.5, 11, -3.25,
            
            //and
            -1.5, 11, -3.25,
            -1.5, 19, 0,
            7, 13, -7.9625,
            //and
            7, 13, -7.9625,
            -1.5, 19, 0,
            7.5, 19.25, -5.74844,

            //Neck
            7.5, 19.25, -5.74844,
            -1.75, 19, 0,
            4.75, 29, 0,
            //and
            7.5, 19.25, -5.74844,
            4.75, 29, 0,
            7.75, 30, -1.48653,

            //Beak
            10, 28, 0,
            4.75, 29, 0,
            7.75, 30, -1.48653,

            //Leg
            -1.5, 19, 0,
            7, 13, -7.9625,
            -1.5, 13,  -0.5,
            //and
            -1.5, 13,  -0.5,
            7, 13, -7.9625,
            0, 8, -2.23358,

 
            //Claw
            0, 8, -2.23358,
            -1.5, 13, -0.5,
            4.5, 8, -2.23358,
            
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
            new THREE.MeshLambertMaterial({color: 0x999999, map: texture,  side: THREE.DoubleSide}),
            new THREE.MeshPhongMaterial({color: 0x55555,  side: THREE.DoubleSide}),
            new THREE.MeshPhongMaterial({color: 0x999999, map: texture,  side: THREE.DoubleSide}),
        ];

        geometry.addGroup(0, positions.length/3, 2);
        console.log(geometry)
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
        geometry.computeVertexNormals();

        this.object = new THREE.Mesh( geometry, material_list );
        this.object.position.set(0 , 0 , 0);
        scene.add(this.object);
        console.log(this.object)
        //object.geometry.groups[0].materialIndex = 1;
        //console.log(object)
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