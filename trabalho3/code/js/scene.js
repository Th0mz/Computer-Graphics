/*
* Trabalho # 3
*   95535 - António Coelho
*   95549 - Cristi Savin 
*   95680 - Tomás Tavares 
*
*/


// Cameras 
var mainCamera;
var frontalCamera, perspectiveCamera;

// Render
var scene, renderer;

// Camera resize variables
var originalAspect;
var viewSize = 75;

// Scene objects properties
var completeObject;
var intermediateObject;
var initialObject;

var stage;
var directionalLight;

// Global clock
var clock = new THREE.Clock();
var pause = false;
var pausePromptFrontal;
var pausePromptPerspective;

var reset = false;

function createCameras () {

    var aspectRatio = window.innerWidth / window.innerHeight;
    originalAspect = window.innerWidth / window.innerHeight;

    // Frontal Camera
    frontalCamera = new THREE.OrthographicCamera(-aspectRatio * viewSize / 2, 
                                          aspectRatio * viewSize / 2,
                                          viewSize / 2, 
                                          -viewSize / 2,
                                          0.1,
                                          500 );

    frontalCamera.position.set(0, 2.5, 100);
    frontalCamera.lookAt(scene.position);

    // Perspective Camera
    perspectiveCamera = new THREE.PerspectiveCamera(70,
        window.innerWidth / window.innerHeight,
        1,
        1000);
    perspectiveCamera.position.set(-22, 55, 55);
    perspectiveCamera.lookAt(scene.position); 
    perspectiveCamera.position.set(0, 0, 0);
    
   

    // Set main camera
    mainCamera = frontalCamera;
}

function createScene () {
    
    scene = new THREE.Scene();
    
    
    // lights
    directionalLight = new THREE.DirectionalLight(0x404040, 2.5);
    directionalLight.position.set(10, 50, 15);
    directionalLight.target = scene;
    scene.add(directionalLight);

    // Objects
    stage = new Stage;

    scene.add(stage.spotlightOne.object);
    scene.add(stage.spotlightTwo.object);
    scene.add(stage.spotlightThree.object);

    scene.add(stage.plane);

 
    completeObject = new OrigamiSwan;
    scene.add(completeObject.group);

    intermediateObject = new OrigamiIntermediateSwan;
    scene.add(intermediateObject.group);

    initialObject = new OrigamiInitial;
    scene.add(initialObject.group);

    
    // Pause prompt
    var aspectRatio = window.innerWidth / window.innerHeight;
    pausePromptFrontal = createRectangle(0, 0, 80, aspectRatio * viewSize, viewSize, 20, 0xffffff, false, 'assets/pause_screen.png', true)[0];
    pausePromptFrontal.visible = pause;

    pausePromptPerspective = createRectangle(-6, 15, 15, aspectRatio * viewSize, viewSize, 20, 0xffffff, false, 'assets/pause_screen.png', true)[0];
    pausePromptPerspective.lookAt(-22, 55, 55);
    pausePromptPerspective.visible = pause;

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

    // Perspective Cameras Resize
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        perspectiveCamera.aspect = window.innerWidth / window.innerHeight;
        perspectiveCamera.updateProjectionMatrix();
    }

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function onKeyDown(e) {
    'use strict';
    switch(e.keyCode) {

        // Objects rotation
        case 81: //Q
        case 113: //q
            initialObject.updatePosRotation(1);
            break;
        case 87: //W
        case 119: //w
            initialObject.updateNegRotation(-1);
            break;
        case 69: //E
        case 101: //e
            intermediateObject.updatePosRotation(1);
            break;
        case 82: //R
        case 114: //r
            intermediateObject.updateNegRotation(-1);
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
        // Cameras
        case 49 : // number 1
            mainCamera = frontalCamera
            if (pause) {
                pausePromptFrontal.visible = true;
                pausePromptPerspective.visible = false; 
            }
            break;
        case 50 : // number 2
            mainCamera = perspectiveCamera
            if (pause) {
                pausePromptFrontal.visible = false;
                pausePromptPerspective.visible = true; 
            }
            break;
        
        // Objects rotation
        case 81: //Q
        case 113: //q
            initialObject.updatePosRotation(0);
            break;
        case 87: //W
        case 119: //w
            initialObject.updateNegRotation(0);
            break;
        case 69: //E
        case 101: //e
            intermediateObject.updatePosRotation(0);
            break;
        case 82: //R
        case 114: //r
            intermediateObject.updateNegRotation(0);
            if (pause) { reset = true; }

            break;
        case 84: //T
        case 116: //t
            completeObject.updatePosRotation(0);
            break;
        case 89: //Y
        case 121: //y
            completeObject.updateNegRotation(0);
            break;

        // Object reflection
        case 65: //A
        case 97: //a
            initialObject.updateReflection();
            intermediateObject.updateReflection();
            completeObject.updateReflection();
            stage.updateReflection();

            break;
        case 83: //S
        case 115: //s
            initialObject.toggleIllumCalculation();
            intermediateObject.toggleIllumCalculation();
            completeObject.toggleIllumCalculation();
            stage.toggleIllumCalculation();
            break;

        // Lights
        case 68: //D
        case 100: //d
            directionalLight.visible = !directionalLight.visible;
            break;
        case 90: //Z
        case 122: //z
            stage.toggleLeft();
            break;
        case 88: //Y
        case 120: //y 
            stage.toggleCenter();
            break;
        case 67: //C
        case 99: //c
            stage.toggleRight();
            break;

        // Pause
        case 32: // Space bar
            pause = !pause;

            if (pause) { 
                clock.running = false;

                var inFrontalCamera = mainCamera == frontalCamera;
                pausePromptFrontal.visible = inFrontalCamera;
                pausePromptPerspective.visible = !inFrontalCamera;
            } else { 
                clock.start();
                pausePromptFrontal.visible = false;
                pausePromptPerspective.visible = false;
            }

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

    //SETUP VR
    document.body.appendChild( VRButton.createButton( renderer ) );
    renderer.xr.enabled = true;

    var cameraVRhelperCam1 = new THREE.Object3D();
    cameraVRhelperCam1.position.set(0, 5, 30);
    cameraVRhelperCam1.add(frontalCamera);
    scene.add(cameraVRhelperCam1);

    var cameraVRhelperCam2 = new THREE.Object3D();
    cameraVRhelperCam2.position.set(-22, 55, 55);
    cameraVRhelperCam2.add(perspectiveCamera);
    scene.add(cameraVRhelperCam2);
    
    
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    //TODO callback para o VR com a stereo camera?
}

function animate() {
    'use strict';
    if (!pause) {
        var delta_time = clock.getDelta();

        initialObject.update(delta_time);
        intermediateObject.update(delta_time);
        completeObject.update(delta_time);
        stage.applyReflectionChange();
        
    } else {
        if (reset) {
            doReset();
        }

        initialObject.applyReflectionChange();
        intermediateObject.applyReflectionChange();
        completeObject.applyReflectionChange();

    }
    
    render();
    setTimeout( function() {
        //requestAnimationFrame( animate );
        // TODO CHECK THIS
        renderer.setAnimationLoop( animate );
    }, 1000 / 60 );
}

function doReset () {
    directionalLight.visible = true;
    
    stage.doReset();
    completeObject.doReset();
    intermediateObject.doReset();
    initialObject.doReset();
    reset = false;
}