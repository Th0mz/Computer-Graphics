/*
* Trabalho # 1
*   95535 - António Coelho
*   95549 - Cristi Savin 
*   95680 - Tomás Tavares 
*
*/

// TODO : dont use global variables
var camera, scene, renderer;

var geometry, material, mesh;

var ball;


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
        case 49:
            camera.position.x = 50;
            camera.position.y = 50;
            camera.position.z = 50;
            camera.lookAt(scene.position);
            break;
        case 50:
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = Math.sqrt(Math.pow(50,2)*3);
            camera.lookAt(scene.position);
            break;
        case 51:
            camera.position.x = Math.sqrt(Math.pow(50,2)*3);
            camera.position.y = 0;
            camera.position.z = 0;
            camera.lookAt(scene.position);
            break;
        case 52:
            scene.traverse(function (node) {
                if (node instanceof THREE.Mesh) {
                    node.material.wireframe = !node.material.wireframe;
                }
            });
            break;
    }
}

function render() {
    'use strict';
    //ball.position.x += 0.1;
    renderer.render(scene, camera);
}

function init() {
    'use strict';

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(10));

    camera = new THREE.OrthographicCamera( window.innerWidth  / -2, 
                                           window.innerWidth  /  2, 
                                           window.innerHeight /  2, 
                                           window.innerHeight / -2, 
                                           0.1, 
                                           100 );


    camera.position.x = 50;
    camera.position.y = 50;
    camera.position.z = 50;
    camera.lookAt(scene.position);
    
    ball = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    geometry = new THREE.SphereGeometry(30, 10, 10);
    mesh = new THREE.Mesh(geometry, material);

    ball.add(mesh);
    ball.position.set(0, 0, 0);

    scene.add(ball);

    console.log(scene.position);

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
}

function animate() {
    'use strict';
    render();
    requestAnimationFrame(animate);
}
