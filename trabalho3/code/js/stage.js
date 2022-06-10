

class Stage{


    constructor(){


        //make floor plane
        var geometry = new THREE.PlaneGeometry(45,1);
        //geometry.rotateX(Math.PI*0.00);
        var material = new THREE.MeshBasicMaterial({color: 0x787878, side: THREE.DoubleSide});
        var plane = new THREE.Mesh(geometry, material);
        scene.add(plane);



        //make first podium step
        var lowerStep = createRectangle(0, 1.75, 0, 30, 2.5, 30, 0xaaaa00, false);
        scene.add(lowerStep);
        //make second podium step
        var secondStep = createRectangle(0, 3, 0, 15, 2.5, 15, 0xaaaa00, false);
        scene.add(secondStep);



        //spotlight object



        //lights

    }
}