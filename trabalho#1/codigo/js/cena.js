/*
* Trabalho # 1
*   95535 - António Coelho
*   95549 - Cristi Savin 
*   95680 - Tomás Tavares 
*
*/

var camera, scene, renderer;
var rotObj;
var originalAspect;
var viewSize;

var lastWireFrame = true, wireFrame = true;

var side_size = 50;

function createObject (x, y, z, geometry, _color, rotX=0, rotY=0, rotZ=0, _wireframe=true) {
    var object = new THREE.Object3D();
    var material = new THREE.MeshBasicMaterial({ color: _color, wireframe: _wireframe });
    var mesh = new THREE.Mesh(geometry, material);

    object.add(mesh);
    object.rotateX(rotX);
    object.rotateY(rotY);
    object.rotateZ(rotZ);
    object.position.set(x * side_size, y * side_size, z * side_size);
    
    scene.add(object);
    return object;
}

function createSphere (x, y, z, diameter, _color, _wireframe=true) {
    
    var geometry = new THREE.SphereGeometry((diameter / 2) * side_size, 10, 10);
    var sphere = createObject(x, y, z, geometry, _color);

    return sphere;
}

function createTorus (x, y, z, diameter_external, diameter_internal, _color, _wireframe=true, rotX = 0, rotY = 0, rotZ = 0) {
    
    var geometry = new THREE.TorusGeometry((diameter_external / 2) * side_size, (diameter_internal / 2) * side_size, 12, 12);
    var torus = createObject(x, y, z, geometry, _color, rotX, rotY, rotZ);

    return torus;
}

function createCube(x, y, z, size, _color, _wireframe=true) {

    var geometry = new THREE.BoxGeometry(size * side_size, size * side_size, size * side_size);
    var cube = createObject(x, y, z, geometry, _color);

    return cube;
}

function createPyramid(x, y, z, diameter, height, base_polygon,  _color, _wireframe=true, rotX = 0, rotY = 0, rotZ = 0) {
    
    var geometry = new THREE.ConeGeometry((diameter / 2) * side_size, height * side_size, base_polygon);
    var pyramid = createObject(x, y, z, geometry, _color, rotX, rotY, rotZ);
    
    return pyramid;
}

function createCylinder (x, y, z, diameter, height, base_polygon, _color, _wireframe=true, rotX = 0, rotY = 0, rotZ = 0) {
    
    var geometry = new THREE.CylinderGeometry( (diameter / 2) * side_size, (diameter / 2) * side_size, height * side_size, base_polygon);
    var cylinder = createObject(x, y, z, geometry, _color, rotX, rotY, rotZ);
    
    return cylinder;
}

function createCamera () {
    camera = new THREE.OrthographicCamera( window.innerWidth  / -2, 
                                           window.innerWidth  /  2, 
                                           window.innerHeight /  2, 
                                           window.innerHeight / -2, 
                                           0.1, 
                                           5000 );


    // setup camera position
    camera.position.x = 0;
    camera.position.y = -1000;
    camera.position.z = 0;
    camera.lookAt(scene.position);
}

function createScene () {
    
    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(100));

    createSphere(0.5, 2.5, 2.5, 1, 0x8F250C);
    createSphere(-3, 4, 4, 2, 0x442220);
    createSphere(-4.5, 2.5, 2.5, 3, 0x809848);

    createTorus(-6, 4, 3.5, 1.5, 1, 0x9A6D38);

    createCube(3.5, 3.5, 4.5, 1, 0xEEAD2D);
    createCube(6, 0, 0, 2, 0xffa62b);

    createPyramid(2.5, 2.5, -3.5, 2, 5, 4, 0xbc6c25, true, 0, 0, Math.PI / 2);
    createPyramid(3, -2, 2.5, 3, 3, 4, 0xe7bc91, true, Math.PI / 2);

    // cone
    createPyramid(-2, -3, -1, 2, 4, 16, 0x603808, true, Math.PI / 2);
    createPyramid(-0.5, 0, 0, 2, 1, 16, 0xa47148, true, Math.PI / 2, 0, 3 * (Math.PI / 2));

    createCylinder(2.5, -0.5, 0, 1, 4, 16, 0xa22c29, true, Math.PI / 2);
    createCylinder(6, 0, 1.5, 2, 1, 16, 0x16697a, true, Math.PI / 2);

    rotObj = new RotatingObject(-5.5, -1.5, -1.5)
    scene.add(rotObj.objectGroup);
}

