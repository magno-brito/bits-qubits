// Configura a cena
let scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);  // Fundo branco

let camera = new THREE.PerspectiveCamera(75, window.innerWidth / 2 / 400, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth / 2, 400);
document.getElementById('blochSphereCanvas').appendChild(renderer.domElement);

// Cria a esfera de Bloch
let geometry = new THREE.SphereGeometry(7, 32, 32);
let material = new THREE.MeshBasicMaterial({ color: 0x800080, wireframe: true });
let blochSphere = new THREE.Mesh(geometry, material);
scene.add(blochSphere);

// Posiciona a câmera
camera.position.z = 15;

// Carrega a fonte e adiciona os números 0 e 1 como filhos da esfera
let loader = new THREE.FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    // Adiciona o número 0 no polo sul da esfera
    let textGeometry0 = new THREE.TextGeometry('0', {
        font: font,
        size: 0.8,
        height: 0.1
    });
    let textMaterial0 = new THREE.MeshBasicMaterial({ color: 0x000000 });
    let textMesh0 = new THREE.Mesh(textGeometry0, textMaterial0);
    textMesh0.position.set(0, -5.5, 0);  // Posição no polo sul
    blochSphere.add(textMesh0);  // Adiciona como filho da esfera

    // Adiciona o número 1 no polo norte da esfera
    let textGeometry1 = new THREE.TextGeometry('1', {
        font: font,
        size: 0.8,
        height: 0.1
    });
    let textMaterial1 = new THREE.MeshBasicMaterial({ color: 0x000000 });
    let textMesh1 = new THREE.Mesh(textGeometry1, textMaterial1);
    textMesh1.position.set(0, 5.5, 0);  // Posição no polo norte
    blochSphere.add(textMesh1);  // Adiciona como filho da esfera
});

// Função de animação
function animate() {
    requestAnimationFrame(animate);
    blochSphere.rotation.x += 0.01;
    blochSphere.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// Ajusta o tamanho do canvas ao redimensionar a janela
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth / 2, 400);
    camera.aspect = window.innerWidth / 2 / 400;
    camera.updateProjectionMatrix();
});