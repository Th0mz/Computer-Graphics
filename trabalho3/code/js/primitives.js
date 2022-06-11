function createObject (x, y, z, geometry, _color, rotX=0, rotY=0, rotZ=0, _wireframe=true, texturePath=null) {
    var object = new THREE.Object3D();
    var materialData = { color: _color, wireframe: _wireframe }
    
    if (texturePath != null) {
        console.log(texturePath);
        var texture = new THREE.TextureLoader().load(texturePath);
        materialData["map"] = texture;
    }
    
    var material = new THREE.MeshStandardMaterial(materialData);
    var mesh = new THREE.Mesh(geometry, material);

    object.add(mesh);
    object.rotateX(rotX);
    object.rotateY(rotY);
    object.rotateZ(rotZ);
    object.position.set(x , y , z );
    
    scene.add(object);
    return object;
}

function createSphere (x, y, z, diameter, _color, _wireframe=true, texture=null) {
    
    var geometry = new THREE.SphereGeometry((diameter / 2) , 32, 16);
    var sphere = createObject(x, y, z, geometry, _color, 0, 0, 0, _wireframe, texture);

    return sphere;
}

function createCube(x, y, z, size, _color, _wireframe=true) {

    var geometry = new THREE.BoxGeometry(size , size , size );
    var cube = createObject(x, y, z, geometry, _color, 0, 0, 0, _wireframe);

    return cube;
}

function createRectangle(x, y, z,  width, height, depth, _color, _wireframe=true, texture=null) {

    var geometry = new THREE.BoxGeometry(width, height , depth);
    var rectangle = createObject(x, y, z, geometry, _color, 0, 0, 0, _wireframe, texture);

    return rectangle;
}

function createPyramid(x, y, z, diameter, height, base_polygon,  _color, _wireframe=true, rotX = 0, rotY = 0, rotZ = 0, texture=null) {
    
    var geometry = new THREE.ConeGeometry((diameter / 2) , height , base_polygon);
    var pyramid = createObject(x, y, z, geometry, _color, rotX, rotY, rotZ, _wireframe, texture);
    
    return pyramid;
}

function createCapsule (x, y, z, diameter, height, _color, _wireframe, rotX = 0, rotY = 0, rotZ = 0, texture=null) {
    
    var geometry = new THREE.CapsuleGeometry( (diameter / 2) , height , 10, 10 ); 
    var capsule = createObject(x, y, z, geometry, _color, rotX, rotY, rotZ, _wireframe, texture);
    
    return capsule;
}


function createCylinder (x, y, z, diameter, height, base_polygon, _color, _wireframe=true, rotX = 0, rotY = 0, rotZ = 0, texture=null) {
    
    var geometry = new THREE.CylinderGeometry( (diameter / 2) , (diameter / 2) , height , base_polygon);
    var cylinder = createObject(x, y, z, geometry, _color, rotX, rotY, rotZ, _wireframe, texture);
    
    return cylinder;
}