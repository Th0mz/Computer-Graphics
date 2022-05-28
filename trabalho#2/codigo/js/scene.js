/*
* Trabalho # 2
*   95535 - António Coelho
*   95549 - Cristi Savin 
*   95680 - Tomás Tavares 
*
*/

var camera, scene, renderer;
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
    
    var geometry = new THREE.SphereGeometry((diameter / 2) * side_size, 32, 16);
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

    viewSize = 700;
    var aspectRatio = window.innerWidth / window.innerHeight;
    originalAspect = window.innerWidth / window.innerHeight;

    camera = new THREE.OrthographicCamera(-aspectRatio * viewSize / 2, 
                                          aspectRatio * viewSize / 2,
                                          viewSize / 2, 
                                          -viewSize / 2,
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

    createSphere(0, 0, 0, 4, 0x006994);
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
    }
}

function onKeyUp(e){
    'use strict';
    switch(e.keyCode) {
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

    render();

    setTimeout( function() {
        requestAnimationFrame( animate );
    }, 1000 / 60 );
}