function onResize() {
    'use strict'
    var aspect = window.innerWidth / window.innerHeight;
    var change = originalAspect / aspect;
    var newSize = viewSize * change;
    camera.left = -aspect * newSize / 2;
    camera.right = aspect * newSize  / 2;
    camera.top = newSize / 2;
    camera.bottom = -newSize / 2;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

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
            camera.position.z = 1000;
            camera.lookAt(scene.position);
            break;

        case 51: // 3
            camera.position.x = 0;
            camera.position.y = -1000;
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
            rotObj.updateCubeRotationInv(-1);
            break;

        case 97: //a or A
        case 65:
            rotObj.updateCylinderRotation(1);
            break;

        case 115: //s or S
        case 83:
            rotObj.updateCylinderRotationInv(-1);
            break;

        case 120: //x or X
        case 88:
            rotObj.updatePyramidRotation(1);
            break;

        case 122: //z or Z 
        case 90:
            rotObj.updatePyramidRotationInv(-1);
            break;

        case 38: // up and down
            rotObj.updateMovementY(1);
            break;
        case 40:
            rotObj.updateMovementYInv(-1);
            break;

        case 37: // left and right
            rotObj.updateMovementXInv(-1);
            break;
        case 39:
            rotObj.updateMovementX(1);
            break;    
            
        case 100: // d or D
        case 68:
            rotObj.updateMovementZInv(-1);
            break;
        case 99: // c or C
        case 67:
            rotObj.updateMovementZ(1);
            break;
    }
}

function onKeyUp(e){
    'use strict';
    switch(e.keyCode) {
        case 113: // q or Q or w or W
        case 81:
            rotObj.updateCubeRotation(0);
            break;
        case 119:
        case 87: 
            rotObj.updateCubeRotationInv(0);
            break;

        case 97: //a or A or s or S
        case 65:
            rotObj.updateCylinderRotation(0);
            break;
        case 115:
        case 83:    
            rotObj.updateCylinderRotationInv(0);
            break;

        case 120: //x or X or z or Z
        case 88:
            rotObj.updatePyramidRotation(0);
            break;

        case 122:
        case 90:  
            rotObj.updatePyramidRotationInv(0);
            break;

        case 38:
            rotObj.updateMovementY(0);
            break;
        case 40:
            rotObj.updateMovementYInv(0);
            break;
        
        case 37:
            rotObj.updateMovementXInv(0);
            break;
        case 39:
            rotObj.updateMovementX(0);
            break;

        case 100:
        case 68:
            rotObj.updateMovementZInv(0);
            break;
        case 99:
        case 67:
            rotObj.updateMovementZ(0);
            break;
            
    }

}

function render() {
    'use strict';
    renderer.render(scene, camera);
}

function init() {
    'use strict';
    
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    viewSize = 700;
    var aspectRatio = window.innerWidth / window.innerHeight;
    originalAspect = window.innerWidth / window.innerHeight;
    camera = new THREE.OrthographicCamera(-aspectRatio * viewSize / 2, aspectRatio * viewSize / 2, viewSize / 2, -viewSize / 2, 0.1, 5000);
    
    createScene();
    createCamera();

    
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
}

function animate() {
    'use strict';

    // wireframe
    if(lastWireFrame != wireFrame){
        scene.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
            node.material.wireframe = !node.material.wireframe;
        }
        });
    }
    lastWireFrame = wireFrame;

    // rotating object rotation and position update
    rotObj.update();
    render();

    setTimeout( function() {
        requestAnimationFrame( animate );
    }, 1000 / 60 );
}
