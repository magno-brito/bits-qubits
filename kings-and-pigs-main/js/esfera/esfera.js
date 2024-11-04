const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('bloch-sphere-container').appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xBF40BF, wireframe: true });
const blochSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(blochSphere);

const vectorMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
const vectorGeometry = new THREE.BufferGeometry();
const positions = new Float32Array([0, 0, 0, 0, 1, 0]);
vectorGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const qubitVector = new THREE.Line(vectorGeometry, vectorMaterial);
scene.add(qubitVector);

const tipGeometry = new THREE.SphereGeometry(0.05, 16, 16);
const tipMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const qubitTip = new THREE.Mesh(tipGeometry, tipMaterial);
qubitTip.position.set(0, 1, 0);
scene.add(qubitTip);

const axesHelper = new THREE.AxesHelper(1.5);
scene.add(axesHelper);

const textObjects = [];

function createTextMesh(text, position, color) {
    const loader = new THREE.FontLoader();
    loader.load('https://cdn.jsdelivr.net/npm/three@0.137.5/examples/fonts/helvetiker_regular.typeface.json', function(font) {
        const textGeometry = new THREE.TextGeometry(text, { font: font, size: 0.1, height: 0.01 });
        const textMaterial = new THREE.MeshBasicMaterial({ color: color });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.copy(position);
        scene.add(textMesh);
        textObjects.push(textMesh);
    });
}

createTextMesh('|0>', new THREE.Vector3(0, 1.1, 0), 0xffffff);
createTextMesh('|1>', new THREE.Vector3(0, -1.2, 0), 0xffffff);
createTextMesh('X', new THREE.Vector3(1.5, 0, 0), 0xff0000);
createTextMesh('Y', new THREE.Vector3(0, 1.5, 0), 0x00ff00);
createTextMesh('Z', new THREE.Vector3(0, 0, 1.5), 0x0000ff);

let theta = Math.PI / 2;
let phi = 0;

function updateQubitVector(theta, phi) {
    const radius = blochSphere.scale.x;
    const x = radius * Math.sin(theta) * Math.cos(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(theta);

    const positions = qubitVector.geometry.attributes.position.array;
    positions[3] = x;
    positions[4] = y;
    positions[5] = z;
    qubitVector.geometry.attributes.position.needsUpdate = true;

    qubitTip.position.set(x, y, z);
    document.getElementById('theta-value').innerText = (theta / Math.PI).toFixed(2) + 'π';
    document.getElementById('phi-value').innerText = (phi / Math.PI).toFixed(2) + 'π';
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

function resizeSphere(scaleFactor) {
    blochSphere.scale.set(blochSphere.scale.x * scaleFactor, blochSphere.scale.y * scaleFactor, blochSphere.scale.z * scaleFactor);
    axesHelper.scale.set(scaleFactor, scaleFactor, scaleFactor);
    textObjects.forEach(textMesh => {
        textMesh.position.multiplyScalar(scaleFactor);
    });
    updateQubitVector(theta, phi);
}

function rotateQubit() {
    theta += Math.PI / 12;
    updateQubitVector(theta, phi);
}

function resetQubit() {
    theta = Math.PI / 2;
    phi = 0;
    updateQubitVector(theta, phi);
}

function rotatePhi() {
    phi += Math.PI / 12; // Rotaciona o ângulo phi
    updateQubitVector(theta, phi);
}