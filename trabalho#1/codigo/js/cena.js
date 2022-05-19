/*
* Trabalho # 1
*   95535 - António Coelho
*   95549 - Cristi Savin 
*   95680 - Tomás Tavares 
*
*/

// TODO : dont use global variables
var camera, scene, renderer;
var rotObj;

var lastWireFrame = true, wireFrame = true;



var side_size = 50;

class Sphere{
    constructor(radius, widthSegments, heightSegment ,_color=0xff0000, _wireframe=true){

    var ball = new THREE.Object3D();
    var material = new THREE.MeshBasicMaterial({ color: _color, wireframe: _wireframe });
    var geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegment);
    var mesh = new THREE.Mesh(geometry, material);

    return ball.add(mesh);
    }
}

class Torus{
    constructor(radius, tube_radius, radialSegments = 8, tubularSegments = 6 , _color=0xffff00, _wireframe=true){

        var torus = new THREE.Object3D();
        var material = new THREE.MeshBasicMaterial({ color: _color, wireframe: _wireframe });
        var geometry = new THREE.TorusGeometry(radius, tube_radius, radialSegments, tubularSegments);
        var mesh = new THREE.Mesh(geometry, material);
    
        return torus.add(mesh);
        }

}

class Cube {
    constructor(edge_size , _color=0xEEAD2D, _wireframe=true){

        var cube = new THREE.Object3D();
        var material = new THREE.MeshBasicMaterial( { color: _color, wireframe: _wireframe } );
        var geometry = new THREE.BoxGeometry( edge_size, edge_size, edge_size );
        
        var mesh = new THREE.Mesh(geometry, material);
        
        return cube.add(mesh)
    }

}

class Pyramid {
    constructor (radius, height, base_polygon , _color=0xADD8E6, _wireframe=true) {
        
        var pyramid = new THREE.Object3D();
        var material = new THREE.MeshBasicMaterial( { color: _color, wireframe: _wireframe } );
        var geometry = new THREE.ConeGeometry( radius, height, base_polygon);
        
        var mesh = new THREE.Mesh(geometry, material);
        
        return pyramid.add(mesh)

    }
}

class Cylinder {
    constructor (radius, height, base_polygon , _color=0x90EE90, _wireframe=true) {
        
        var cylinder = new THREE.Object3D();
        var material = new THREE.MeshBasicMaterial( { color: _color, wireframe: _wireframe } );
        var geometry = new THREE.CylinderGeometry( radius, radius, height, base_polygon);
        
        var mesh = new THREE.Mesh(geometry, material);
        
        return cylinder.add(mesh)

    }

}




function onResize() {
    'use strict'

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

}

function onKeyDown(e) {
    'use strict';
    switch(e.keyCode) {
        case 49: // 1
            camera.position.x = 1000;
            camera.position.y = 0;
            camera.position.z = 0;
            camera.lookAt(scene.position);
            break;
        case 50: // 2
            camera.position.x = 0;
            camera.position.y = 0;
            //camera.position.z = Math.sqrt(Math.pow(70,2)*3);
            camera.position.z = 1000;
            camera.lookAt(scene.position);
            break;
        case 51: // 3
            camera.position.x = 0;
            //camera.position.y = Math.sqrt(Math.pow(70,2)*3);
            camera.position.y = 1000;
            camera.position.z = 0;
            camera.lookAt(scene.position);
            break;
        case 52: // 4
            //mudar isto para o update, n da traverse das cenas for do update
            lastWireFrame = wireFrame;
            wireFrame = !wireFrame;
            break;
        // TODO : check rotation directions
        case 113: //q or Q
        case 81:
            rotObj.updateCubeRotation(1);
            break;
        case 119: //w or W
        case 87:
            rotObj.updateCubeRotation(-1);
            break;
        case 97: //a or A
        case 65:
            rotObj.updateCylinderRotation(1);
            break;
        case 115: //s or S
        case 83:
            rotObj.updateCylinderRotation(-1);
            break;
        case 120: //x or X
        case 88:
            rotObj.updatePyramidRotation(1);
            break;
        case 122: //z or Z 
            console.log("ola")
            rotObj.updatePyramidRotation(-1);
            break;
    }
}

