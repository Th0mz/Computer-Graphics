function createObject (x, y, z, geometry, _color, rotX=0, rotY=0, rotZ=0, _wireframe=true) {
    var object = new THREE.Object3D();
    var material = new THREE.MeshBasicMaterial({ color: _color, wireframe: _wireframe });
    var mesh = new THREE.Mesh(geometry, material);

    object.add(mesh);
    object.rotateX(rotX);
    object.rotateY(rotY);
    object.rotateZ(rotZ);
    object.position.set(x * side_size, y * side_size, z * side_size);
    
    scene.add(object);
    return object;
}

function createGlobe (x, y, z, diameter, _color, _wireframe=true) {
    var geometry = new THREE.SphereGeometry((diameter / 2) * side_size, 32, 16);

    var texture = new THREE.TextureLoader().load('assets/2k_mars.jpg');

    var object = new THREE.Object3D();
    var material = new THREE.MeshBasicMaterial({ map: texture, wireframe: _wireframe });
    var mesh = new THREE.Mesh(geometry, material);

    object.add(mesh);
    object.rotateX(0);
    object.rotateY(0);
    object.rotateZ(0);
    object.position.set(x * side_size, y * side_size, z * side_size);
    
    scene.add(object);
}

function createSphere (x, y, z, diameter, _color, _wireframe=true) {
    
    var geometry = new THREE.SphereGeometry((diameter / 2) * side_size, 32, 16);
    var sphere = createObject(x, y, z, geometry, _color, 0, 0, 0, _wireframe);

    return sphere;
}

function createCube(x, y, z, size, _color, _wireframe=true) {

    var geometry = new THREE.BoxGeometry(size * side_size, size * side_size, size * side_size);
    var cube = createObject(x, y, z, geometry, _color, 0, 0, 0, _wireframe);

    return cube;
}

function createPyramid(x, y, z, diameter, height, base_polygon,  _color, _wireframe=true, rotX = 0, rotY = 0, rotZ = 0) {
    
    var geometry = new THREE.ConeGeometry((diameter / 2) * side_size, height * side_size, base_polygon);
    var pyramid = createObject(x, y, z, geometry, _color, rotX, rotY, rotZ, _wireframe);
    
    return pyramid;
}

function createCapsule (x, y, z, diameter, height, _color, _wireframe, rotX = 0, rotY = 0, rotZ = 0) {
    
    var geometry = new THREE.CapsuleGeometry( (diameter / 2) * side_size, height * side_size, 10, 10 ); 
    var capsule = createObject(x, y, z, geometry, _color, rotX, rotY, rotZ, _wireframe);
    
    return capsule;
}

function createCylinder (x, y, z, diameter, height, base_polygon, _color, _wireframe=true, rotX = 0, rotY = 0, rotZ = 0) {
    
    var geometry = new THREE.CylinderGeometry( (diameter / 2) * side_size, (diameter / 2) * side_size, height * side_size, base_polygon);
    var cylinder = createObject(x, y, z, geometry, _color, rotX, rotY, rotZ, _wireframe);
    
    return cylinder;
}