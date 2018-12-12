class Objeto extends THREE.Object3D {

    constructor() {
        super();
    }
        
    rotateMesh(mesh, angle, axis) {
        switch(axis) {
            case 'x':
                mesh.rotateX(angle);
                break;
            case 'y':
                mesh.rotateY(angle);
                break;
            case 'z':
                mesh.rotateZ(angle);
                break;
        }
    }

    createMesh(geometry, x, y, z) {
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);

        return mesh;
    }

    createAndRotateMesh(geometry, x, y, z, angle, axis) {
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        this.rotateMesh(this, angle, axis);

        return mesh;
    }

    addElement(x, y, z, geometry) {
		this.add(this.createMesh(geometry, x, y, z));
    }

    addAndRotateElement(x, y, z, geometry, angle, axis) {
        this.add(this.createAndRotateMesh(geometry, x, y, z, angle, axis));
    }
}