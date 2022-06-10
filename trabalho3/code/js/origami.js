


class OrigamiParrot{

    constructor() {

        var geometry = new THREE.BufferGeometry();

        var positions = [
            // ##### One side ####

            //Tail
            -10, 10, -5,    
            0, 12, 1,  
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
            4.75, 8, -3.87813

            //TODO FINISH OTHER SIDE AND ADD MATERIALS
            

          
        ];

        geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
        geometry.computeVertexNormals();

        const object = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
        scene.add(object);
    

    }

}