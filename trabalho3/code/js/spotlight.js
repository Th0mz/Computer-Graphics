class SpotLight {
    constructor (x, y, z, color, intensity, direction) {

        var pyramidBase = createPyramid(0, 0, 0, 3, 4, 64, 0x000000, false, Math.PI/2)[0];
        var sphere = createSphere(0, 0, -3.5, 3, 0x999900, false)[0];
        
        this.base = new THREE.Group();
        this.base.add(pyramidBase, sphere);

        this.base.position.set(x, y, z);
        this.base.rotateX(Math.PI/7)
        

        this.light = new THREE.SpotLight( color, intensity, 0, Math.PI/6, 0, 1);

        var lightPosition = new THREE.Vector3(0,0,0);
        sphere.getWorldPosition(lightPosition);
        
        direction.add(lightPosition);

        this.light.position.set(lightPosition.x, lightPosition.y, lightPosition.z);
        this.light.target.position.set(direction.x, direction.y, direction.z);
        this.light.castShadow = false;
        this.light.target.updateMatrixWorld();

        this.object = new THREE.Group();
        this.object.add(this.base, this.light);

    }

    toggleLight () {
        this.light.visible = !this.light.visible
    }

    setLight (visibility) {
        this.light.visible = visibility;
    }
}