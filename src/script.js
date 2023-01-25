import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector('canvas.webgl');
let model;

//Scene
const scene = new THREE.Scene();

//Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(2, 0, -1);
camera.lookAt(0, 0, 0);
scene.add(camera);

//Orbit controls
const controls = new OrbitControls( camera, canvas );

//ambient light
const ambientLight = new THREE.AmbientLight(0xcccccc, 0.5);
scene.add(ambientLight);

//Directional liht
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
scene.add(directionalLight);

//Models
const gltfLoader = new GLTFLoader();
gltfLoader.load('./webflow.gltf', (gltf) => 
    {
        console.log('success');
        console.log(gltf);
        model = gltf.scene.children[0];
        scene.add(gltf.scene.children[0]);
        
    },
    (progress) =>
    {
        console.log('progress')
        console.log(progress)
    },
    (error) =>
    {
        console.log('error')
        console.log(error)
    }
)

//Mesh cube
// const cubeGeometry = new THREE.BoxGeometry(100, 100, 100);
// const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x4250f7 });
// const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// scene.add(cube);

//Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

tick();

//Animation function
function tick() {
    if (model) model.rotation.y += 0.005;    
    //cube.rotation.y += 0.005;
    //cube.rotation.x += 0.005;
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
}