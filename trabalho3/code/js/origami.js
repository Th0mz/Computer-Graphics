


class OrigamiParrot{

    constructor() {
        this.movementData = {speed: 0.01, posDir: 0, negDir: 0};

        var geometry = new THREE.BufferGeometry();
        geometry.clearGroups();

        var positions = [
            // ##### One side ####

            //Tail
            -10, 10, -5,    
            0, 12, -3.5,  
            -2, 15, -4,
            
            //Mid-section
            -2, 15, -4,
            0.5, 11, -3.5,
            0.5, 19, -4,
            //and
            0.5, 19, -4,
            0.5, 11, -3.5,
            6.5, 13, -3.025,
            //and
            0.5, 19, -4,
            6.5, 13, -3.025,
            6.75, 19.25, -3.39063,

            //Neck
            0.25, 19, -4,
            6.75, 19.25, -3.39063,
            4, 25, -4,
            //and
            6.75, 19.25, -3.39063,
            7.25, 26, -3.74785,
            4, 25, -4,

            //Beak
            7.25, 26, -3.74785,
            4, 25, -4,
            8.25, 24.9, -4,

            //Leg
            0.5, 19, -4,
            0.5, 13, -4,
            6.5, 13, -3.025,
            //and
            0.5, 13, -4,
            1.25, 8, -3.87813,
            6.5, 13, -3.025,

            //Claw
            0.5, 13, -4,
            1.25, 8, -3.87813,
            4.75, 8, -3.87813,

            //#Other Side
            //Tail
            -10, 10, -5, 
            -2, 15, -4,   
            0.25, 12, -6, 

            //Mid-section
            -2, 15, -4,
            0.5, 19, -4,
            0.75, 11, -6.2,
            //and
            0.75, 11, -6.2,
            0.5, 19, -4,
            6.75, 13, -8.19048,
            //and
            0.5, 19, -4,
            7, 19.25, -6.59286,
            6.75, 13, -8.19048,

            //Neck
            7, 19.25, -6.59286,
            0.25, 19, -4,
            4, 25, -4,
            //and    
            4, 25, -4,
            7.25, 26, -5.92543,
            7, 19.25, -6.59286,

            //Beak
            8.25, 24.9, -4,
            4, 25, -4,
            7.25, 26, -5.92543,

            //Leg
            0.5, 13, -5.5,
            0.5, 19, -4,
            6.75, 13, -8.19048,
            //and
            6.75, 13, -8.19048,
            1.5, 8 , -7.18048,
            0.5, 13, -5.5,

            //Claw
            0.5, 13, -5.5,
            5, 8, -7.18048,
            1.5, 8 , -7.18048
 

          
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
            new THREE.MeshPhongMaterial({color: 0x555555,  side: THREE.DoubleSide}),
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