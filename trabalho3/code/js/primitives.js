function createObject (x, y, z, geometry, _color, rotX=0, rotY=0, rotZ=0, _wireframe=true, texturePath=null, _transparent=false) {
    var object = new THREE.Object3D();
    var materialData = { color: _color, wireframe: _wireframe, transparent : _transparent }
    
    if (texturePath != null) {
        var texture = new THREE.TextureLoader().load(texturePath);
        materialData["map"] = texture;
    }
    
    if (_transparent) {
        var material = new THREE.MeshBasicMaterial(materialData);
    } else {
        var material = new THREE.MeshStandardMaterial(materialData);
    }
    var mesh = new THREE.Mesh(geometry, material);

    object.add(mesh);
    object.rotateX(rotX);
    object.rotateY(rotY);
    object.rotateZ(rotZ);
    object.position.set(x, y, z);
    
    scene.add(object);
    return [object, mesh];
}

function createSphere (x, y, z, diameter, _color, _wireframe=true, texture=null, _transparent=false) {
    
    var geometry = new THREE.SphereGeometry((diameter / 2) , 32, 16);
    var sphereInfo = createObject(x, y, z, geometry, _color, 0, 0, 0, _wireframe, texture, _transparent);

    return [sphereInfo[0], sphereInfo[1], geometry];
}

function createCube(x, y, z, size, _color, _wireframe=true, _transparent=false) {

    var geometry = new THREE.BoxGeometry(size , size , size );
    var cubeInfo = createObject(x, y, z, geometry, _color, 0, 0, 0, _wireframe, _transparent);

    return [cubeInfo[0], cubeInfo[1], geometry];
}

function createRectangle(x, y, z,  width, height, depth, _color, _wireframe=true, texture=null, _transparent=false) {

    var geometry = new THREE.BoxGeometry(width, height , depth);
    var rectangleInfo = createObject(x, y, z, geometry, _color, 0, 0, 0, _wireframe, texture, _transparent);

    return [rectangleInfo[0], rectangleInfo[1], geometry];
}

function createPyramid(x, y, z, diameter, height, base_polygon,  _color, _wireframe=true, rotX = 0, rotY = 0, rotZ = 0, texture=null, _transparent=false) {
    
    var geometry = new THREE.ConeGeometry((diameter / 2) , height , base_polygon);
    var pyramidInfo = createObject(x, y, z, geometry, _color, rotX, rotY, rotZ, _wireframe, texture, _transparent);
    
    return [pyramidInfo[0], pyramidInfo[1], geometry];
}

function createCapsule (x, y, z, diameter, height, _color, _wireframe, rotX = 0, rotY = 0, rotZ = 0, texture=null, _transparent=false) {
    
    var geometry = new THREE.CapsuleGeometry( (diameter / 2) , height , 10, 10 ); 
    var capsuleInfo = createObject(x, y, z, geometry, _color, rotX, rotY, rotZ, _wireframe, texture, _transparent);
    
    return [capsuleInfo[0], capsuleInfo[1], geometry];
}


function createCylinder (x, y, z, diameter, height, base_polygon, _color, _wireframe=true, rotX = 0, rotY = 0, rotZ = 0, texture=null, _transparent=false) {
    
    var geometry = new THREE.CylinderGeometry( (diameter / 2) , (diameter / 2) , height , base_polygon);
    var cylinderInfo = createObject(x, y, z, geometry, _color, rotX, rotY, rotZ, _wireframe, texture, _transparent);
    
    return [cylinderInfo[0], cylinderInfo[1], geometry];;
}