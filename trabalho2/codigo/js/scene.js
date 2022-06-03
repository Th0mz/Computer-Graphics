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
var planet;
var debris;
var side_size = 10;
const R = 30;

function createCameras () {

    viewSize = 800;
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
    perspectiveCamera = new THREE.PerspectiveCamera(70,
        window.innerWidth / window.innerHeight,
        1,
        1000);

    perspectiveCamera.position.set(400, 400, 400);
    perspectiveCamera.lookAt(scene.position);

    // Spacecraft Camera
    // TODO : remove this
    spacecraft.createCamera()
    
    // Set main camera
    mainCamera = frontalCamera;
}

function createScene () {
    
    scene = new THREE.Scene();

    planet = createGlobe(0, 0, 0, 2*R, 0x006994, false);

    var startingPhi = Math.random() * Math.PI;
    var startingTheta = Math.random() * (2* Math.PI);

    spacecraft = new Spacecraft(-1.2 * R, startingPhi, startingTheta, R/11);
    scene.add(spacecraft.objectGroup);

    debris = new Debris(100);
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

        spacecraft.getCamera().aspect= window.innerWidth / window.innerHeight;
        spacecraft.getCamera().updateProjectionMatrix();
    }

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
    //new position is always valid so a validatePosition() would be always True
    actionCollision();
    render();

    setTimeout( function() {
        requestAnimationFrame( animate );
    }, 1000 / 60 );
}


function actionCollision() {
    var quadrant = spacecraft.whichQuadrant();
    //quadrant is generally one number in an array
    //might be two numbers in an array next to quadrants boundaries
    for(q of quadrant){
        if(debris.quadrant[q] === undefined) {
            return ;
        }
        let size = debris.quadrant[q].length;

        for (let i = 0; i < size; i++) {
            let d = debris.quadrant[q][i];
            if(spacecraft.doCollide(d.bo.radius, d.bo.center.x, d.bo.center.y, d.bo.center.z)) {
                size = processCollision(d, q, size);
            }
        }    
    }
}

function processCollision(debrisInCollison, quadrant, size) {
    scene.remove(debrisInCollison.deb);
    debris.quadrant[quadrant] = debris.quadrant[quadrant].filter(obj => obj.deb != debrisInCollison.deb);
    return size - 1;
}