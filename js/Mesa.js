var material;

class Table extends Objeto {}

function createTable() {

    var table = new Table();

    material = new THREE.MeshBasicMaterial({color: 0x825201, wireframe: true});

    table.addElement(0, 1.25, -3, new THREE.BoxGeometry(10, 0.5, 6));
    table.addElement(4, -0.5, -1, new THREE.CylinderGeometry(0.4, 0.2, 3, 10));
    table.addElement(-4, -0.5, -1, new THREE.CylinderGeometry(0.4, 0.2, 3, 10));
    table.addElement(4, -0.5, -5, new THREE.CylinderGeometry(0.4, 0.2, 3, 10));
    table.addElement(-4, -0.5, -5, new THREE.CylinderGeometry(0.4, 0.2, 3, 10));

    scene.add(table);
}
