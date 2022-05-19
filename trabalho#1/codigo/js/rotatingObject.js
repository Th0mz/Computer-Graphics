var vector;
class RotatingObject {
    constructor (x, y, z) {
        this.speed = 0;
        this.cubeRotation = 0;
        this.cylinderRotation = 0;
        this.pyramidRotation = 0;
        this.rotationData = {cubeRotatingP: false, cubeRotatingN: false,
                             cylinderRotatingP: false,  cylinderRotatingN: false,
                             pyramidRotatingP: false, pyramidRotatingN: false};
        


        
        //Pyramid and Group 1
        var pyramid = new Pyramid(0.5 * side_size, side_size, 4, 0x00ff00);
        pyramid.rotateZ(Math.PI * 0.5);
                
        this.pyramidGroup = new THREE.Group();
        this.pyramidGroup.add(pyramid);
        this.pyramidGroup.position.set(side_size,0,-2*side_size);

        console.log(pyramid.position);
        console.log(this.pyramidGroup.position);

        //Cylinder and Group2 (Includes Group1)
        var cylinder = new Cylinder(0.5 * side_size, 4 * side_size, 32, 0x0000ff);
        cylinder.rotateX(Math.PI/2);
        
        this.cylinderGroup = new THREE.Group();
        this.cylinderGroup.add(cylinder);
        this.cylinderGroup.add(this.pyramidGroup);
        this.cylinderGroup.position.set(0, -2*side_size, 0);

        console.log(cylinder.position);
        console.log(this.cylinderGroup.position);

        //Cube and Group3 (Includes Group2)
        var cube = new Cube(3 * side_size, 0xff0000);

        this.cubeGroup = new THREE.Group();
        this.cubeGroup.add(cube);
        this.cubeGroup.add(this.cylinderGroup);
        this.cubeGroup.position.set(x * side_size, y * side_size, z * side_size);

        

        console.log(cube.position);
        console.log(this.cubeGroup.position);

    }


    update () {
                
    }
   // this.pyramidGroup.rotateX(-0.02);
        //this.pyramid.rotateX(0.002);
        //this.cylinder.rotateX(0.004);
     //   

    rotateCube (degree) {
       
        if(degree == 'Pos'){
            this.cubeGroup.rotateZ(0.006);
            //this.cubeGroup.rotateY(0.007);
        } else {
            this.cubeGroup.rotateZ(-0.006);
            //this.cubeGroup.rotateY(0.007);
        };
        
    }

    rotateCylinder (degree) {
        //this.cylinderRotation = degree;
        if( degree == 'Pos'){
            this.cylinderGroup.rotateY(0.004);
        } else {
            this.cylinderGroup.rotateY(-0.004);
        }
    }

    rotatePyramid (degree) {
        //this.pyramidRotation = degree;
        if (degree == 'Pos'){
            this.pyramidGroup.rotateX(0.1);
        } else {
            this.pyramidGroup.rotateX(-0.1);
        }
    }
}