


class OrigamiSwan{

    constructor() {
        this.movementData = {speed: 2, posDir: 0, negDir: 0};
        this.materialChanged = false;
        this.illuminationOn = true;
        this.last_material = 0;

        var geometry = new THREE.BufferGeometry();
        geometry.clearGroups();

        var positions = [

            //########### GROUP ONE (HAS TEXTURE) #############
            
            
            // ##### One side ####
            //TAIL GREEN
            -9.3, 5.5, 0,
            -6, 0, 3,
            0, 0, 2,
            //and
            0, 0, 2,
            3.4, 2.5, 0,
            -9.3, 5.5, 0,

            // ### Other side ###
            //TAIL GREEN
            -6, 0, -3,
            -9.3, 5.5, 0,
            0, 0, -2,
            //and
            3.4, 2.5, 0,
            0, 0, -2,
            -9.3, 5.5, 0,

            //side one
            //MID SECTON GREEN
            -3.7, 4.3, 0.15,
            0, 0, 2,
            3.4, 2.5, 0, 
            //AND
            -3.7, 4.3, 0.15,
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

            //UNDER SIDE GREEN 
            -2, 3.75, 0,
            3.4, 2.5, 0,
            0, 0, 2,
            //AND
            -2, 3.75, 0,
            0, 0, 2,
            -3.8, 0, 2.5,

            // ##### OTHER side ####


            //MID SECTON GREEN
            -3.7, 4.3, -0.15,
            0, 0, -2,
            3.4, 2.5, 0, 
            //AND
            -3.7, 4.3, -0.15,
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

            //UNDER SIDE GREEN
            -2, 3.75, 0,
            0, 0, -2,
            3.4, 2.5, 0,
            
            //AND
            -2, 3.75, 0,
            -3.8, 0, -2.5,
            0, 0, -2,

            //########### GROUP TWO (BACK OF PAPER AKA WHITE) #############

            //MID SECTION WHITE
            -3.7, 4.3, 0.15,
            -6, 0, 3,
            -3, 0, 2.5,

            //UNDER SIDE
            -9.3, 5.5, 0,
            -2, 3.75, 0,
            -6, 0, 3,
            //and
            -6, 0, 3,
            -2, 3.75, 0,
            -3.8, 0, 2.5,


            //Other side
            //MID SECTION WHITE
            -6, 0, -3,
            -3.7, 4.3, -0.15,
            -3, 0, -2.5,

            //UNDER SIDE
            -2, 3.75, 0,
            -9.3, 5.5, 0,
            -6, 0, -3,
            //and
            -2, 3.75, 0,
            -6, 0, -3,
            -3.8, 0, -2.5,

            
        ];

        var uvs = new Float32Array([

            //########### GROUP ONE (HAS TEXTURE) #############


            // ##### One side ####
            //TAIL GREEN
            0.0, 0.0,
            6/18, 0.0,
            10.5/18, 7/18,
            //and
            10.5/18, 7/18,
            0.5,0.5,
            0.0, 0.0,

            // ### Other side ###
            //TAIL GREEN
            0.0, 6/18,
            0.0, 0.0,
            7/18, 10.5/18, 
            //and
            0.5,0.5,
            7/18, 10.5/18,
            0.0, 0.0,

            //side one
            //MID SECTON GREEN
            10.5/18, 0.0,
            15.5/18, 5/18,
            13.5/18, 6.5/18,
            //AND
            10.5/18, 0.0,
            14.5/18, 0.0,
            15.5/18, 5/18,

            //NECK LOWER
            15.5/18, 5/18,
            1.0, 5.5/18,
            15.5/18, 5.5/18,

            //NECK UPPER
            15.5/18, 5.5/18,
            1.0, 5.5/18,
            1.0, 13.4/18,
            //AND
            15.5/18, 5.5/18,
            1.0, 13.4/18,
            17/18, 13.0/18,


            //HEAD
            16.3/18, 13.8/18,
            17/18, 13.0/18,
            1.0, 1.0,

            //UNDER SIDE GREEN
            1.0, 0.0,
            1.0, 5.5/18,
            15.5/18, 5/18,
            //AND
            1.0, 0.0,
            15.5/18, 5/18,
            14.5/18, 0.0,

            // ##### OTHER side ####


            //MID SECTON GREEN
            0.0, 10.5/18,
            5/18, 15.5/18,
            6.5/18, 13.5/18,
            //AND
            0.0, 10.5/18,
            0.0, 14.5/18,
            5/18, 15.5/18,

            //NECK LOWER
            5/18, 15.5/18,
            6.5/18, 1.0,
            5.5/18, 15.5/18,

            //NECK UPPER
            5.5/18, 15.5/18,
            6.5/18, 1.0,
            13.4/18, 1.0, 
            //AND
            5.5/18, 15.5/18,
            13.4/18, 1.0,
            13.0/18, 17/18, 


            //HEAD
            13.8/18, 16.3/18,
            13.0/18, 17/18,
            1.0, 1.0,

            //UNDER SIDE GREEN
            0.0, 1.0,
            5/18, 15.5/18,
            6.5/18, 1.0,

            //AND
            0.0, 1.0,
            0.0, 14.5/18,
            5/18, 15.5/18,

          ])

        // TODO : UVs
        var texture = new THREE.TextureLoader().load('assets/origami_pattern.png');

        var material_list = [
            new THREE.MeshLambertMaterial({color: 0xffffff,  side: THREE.FrontSide}),
            new THREE.MeshLambertMaterial({color: 0x999999, map: texture, side: THREE.DoubleSide}),
            new THREE.MeshLambertMaterial({color: 0x999999, map: texture, side: THREE.FrontSide}),
            new THREE.MeshPhongMaterial({color: 0xffffff,  side: THREE.FrontSide}),
            new THREE.MeshPhongMaterial({color: 0x999999, map: texture,  side: THREE.DoubleSide}),
            new THREE.MeshPhongMaterial({color: 0x999999, map: texture,  side: THREE.FrontSide}),
            new THREE.MeshBasicMaterial({color: 0xffffff,  side: THREE.FrontSide}),
            new THREE.MeshBasicMaterial({color: 0x999999, map: texture,  side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({color: 0x999999, map: texture,  side: THREE.FrontSide})
        ];

        geometry.addGroup(0, 4*3, 2);
        geometry.addGroup(4*3, 16*3, 1);
        geometry.addGroup(20*3, 6*3, 0);
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
        geometry.computeVertexNormals();

        this.object = new THREE.Mesh( geometry, material_list );
        this.object.position.set(23 , 8 , 0);

        this.group = new THREE.Group();
        this.group.add(this.object);
        this.group.position.set(0, 0, 0);
        
    }

    update(delta_time){

        this.object.rotateY(this.movementData.speed* delta_time * (this.movementData.posDir + this.movementData.negDir));
        this.applyReflectionChange();
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

    updatePosRotation(value){
        this.movementData.posDir = value;
    }

    updateNegRotation(value){
        this.movementData.negDir = value;
    }
    updateReflection(){
        if(this.illuminationOn){
            this.materialChanged = true;
        }
    }

    toggleIllumCalculation(){
        if(this.illuminationOn){
            this.object.geometry.groups[0].materialIndex = 8;
            this.object.geometry.groups[1].materialIndex = 7;
            this.object.geometry.groups[2].materialIndex = 6;
            this.illuminationOn = false;
        } else {
            this.illuminationOn = true;
            this.object.geometry.groups[0].materialIndex = this.last_material + 2;
            this.object.geometry.groups[1].materialIndex = this.last_material + 1;
            this.object.geometry.groups[2].materialIndex = this.last_material;
        }

    }

    doReset() {
        this.object.geometry.groups[0].materialIndex = 2;
        this.object.geometry.groups[1].materialIndex = 1;
        this.object.geometry.groups[2].materialIndex = 0;

        this.object.rotation.set(0, 0, 0);
    }
}