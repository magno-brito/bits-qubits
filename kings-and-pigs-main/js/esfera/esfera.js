// Configuração da cena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Criação da câmera (virtual)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5); // Posiciona a câmera para visualizar a esfera

// Renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controles orbitais para movimentar a câmera com o mouse
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Criação da esfera de Bloch (esfera de arame) com tamanho menor
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00aaff, wireframe: true });
const blochSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(blochSphere);

// Vetor de estado do qubit (linha vermelha)
const vectorMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
const vectorGeometry = new THREE.BufferGeometry();
const positions = new Float32Array([0, 0, 0, 0, 1, 0]);  // Vetor inicialmente no estado |0>
vectorGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const qubitVector = new THREE.Line(vectorGeometry, vectorMaterial);
scene.add(qubitVector);

// Ponta do vetor (pequena esfera)
const tipGeometry = new THREE.SphereGeometry(0.05, 16, 16);
const tipMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const qubitTip = new THREE.Mesh(tipGeometry, tipMaterial);
qubitTip.position.set(0, 1, 0);  // Inicialmente no estado |0>
scene.add(qubitTip);

// Função para atualizar o vetor do qubit e a ponta
function updateQubitVector(theta, phi) {
    const x = 1 * Math.sin(theta) * Math.cos(phi);
    const y = 1 * Math.sin(theta) * Math.sin(phi);
    const z = 1 * Math.cos(theta);

    // Atualiza a posição do vetor
    const positions = qubitVector.geometry.attributes.position.array;
    positions[3] = x;
    positions[4] = y;
    positions[5] = z;
    qubitVector.geometry.attributes.position.needsUpdate = true;

    // Atualiza a posição da ponta do vetor
    qubitTip.position.set(x, y, z);
}

// Carrega a fonte para o texto
const loader = new THREE.FontLoader();
loader.load('https://cdn.jsdelivr.net/npm/three@0.137.5/examples/fonts/helvetiker_regular.typeface.json', function(font) {
    
    // Adiciona o texto |0> no polo norte
    const textGeometry0 = new THREE.TextGeometry('|0>', {
        font: font,
        size: 0.1,
        height: 0.01,
    });
    const textMaterial0 = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const textMesh0 = new THREE.Mesh(textGeometry0, textMaterial0);
    textMesh0.position.set(0, 1.1, 0);  // Polo norte (cima)
    scene.add(textMesh0);

    // Adiciona o texto |1> no polo sul
    const textGeometry1 = new THREE.TextGeometry('|1>', {
        font: font,
        size: 0.1,
        height: 0.01,
    });
    const textMaterial1 = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const textMesh1 = new THREE.Mesh(textGeometry1, textMaterial1);
    textMesh1.position.set(0, -1.2, 0);  // Polo sul (baixo)
    scene.add(textMesh1);

    // Adiciona o rótulo X no eixo X
    const textGeometryX = new THREE.TextGeometry('X', {
        font: font,
        size: 0.1,
        height: 0.01,
    });
    const textMaterialX = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Vermelho para X
    const textMeshX = new THREE.Mesh(textGeometryX, textMaterialX);
    textMeshX.position.set(1.5, 0, 0);  // Posiciona no eixo X
    scene.add(textMeshX);

    // Adiciona o rótulo Y no eixo Y
    const textGeometryY = new THREE.TextGeometry('Y', {
        font: font,
        size: 0.1,
        height: 0.01,
    });
    const textMaterialY = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Verde para Y
    const textMeshY = new THREE.Mesh(textGeometryY, textMaterialY);
    textMeshY.position.set(0, 1.5, 0);  // Posiciona no eixo Y
    scene.add(textMeshY);

    // Adiciona o rótulo Z no eixo Z
    const textGeometryZ = new THREE.TextGeometry('Z', {
        font: font,
        size: 0.1,
        height: 0.01,
    });
    const textMaterialZ = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // Azul para Z
    const textMeshZ = new THREE.Mesh(textGeometryZ, textMaterialZ);
    textMeshZ.position.set(0, 0, 1.5);  // Posiciona no eixo Z
    scene.add(textMeshZ);
});

// Criação dos eixos X, Y e Z com tamanho menor
const axesHelper = new THREE.AxesHelper(1.5);
scene.add(axesHelper);

// Ângulos iniciais do vetor do qubit
let theta = Math.PI / 2;  // Posição inicial no equador
let phi = 0;  // Inicialmente alinhado com o eixo x

// Função de animação
function animate() {
    requestAnimationFrame(animate);

    // Atualiza os controles orbitais
    controls.update();

    // Renderiza a cena
    renderer.render(scene, camera);
}

// Inicializa a animação
animate();

// Atualiza o vetor do qubit após 2 segundos
setTimeout(() => {
    theta = Math.PI / 3;  // Muda o ângulo theta
    phi = Math.PI / 4;    // Muda o ângulo phi
    updateQubitVector(theta, phi);
}, 2000);
