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
var side_size = 10;

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
            camera.position.x = 65;
            camera.position.y = 65;
            camera.position.z = 65;
            camera.lookAt(scene.position);
            break;
        case 50:
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = Math.sqrt(Math.pow(70,2)*3);
            camera.lookAt(scene.position);
            break;
        case 51:
            camera.position.x = 0;
            camera.position.y = Math.sqrt(Math.pow(70,2)*3);
            camera.position.z = 0;
            camera.lookAt(scene.position);
            break;
        case 52:
            //mudar isto para o update, n da traverse das cenas for do update
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
    var ball_1, ball_2, ball_3, torus;

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(10));


    camera = new THREE.PerspectiveCamera(70,
        window.innerWidth / window.innerHeight,
        1,
        1000);

    camera.position.x = 65;
    camera.position.y = 65;
    camera.position.z = 65;
    camera.lookAt(scene.position);
    
    ball_1 = new Sphere(side_size/2, 10, 10);
    ball_1.position.set(5, 25, 25);

    ball_2 = new Sphere(side_size, 10, 10, 0x005050);
    ball_2.position.set(-30,40,40);

    ball_3 = new Sphere(side_size*1.5, 10, 10, 0xE6E6FA);
    ball_3.position.set(-45,25,25);

    torus = new Torus(side_size*0.75, side_size/2, 12, 12 );
    torus.position.set(-60,40,35);

    scene.add(ball_1);
    scene.add(ball_2);
    scene.add(ball_3);
    scene.add(torus);

    console.log(scene.position);

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
}

function animate() {
    'use strict';
    render();
    requestAnimationFrame(animate);
}
