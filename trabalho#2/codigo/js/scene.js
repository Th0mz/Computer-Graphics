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

var spacecraft;

var lastWireFrame = true, wireFrame = true;

var side_size = 10;
const R = 50;

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
    camera.position.y = 0;
    camera.position.z = 1000;
    camera.lookAt(scene.position);
}

function createScene () {
    
    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(100));

    createSphere(0, 0, 0, 2*R, 0x006994);

    spacecraft = new Spacecraft(-1.2 * R, 0, 0, R/11);
    scene.add(spacecraft.spacecraftGroup);
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