function onKeyUp(e){
    'use strict';
    switch(e.keyCode) {
        case 113: // q or Q or w or W
        case 81:
        case 90:
        case 87: 
            rotObj.updateCubeRotation(0);
            break;

        case 97: //a or A or s or S
        case 65:
        case 115:
        case 83:    
        rotObj.updateCylinderRotation(0);
            break;

        case 120: //x or X or z or Z
        case 88:
        case 122:
        case 90:  
        rotObj.updatePyramidRotation(0);
            break;
    }

}

function render() {
    'use strict';

    if(lastWireFrame!=wireFrame){
        scene.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
            node.material.wireframe = !node.material.wireframe;
        }
        });
    }
    lastWireFrame = wireFrame;
    renderer.render(scene, camera);
}

function init() {
    'use strict';
    var ball_1, ball_2, ball_3, torus, cube, cube2, pyramid_1, pyramid_2, cylinder, cylinder2, cone1, cone2;
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(100));

    camera = new THREE.OrthographicCamera( window.innerWidth  / -2, 
                                           window.innerWidth  /  2, 
                                           window.innerHeight /  2, 
                                           window.innerHeight / -2, 
                                           0.1, 
                                           5000 );


    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 1000;
    camera.lookAt(scene.position);
    
    ball_1 = new Sphere(side_size/2, 10, 10, 0x8F250C);
    ball_1.position.set(0.5 * side_size, 2.5 * side_size, 2.5 * side_size);

    ball_2 = new Sphere(side_size, 10, 10, 0x442220);
    ball_2.position.set(-3.0 * side_size, 4 * side_size, 4 * side_size);

    ball_3 = new Sphere(side_size*1.5, 10, 10, 0x809848);
    ball_3.position.set(-4.5 * side_size, 2.5 * side_size, 2.5 * side_size);

    torus = new Torus(side_size*0.75, side_size/2, 12, 12, 0x9A6D38);
    torus.position.set(-6 * side_size, 4 * side_size, 3.5 * side_size);

    cube = new Cube(side_size);
    cube.position.set( 3.5 * side_size, 3.5 * side_size, 4.5 * side_size);

    pyramid_1 = new Pyramid(side_size, 5 * side_size, 4, 0xbc6c25);
    pyramid_1.position.set(0, 0, 0);
    pyramid_1.rotateZ(Math.PI * 0.5);
    pyramid_1.position.set(2.5 * side_size, 2.5 * side_size, -3.5 * side_size);


    pyramid_2 = new Pyramid(1.5 * side_size, 3 * side_size, 4, 0xe7bc91);
    pyramid_2.position.set(0, 0, 0);
    pyramid_2.rotateX(Math.PI * 0.5);
    pyramid_2.position.set(3 * side_size, -2 * side_size, 2.5 * side_size);

    cylinder = new Cylinder(0.5 * side_size, 4 * side_size, 32, 0xa22c29);
    cylinder.position.set(0, 0, 0);
    cylinder.rotateX(Math.PI * 0.5);
    cylinder.position.set(2.5 * side_size, -0.5 * side_size, 0);

    cone1 = new Pyramid(1 * side_size, 4 * side_size, 16, 0x603808);
    cone1.rotateX(Math.PI/2);
    cone1.position.set(-2 * side_size, -3 * side_size, -1 * side_size);

    cone2 = new Pyramid(1 * side_size, 1 * side_size, 16, 0xa47148);
    cone2.rotateX(Math.PI/2);
    cone2.rotateZ(3 * (Math.PI/2));
    cone2.position.set(-0.5 * side_size, 0, 0);

    cube2 = new Cube(2 * side_size, 0xffa62b);
    cube2.position.set(6 * side_size, 0, 0);

    cylinder2 = new Cylinder(1 * side_size, 1 * side_size, 16, 0x16697a);
    cylinder2.rotateX(Math.PI/2);
    cylinder2.position.set(6 * side_size, 0, 1.5 * side_size);

    rotObj = new RotatingObject(-5.5, -1.5, -1.5)
    scene.add(rotObj.cubeGroup);
    
    scene.add(ball_1);
    scene.add(ball_2);
    scene.add(ball_3);
    scene.add(torus);
    scene.add(cube);
    scene.add(cube2);
    scene.add(pyramid_1);
    scene.add(pyramid_2);
    scene.add(cylinder);
    scene.add(cylinder2);
    scene.add(cone1);
    scene.add(cone2);

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
}

function animate() {
    'use strict';
    rotObj.update()
    render();

    setTimeout( function() {
        requestAnimationFrame( animate );
    }, 1000 / 60 );
}
