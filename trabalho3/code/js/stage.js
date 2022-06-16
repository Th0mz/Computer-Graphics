

class Stage{

    constructor(){

        //make floor plane
        var geometry = new THREE.PlaneGeometry(100,100);
        geometry.rotateX(Math.PI/2);
        var material = new THREE.MeshStandardMaterial({color: 0x787878, side: THREE.DoubleSide});
        this.plane = new THREE.Mesh(geometry, material);


        //make first podium step
        createRectangle(0, 1.75, 0, 80, 2.5, 50, 0xaaaa00, false);
        //make second podium step
        createRectangle(0, 3, 0, 60, 2.5, 25, 0xaaaa00, false);


        this.spotlightOne = new SpotLight(-23, 3.75 + 0.875, 21, 0xffffff, 0.7, new THREE.Vector3(0, 10, -10));
        this.spotlightTwo = new SpotLight(0, 3.75 + 0.875, 21, 0xffffff, 0.7, new THREE.Vector3(0, 10, -10));
        this.spotlightThree = new SpotLight(23, 3.75 + 0.875, 21, 0xffffff, 0.7, new THREE.Vector3(0, 8, -10));

    }

    toggleLeft()   { this.spotlightOne.toggleLight(); } 
    toggleCenter() { this.spotlightTwo.toggleLight(); }
    toggleRight()  { this.spotlightThree.toggleLight(); }

    doReset () {
        this.spotlightOne.setLight(true);
        this.spotlightTwo.setLight(true);
        this.spotlightThree.setLight(true);
    }
}