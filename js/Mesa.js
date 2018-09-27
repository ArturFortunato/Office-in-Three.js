function addTableTop(obj, x, y, z) {
    geometry = new THREE.BoxGeometry(10, 0.5, 6);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    obj.add(mesh);
}

function addTableLeg(obj, x, y, z) {
    geometry = new THREE.CylinderGeometry(0.4, 0.2, 3, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    obj.add(mesh);
}

function createTable() {
    var table = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({color: 0x825201, wireframe: true});

    addTableTop(table, 0, 1.75, -3);

    addTableLeg(table, 4, 0, -1);
    addTableLeg(table, -4, 0, -1);
    addTableLeg(table, 4, 0, -5);
    addTableLeg(table, -4, 0, -5);
    scene.add(table);

    table_obj.push(table);
}
