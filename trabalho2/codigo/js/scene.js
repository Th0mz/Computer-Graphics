/*
* Trabalho # 2
*   95535 - António Coelho
*   95549 - Cristi Savin 
*   95680 - Tomás Tavares 
*
*/

// Cameras
var mainCamera;
var frontalCamera, perspectiveCamera;

var scene, renderer;

// Camera resize variables
var originalAspect;
var viewSize;

// Scene objects properties
var spacecraft;
var side_size = 10;
const R = 30;

function createCameras () {

    viewSize = 700;
    var aspectRatio = window.innerWidth / window.innerHeight;
    originalAspect = window.innerWidth / window.innerHeight;

    // Frontal Camera
    frontalCamera = new THREE.OrthographicCamera(-aspectRatio * viewSize / 2, 
                                          aspectRatio * viewSize / 2,
                                          viewSize / 2, 
                                          -viewSize / 2,
                                          0.1,
                                          5000 );

    frontalCamera.position.set(0, 0, 1000);
    frontalCamera.lookAt(scene.position);

    // Perspective Camera
    // TODO : must be perspective camera
    perspectiveCamera = new THREE.OrthographicCamera(-aspectRatio * viewSize / 2, 
                                          aspectRatio * viewSize / 2,
                                          viewSize / 2, 
                                          -viewSize / 2,
                                          0.1,
                                          5000 );

    perspectiveCamera.position.set(500, 500, 500);
    perspectiveCamera.lookAt(scene.position);

    // Spacecraft Camera
    // TODO : remove this
    spacecraft.createCamera()
    
    // Set main camera
    mainCamera = perspectiveCamera;
}

function createScene () {
    
    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(100));

    createSphere(0, 0, 0, 2*R, 0x006994, false);

    var startingPhi = Math.random() * (2* Math.PI)
    var startingTheta = Math.random() * (2* Math.PI)
    spacecraft = new Spacecraft(-1.2 * R, startingPhi, startingTheta, R/11);
    scene.add(spacecraft.spacecraftGroup);
}

function onResize() {
    'use strict'
    var aspect = window.innerWidth / window.innerHeight;
    var change = originalAspect / aspect;
    var newSize = viewSize * change;
    frontalCamera.left = -aspect * newSize / 2;
    frontalCamera.right = aspect * newSize  / 2;
    frontalCamera.top = newSize / 2;
    frontalCamera.bottom = -newSize / 2;
    frontalCamera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

function onKeyDown(e) {
    'use strict';
    switch(e.keyCode) {
        // TODO : cant make associations in onKeyDown
        case 49 : // number 1
            mainCamera = frontalCamera
            break;
        case 50 : // number 2
            mainCamera = perspectiveCamera
            break;
        case 51 : // number 3
            mainCamera = spacecraft.getCamera()
            break;
        case 38: // up and down
            spacecraft.movePhi();
            break;
        case 40:
            spacecraft.movePhiInv();
            break;

        case 37: // left and right
            spacecraft.moveThetaInv();
            break;
        case 39:
            spacecraft.moveTheta();
            break;
    }
}

function onKeyUp(e){
    'use strict';
    switch(e.keyCode) {
        case 38: // up and down
            spacecraft.stopPhi();
            break;
        case 40:
            spacecraft.stopPhiInv();
            break;

        case 37: // left and right
            spacecraft.stopThetaInv();
            break;
        case 39:
            spacecraft.stopTheta();
            break;
    }

}

function render() {
    'use strict';
    renderer.render(scene, mainCamera);
}

function init() {
    'use strict';
    
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    createScene();
    createCameras();

    
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
}

function animate() {
    'use strict';

    spacecraft.update();
    render();

    setTimeout( function() {
        requestAnimationFrame( animate );
    }, 1000 / 60 );
}


/* function detectCollision(spacecraftObj, debrisObj) {
    for (debris_i in array_debris[spacecraft.whichQuadrant()]) {
        if(spacecraft.doCollide(debris_i.collisionRadius, debris_i.x, debris_i.y, debris_i.z)) {
            scene.remove(debris_i);
            array_debris[spacecraft.whichQuadrant()] = array_debris[spacecraft.whichQuadrant()]
            .filter(obj => obj != debris_i);
        }
    }
} */