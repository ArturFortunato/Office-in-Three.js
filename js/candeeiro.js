function addTopLamp(obj, x, y, z){
	geometry = new THREE.CylinderGeometry(0.2, 1.6, 1, 32);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function addLampPoll(obj, x, y, z){
	geometry = new THREE.CylinderGeometry(0.1, 0.1, 7.3, 32);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y , z);

	obj.add(mesh);
}

function addBottomLamp(obj, x, y, z){
	geometry = new THREE.CylinderGeometry(0.5, 1.60, 1.5, 32);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function addTopSwitchLamp(obj, x, y, z){
	geometry = new THREE.CylinderGeometry(0.05, 0.05, 0.8, 32);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function addBottomSwitchLamp(obj, x, y, z){
	geometry = new THREE.CylinderGeometry(0.015, 0.015, 2.6, 32);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function addPushSwitchLamp(obj, x, y, z){
	geometry = new THREE.CylinderGeometry(0.035, 0.035, 0.125, 32);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function addLightBulb(obj, x, y, z){
	geometry = new THREE.SphereGeometry(0.2, 32, 32);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function createLamp(){
	var bottom = new THREE.Object3D();
	var poll = new THREE.Object3D();
	var top = new THREE.Object3D();
	var topSwit = new THREE.Object3D();
	var bottomSwit = new THREE.Object3D();
	var pushSwit = new THREE.Object3D();
	var bulb = new THREE.Object3D();

	material = new THREE.MeshBasicMaterial({color: 0xFFFF33	, wireframe: true});

	addBottomLamp(bottom, 6, -1.40 , 0);
	addLampPoll(poll, 6, 1.5, 0);
	addTopLamp(top, 6, 5.5, 0);
	addTopSwitchLamp(topSwit, 5.55, 3.95, 0);
	addBottomSwitchLamp(bottomSwit, 5.55, 4.15, 0);
	addPushSwitchLamp(pushSwit, 5.55, 2.85, 0);
	addLightBulb(bulb, 6, 5.3, 0);

	scene.add(bottom);
	scene.add(poll);
	scene.add(top);
	scene.add(topSwit);
	scene.add(bottomSwit);
	scene.add(pushSwit);
	scene.add(bulb);
}