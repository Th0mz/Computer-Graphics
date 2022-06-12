/*
* Trabalho # 2
*   95535 - António Coelho
*   95549 - Cristi Savin 
*   95680 - Tomás Tavares 
*
*/


// Cameras
var mainCamera;
var frontalCamera;

var scene, renderer;

// Camera resize variables
var originalAspect;
var viewSize;

// Scene objects properties
var side_size = 10;
var completeObject;
var initialObject;


// Global clock
var clock = new THREE.Clock();

function createCameras () {

    viewSize = 75;
    var aspectRatio = window.innerWidth / window.innerHeight;
    originalAspect = window.innerWidth / window.innerHeight;

    // Frontal Camera
    frontalCamera = new THREE.OrthographicCamera(-aspectRatio * viewSize / 2, 
                                          aspectRatio * viewSize / 2,
                                          viewSize / 2, 
                                          -viewSize / 2,
                                          0.1,
                                          500 );

    frontalCamera.position.set(0, 2.5,  50);
    frontalCamera.lookAt(scene.position);

    // Set main camera
    mainCamera = frontalCamera;
}

function createScene () {
    
    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(10));
    const directionalLight = new THREE.DirectionalLight(0x404040, 0.5);
    directionalLight.position.set(0,50, 15);
    scene.add(directionalLight);
    const directionalLightHelper = new THREE.DirectionalLightHelper( directionalLight ); scene.add( directionalLightHelper )

    //temporary
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight)

    new Stage;
    initialObject = new OrigamiInitial;
    completeObject = new OrigamiSwan;
     
}

function onResize() {
    'use strict'
    var aspect = window.innerWidth / window.innerHeight;
    var change = originalAspect / aspect;
    var newSize = viewSize * change;
    
    // Frontal Camera Resize
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
        case 81: //Q
        case 113: //q
            initialObject.updatePosRotation(1);
            break;
        case 87: //W
        case 119: //w
            initialObject.updateNegRotation(-1);
            break;
        case 84: //T
        case 116: //t
            completeObject.updatePosRotation(1);
            break;
        case 89: //Y
        case 121: //y
            completeObject.updateNegRotation(-1);
            break;
    }
}

function onKeyUp(e){
    'use strict';
    switch(e.keyCode) {
        case 81: //Q
        case 113: //q
            initialObject.updatePosRotation(0);
            break;
        case 87: //W
        case 119: //w
            initialObject.updateNegRotation(0);
            break;
        case 84: //T
        case 116: //t
            completeObject.updatePosRotation(0);
            break;
        case 89: //Y
        case 121: //y
            completeObject.updateNegRotation(0);
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
        antialias: true,
        alpha : true
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
    
    var delta_time = clock.getDelta();
    initialObject.update();
    completeObject.update();
    render();

    setTimeout( function() {
        requestAnimationFrame( animate );
    }, 1000 / 60 );
}