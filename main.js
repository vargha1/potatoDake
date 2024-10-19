import * as T from "three";
import gsap from "gsap";
import { CSS2DObject, OrbitControls, Reflector, TextGeometry, FontLoader } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';;
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { TextureLoader } from "three";
import { VideoTexture } from "three";
import HelvetikerFont from "three/examples/fonts/helvetiker_regular.typeface.json";
import RajdHani from "./RajdHani.json"

let isOpen = true;
const fontLoader = new FontLoader()
const font = fontLoader.parse(HelvetikerFont)
const font2 = fontLoader.parse(RajdHani)
const textGeometry = new TextGeometry('BACK', {
  font: font,
  size: 0.6,
  depth: 0.2,
});
textGeometry.computeBoundingBox();
const textMat = new T.MeshStandardMaterial({ color: 0xffff00 })
const textMesh = new T.Mesh(textGeometry, textMat)
textMesh.name = "back2"
textMesh.rotateY(30.34)
textMesh.rotateX(31.8)
textMesh.rotateZ(0.2)

document.getElementById("video").play()
const video = new VideoTexture(document.getElementById("video"))
const audio = document.getElementById("audio");
var click = new Audio('Sounds/click.mp3');
var whoosh = new Audio("Sounds/whoosh.mp3")
var ding = new Audio("Sounds/ding.mp3")
const darkMaterial = new T.MeshBasicMaterial({ color: 'black' });
const materials = {};
const scene = new T.Scene();
const camera = new T.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)

const loadingManager = new T.LoadingManager()

loadingManager.onProgress = (url, loaded, total) => {
  document.querySelector("progress").value = (loaded / total) * 100;
}

loadingManager.onLoad = () => {
  document.querySelector("#loadingScreen").classList.add("hidden")
}

const loader = new GLTFLoader(loadingManager).setPath("./model/");
const loader2 = new TextureLoader()

const renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
// const renderer2 = new CSS2DRenderer();
// renderer2.domElement.style.position = "absolute";
// renderer2.domElement.style.top = "0px";
const div = document.createElement('div')
div.style
//TODO: Fix the popup problem
div.innerHTML = `
  <div class="flex absolute inset-[20%] bg-white z-[22] opacity-0" id="popframe">
        <div class="flex flex-col w-1/2 p-5">
            <h3 class="text-[13px]">Get in Touch with PotatoHut</h3>
            <p class="my-5 text-[11px] w-[80%]">We would love to hear from you! If you have any questions, collaboration
                opportunities, or
                simply want to
                learn more
                about Potato Hut LTD and our projects, feel free to reach out to us.</p>
            <p class="mb-5 text-[11px] w-[80%]">Our team is here to provide you with all the information you need.
                Connect with
                us through the provided contact
                information or use the contact form to send us a message. We look forward to connecting with you and
                exploring the
                possibilities together.</p>
            <a href="mailto:info@potatohut.com" class="text-yellow-400 text-[13px] mb-5">info@potatohut.com</a>
            <p class="mb-5 text-[11px] w-[80%]">Head office: MENA Region: No. 607 & 608 City Avenue Building 8th St,
                Opposite Deira City Center, P.O.Box: 13132 Dubai,
                United Arab Emirates, Telephone No. +971 50 658 0990</p>
            <p class="mb-5 text-[11px] w-[80%]">UK & Europe: Perfect Link International, Suite 304, Solar House, 915
                High Rd, London N12 8QJ. Mobile: +44 (0) 7407722225</p>
        </div>
        <form action="post" class="flex flex-col mt-8 px-5 text-[15px] w-1/2">
            <label class="py-2 ms-5" for="name">Name</label>
            <input type="text" name="name" class="px-2 py-1 border-zinc-500 border-2 text-black" id="name">
            <label class="py-2 ms-5" for="email">Email</label>
            <input type="email" name="email" class="px-2 py-1 border-zinc-500 border-2 text-black" id="email">
            <label class="py-2 ms-5" for="subject">Subject</label>
            <input type="text" name="subject" class="px-2 py-1 border-zinc-500 border-2 text-black" id="subject">
            <label class="py-2 ms-5" for="message">Message</label>
            <textarea name="message" class="px-2 py-1 border-zinc-500 border-2 text-black" id="message"></textarea>
            <button type="submit" class="w-1/6 text-black bg-white mt-4">Send</button>
        </form>
    </div>
`
// div.innerHTML = `<div class=""></div>`
const css2DObject = new CSS2DObject(div)
// const css3DObject2 = new CSS3DObject(blackDiv)
// css3DObject.scale.set(0.00470, 0.00505, 1)
// css3DObject.position.set(-8, 26.25, -3.7)
// css3DObject.lookAt(-172, 16.3, 0)
// css3DObject.updateMatrixWorld()
// css3DObject2.scale.set(0.00470, 0.00505, 1)
// css3DObject2.position.set(-7.7, 26.25, -3.7)
// css3DObject2.lookAt(-172, 16.3, 0)
// css3DObject2.updateMatrixWorld()
// if (detectDeviceType() == "Mobile") {
//   div.style.width = "2060px"
//   div.style.height = "800px"
//   blackDiv.style.width = "2060px"
//   blackDiv.style.height = "800px"
//   css3DObject.position.set(-8, 26.25, -1)
//   css3DObject.position.set(-7.7, 26.25, -1)
// }
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
// renderer.toneMapping = T.CineonToneMapping
// renderer.toneMappingExposure = 1.5
// renderer.outputColorSpace = T.SRGBColorSpace
renderer.domElement.classList.add("absolute")
// renderer2.domElement.classList.add("z-[4]")
// renderer2.domElement.classList.add("absolute")
// renderer2.domElement.style.pointerEvents = "none";
// renderer2.domElement.classList.add("top-0")
// renderer2.domElement.classList.add("w-[1000px]")
// renderer2.domElement.classList.add("h-[500px]")
// renderer2.setSize(window.innerWidth, window.innerHeight)
const textGeometry2 = new TextGeometry('Design By Almubdieuntech.', {
  font: font2,
  size: 0.75,
  depth: 0.2,
});

textGeometry2.computeBoundingBox();
const textMat2 = new T.MeshStandardMaterial({ color: 0xffff00 })
const textMesh2 = new T.Mesh(textGeometry2, textMat2)
textMesh2.name = "back3"
textMesh2.position.set(-7, 1.4, -10)
textMesh2.lookAt(-20.3, 1.4, -18)
scene.add(textMesh2)

camera.position.set(-35, 45, -60)

document.addEventListener("DOMContentLoaded", () => {
  window.start = () => {
    audio.setAttribute('src', "CityCrowd.mp3")
    audio.play()
    document.querySelector("#startSection").classList.add("hidden")
    gsap.to(camera.position, {
      x: -18,
      y: 5,
      z: 45,
      duration: 1.4,
      ease: "none",
      onUpdate: function () {
        controls.target = new T.Vector3(0, 13, 0)
        controls.update()
      },
    },)
    document.getElementById("canvasHolder").appendChild(renderer.domElement);
    // document.getElementById('canvasHolder').appendChild(renderer2.domElement);
    click.play()
    whoosh.play()
    window.setTimeout(() => { ding.play() }, 1000)


    // window.setInterval(() => {
    //   scene.traverseVisible(obj => {
    //     if (obj.name == "rain") {
    //       gsap.to(obj.position, {
    //         y: 0,
    //         duration: 2,
    //         ease: "none",
    //       })
    //     }
    //   })
    //   scene.traverseVisible(obj => {
    //     if (obj.name == "rain") {
    //       const [y] = Array(1).fill().map(() => T.MathUtils.randFloatSpread(45))
    //       obj.position.y = 40 + y
    //     }
    //   })
    // }, 2005);
  }
})

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  bloomComposer.setSize(window.innerWidth, window.innerHeight);
});

loader.load("dake01.gltf", function VR(gltf) {
  var mesh = gltf.scene;
  console.log(mesh);
  mesh.position.set(0, 1, 0);
  const planeGeo = new T.PlaneGeometry(250, 250)
  const reflector = new Reflector(planeGeo, {
    clipBias: 0.003,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color: 0x777777
  });

  const transparentMaterial = new T.MeshStandardMaterial({
    color: 0x777777,
    transparent: true,
    opacity: 0.97
  });
  const transparentPlane = new T.Mesh(geometry, transparentMaterial);
  transparentPlane.position.y = 1.02;  // Slightly above the reflective surface
  // scene.add(transparentPlane);
  reflector.position.y = 0
  reflector.rotation.x = - Math.PI / 2;
  scene.add(reflector);
  // mesh.children[0].children[0].traverseVisible((obj) => {
  //   obj.layers.set(0)
  // })
  // const object1 = mesh.children[0].children[0].getObjectByName("M_Dake974PIV");
  // const object2 = mesh.children[0].children[0].getObjectByName("D09PIV")
  // const object3 = mesh.children[0].children[0].getObjectByName("D05PIV")
  // const object4 = mesh.children[0].children[0].getObjectByName("D06PIV")
  // const object5 = mesh.children[0].children[0].getObjectByName("D07PIV")
  // mesh.children[0].children[0].getObjectByName("M_Dake13").position.y = 0.01;
  // mesh.children[0].children[0].getObjectByName("M_Dake13").material.transparent = true;
  // mesh.children[0].children[0].getObjectByName("M_Dake13").material.opacity = 0.90;
  // mesh.children[0].children[0].getObjectByName("M_Dake990PIV").position.y = 0.05
  // object1.material = [
  //   new T.MeshStandardMaterial({ color: 0xffffff }),
  //   new T.MeshStandardMaterial({ color: 0xffffff }),
  //   new T.MeshStandardMaterial({ color: 0xffffff }),
  //   new T.MeshStandardMaterial({ color: 0xffffff }),
  //   new T.MeshStandardMaterial({ map: new TextureLoader().load("images/vendingMachineMenu.png") }),
  //   new T.MeshStandardMaterial({ color: 0xffffff }),
  // ]
  // console.log(object1);

  // const geo5 = object1.geometry;
  // const posAtr = geo5.attributes.position;
  // const positions = posAtr.array; // Directly access the array
  // const vertices = [];

  // for (let i = 0; i < posAtr.count; i++) {
  //   vertices.push({
  //     x: posAtr.getX(i),
  //     y: posAtr.getY(i),
  //     z: posAtr.getZ(i)
  //   });
  // }

  // const pointGeometry = new T.BufferGeometry();
  // pointGeometry.setAttribute('position', new T.Float32BufferAttribute(positions, 3));
  // const pointMaterial = new T.PointsMaterial({ color: 0x00ffff, size: 0.05 });
  // const points = new T.Points(pointGeometry, pointMaterial);
  // points.position.set(3.2, 6, -11.7)
  // points.layers.toggle(BLOOM_SCENE)
  // points.name = "points"
  // scene.add(points);

  // if (object2) {
  //   new TextureLoader().load("images/BSOD.png", (texture) => {
  //     // تنظیمات تکسچر
  //     texture.encoding = T.sRGBEncoding;
  //     texture.flipY = false;  // ممکن است نیاز باشد این را تغییر دهید

  //     // تنظیم wrapping و filtering
  //     texture.wrapS = texture.wrapT = T.ClampToEdgeWrapping;
  //     texture.minFilter = T.LinearFilter;
  //     texture.magFilter = T.LinearFilter;
  //     texture.repeat.set(15, 10);
  //     texture.wrapS = 1000;
  //     texture.wrapT = 1000;
  //     texture.offset.set(0.35, -0.05);
  //     // texture.rotation = 0;
  //     // ایجاد متریال جدید
  //     const material2 = new T.MeshStandardMaterial({
  //       map: texture,
  //     });

  //     // اعمال متریال به آبجکت
  //     object2.material = material2;
  //     object2.material.needsUpdate = true;
  //     object2.material.toneMapped = true;
  //     // بررسی UV mapping
  //     if (!object2.geometry.attributes.uv) {
  //       console.warn("No UV mapping found on the object. Texture may not display correctly.");
  //     } else {
  //       // اگر نیاز به تنظیم UV باشد، می‌توانید اینجا انجام دهید
  //       // object2.geometry.attributes.uv.needsUpdate = true;
  //     }

  //     // درخواست رندر مجدد صحنه (اگر نیاز است)
  //     if (renderer && scene && camera) {
  //       renderer.render(scene, camera);
  //     }
  //   });
  // }
  // if (object3) {
  //   // اعمال متریال به آبجکت
  //   object3.material = new T.MeshStandardMaterial({ map: video });
  //   object3.material.map.repeat.set(20, 15);
  //   object3.material.map.wrapS = 1000;
  //   object3.material.map.wrapT = 1002;
  //   // object3.material.needsUpdate = true;
  //   object3.material.toneMapped = false;
  //   // بررسی UV mapping
  //   if (!object3.geometry.attributes.uv) {
  //     console.warn("No UV mapping found on the object. Texture may not display correctly.");
  //   } else {
  //     // اگر نیاز به تنظیم UV باشد، می‌توانید اینجا انجام دهید
  //     // object3.geometry.attributes.uv.needsUpdate = true;
  //   }

  //   // درخواست رندر مجدد صحنه (اگر نیاز است)
  // }
  // if (object4) {
  //   // اعمال متریال به آبجکت
  //   object4.material = new T.MeshStandardMaterial({ map: video });
  //   object4.material.map.repeat.set(20, 15);
  //   object4.material.map.wrapS = 1000;
  //   object4.material.map.wrapT = 1002;
  //   // object4.material.needsUpdate = true;
  //   object4.material.toneMapped = false;
  //   // بررسی UV mapping
  //   if (!object4.geometry.attributes.uv) {
  //     console.warn("No UV mapping found on the object. Texture may not display correctly.");
  //   } else {
  //     // اگر نیاز به تنظیم UV باشد، می‌توانید اینجا انجام دهید
  //     // object4.geometry.attributes.uv.needsUpdate = true;
  //   }

  //   // درخواست رندر مجدد صحنه (اگر نیاز است)
  // }
  // if (object5) {
  //   // اعمال متریال به آبجکت
  //   object5.material = new T.MeshStandardMaterial({ map: video });
  //   object5.material.map.repeat.set(20, 15);
  //   object5.material.map.wrapS = 1000;
  //   object5.material.map.wrapT = 1002;
  //   // object5.material.needsUpdate = true;
  //   object5.material.toneMapped = false;
  //   // بررسی UV mapping
  //   if (!object5.geometry.attributes.uv) {
  //     console.warn("No UV mapping found on the object. Texture may not display correctly.");
  //   } else {
  //     // اگر نیاز به تنظیم UV باشد، می‌توانید اینجا انجام دهید
  //     // object5.geometry.attributes.uv.needsUpdate = true;
  //   }

  //   // درخواست رندر مجدد صحنه (اگر نیاز است)
  // }
  // if (object5) {
  //   // اعمال متریال به آبجکت
  //   object5.material = new T.MeshStandardMaterial({ map: video });
  //   object5.material.map.repeat.set(20, 15);
  //   object5.material.map.wrapS = 1000;
  //   object5.material.map.wrapT = 1002;
  //   // object5.material.needsUpdate = true;
  //   object5.material.toneMapped = false;
  //   // بررسی UV mapping
  //   if (!object5.geometry.attributes.uv) {
  //     console.warn("No UV mapping found on the object. Texture may not display correctly.");
  //   } else {
  //     // اگر نیاز به تنظیم UV باشد، می‌توانید اینجا انجام دهید
  //     // object5.geometry.attributes.uv.needsUpdate = true;
  //   }

  //   // درخواست رندر مجدد صحنه (اگر نیاز است)
  // }

  // loader2.load("./images/Monitor_01.png", function (texture) {
  //   texture.wrapS = T.RepeatWrapping;
  //   texture.repeat.x = 1;
  //   texture.flipY = false;
  //   mesh.children[0].children[0].getObjectByName("D11PIV").material.map = texture;
  // })
  // loader2.load("./images/Monitor_011.png", function (texture) {
  //   texture.wrapS = T.RepeatWrapping;
  //   texture.repeat.x = 1;
  //   texture.flipY = false;
  //   mesh.children[0].children[0].getObjectByName("D02PIV").material.map = texture;
  // })

  // mesh.children[0].children[0].getObjectByName("M_Dake6PIV").layers.toggle(BLOOM_SCENE)
  // mesh.children[0].children[0].getObjectByName("D09PIV").layers.toggle(BLOOM_SCENE)
  // mesh.children[0].children[0].getObjectByName("M_Dake16PIV").layers.toggle(BLOOM_SCENE)
  // mesh.children[0].children[0].getObjectByName("M_Dake15PIV").layers.toggle(BLOOM_SCENE)
  // mesh.children[0].children[0].getObjectByName("M_Dake12PIV").layers.toggle(BLOOM_SCENE)
  // mesh.children[0].children[0].getObjectByName("M_Dake984PIV").layers.toggle(BLOOM_SCENE)
  // mesh.children[0].children[0].getObjectByName("M_Dake991PIV").layers.toggle(BLOOM_SCENE)
  // mesh.children[0].children[0].getObjectByName("M_Dake1005PIV").layers.toggle(BLOOM_SCENE)
  // mesh.children[0].children[0].getObjectByName("M_Dake1031PIV").layers.toggle(BLOOM_SCENE)
  scene.add(mesh)
})

loader.setPath("./mars/")

// loader.load("scene.gltf", function (gltf) {
//   const mesh = gltf.scene;
//   mesh.position.set(-25, 70, 25)
//   scene.add(mesh)
// })

const cube = new T.Mesh(new T.BoxGeometry(1.3, 0.7, 0.1), new T.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0 }))
cube.position.set(13.7, 5, -0.8)
cube.lookAt(0, 5, -25)
cube.name = "back"
scene.add(cube)

const geo5 = new T.BoxGeometry(1, 1.6, 0.15)
const material4 = new T.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0 })
const cube1 = new T.Mesh(geo5, material4)
const cube2 = new T.Mesh(geo5, material4)
const cube3 = new T.Mesh(geo5, material4)
const cube4 = new T.Mesh(geo5, material4)
const cube5 = new T.Mesh(geo5, material4)
const cube6 = new T.Mesh(geo5, material4)
cube1.position.set(13.06, 8.2, -0.7)
cube1.rotation.y = 0.6
cube1.name = "veggie"
cube2.position.set(14, 8.2, -1.3)
cube2.rotation.y = 0.6
cube2.name = "sausage"
cube3.position.set(14.92, 8.2, -2.1)
cube3.rotation.y = 0.6
cube3.name = "chickenBBQ"
cube4.position.set(13.06, 6.39, -0.7)
cube4.rotation.y = 0.6
cube4.name = "beef"
cube5.position.set(14, 6.39, -1.3)
cube5.rotation.y = 0.6
cube5.name = "yogu"
cube6.position.set(14.95, 6.37, -2.1)
cube6.rotation.y = 0.6
cube6.name = "fajitas"

scene.add(cube1)
scene.add(cube2)
scene.add(cube3)
scene.add(cube4)
scene.add(cube5)
scene.add(cube6)

const BLOOM_SCENE = 1;
const bloomLayer = new T.Layers();
bloomLayer.set(BLOOM_SCENE);

const renderScene = new RenderPass(scene, camera);
const outputPass = new OutputPass();

const bloomPass = new UnrealBloomPass(new T.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = 0
bloomPass.strength = 0.5
bloomPass.radius = 0.2

const bloomComposer = new EffectComposer(renderer);
bloomComposer.renderToScreen = false;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

const mixPass = new ShaderPass(
  new T.ShaderMaterial({
    uniforms: {
      baseTexture: { value: null },
      bloomTexture: { value: bloomComposer.renderTarget2.texture }
    },
    vertexShader: document.getElementById('vertexshader').textContent,
    fragmentShader: document.getElementById('fragmentshader').textContent,
  }), 'baseTexture'
);
mixPass.needsSwap = true;

const finalComposer = new EffectComposer(renderer);
finalComposer.addPass(renderScene);
finalComposer.addPass(mixPass);
finalComposer.addPass(outputPass);

const controls = new OrbitControls(camera, renderer.domElement)
controls.enablePan = false
controls.minPolarAngle = 1.1;
controls.maxPolarAngle = 1.73;
controls.minDistance = 0;
controls.maxDistance = 60;
controls.rotateSpeed = 0.5;
controls.update()

const geometry = new T.BoxGeometry(5, 5, 5);
const material = new T.MeshStandardMaterial({ color: 0xffff00 });
const baseCube = new T.Mesh(geometry, material);
baseCube.receiveShadow = true
baseCube.position.set(15, 5, 10)
// baseCube.name = "start"
// addBloomObj(baseCube)

const geo2 = new T.BoxGeometry(1, 1, 1)
const material2 = new T.MeshStandardMaterial({ color: 0xffffff });
let firstLayer = [{ name: "next", color: 0x000000 }, { name: "previous", color: 0x000000 }, { name: "", color: 0x000000 }, { name: "", color: 0x000000 }]
let secondLayer = [{ name: "start", color: 0x00FF00 }, { name: "stop", color: 0xFF0000 }, { name: "forward", color: 0x00FFFF }, { name: "rewind", color: 0xFFA500 }]

for (let i = 0; i < 2; i++) {
  let space = 0.3
  for (let j = 0; j < 4; j++) {
    let cube = new T.Mesh(geo2, material2);
    cube = new T.Mesh(geo2, cube.material.clone())
    cube.position.set(0, 5, j + 27 + space)
    cube.name = firstLayer[j].name
    cube.material.color.set(firstLayer[j].color)
    space += 0.3
    if (i >= 1) {
      cube.position.set(0, 7.2, j + 27 + space - 0.3)
      cube.name = secondLayer[j].name
      cube.material.color.set(secondLayer[j].color)
    }
    // scene.add(cube)
  }
}

const videoTexture = new T.VideoTexture(document.getElementById("video"))
videoTexture.needsUpdate = true;
const material3 = new T.MeshStandardMaterial({ color: 0xffffff, map: videoTexture, side: T.FrontSide, toneMapped: false });
material3.needsUpdate = true;
const geo3 = new T.BoxGeometry(1, 4, 4.9)
const geo4 = new T.BoxGeometry(0.8, 4.3, 5.2)
const bigCube = new T.Mesh(geo3, [
  new T.MeshStandardMaterial({ color: 0xffffff }),
  material3,
  new T.MeshStandardMaterial({ color: 0xffffff }),
  new T.MeshStandardMaterial({ color: 0xffffff }),
  new T.MeshStandardMaterial({ color: 0xffffff }),
  new T.MeshStandardMaterial({ color: 0xffffff }),
]);

const bigCube2 = new T.Mesh(geo4, material);
bigCube.position.set(0, 5, 29.25)
bigCube2.position.set(0, 5, 29.25)
// scene.add(bigCube)
// scene.add(bigCube2)
// scene2.add(bigCube)
// scene2.add(bigCube2)

const ambientLight = new T.AmbientLight(0xffffff, 0.2)
// scene.add(ambientLight)
// const pl1 = new T.PointLight(0xffff, 9000);
// pl1.position.set(0, 20, 80)
// pl1.castShadow = true
// scene.add(pl1);
const spl1 = new T.SpotLight(0xffff00, 10000, 85, Math.PI + 0.1, 10, 1.8)
const spl2 = new T.SpotLight(0xff00ff, 10000, 85, Math.PI + 0.1, 10, 1.8)
const spl3 = new T.SpotLight(0xffff00, 10000, 85, Math.PI + 0.1, 10, 1.8)
spl1.position.set(25, 65, 10)
spl1.target.position.set(25, -2, 10)
spl2.position.set(15, 65, -15)
spl2.target.position.set(15, -2, -15)
spl3.position.set(1, 65, 7)
spl3.target.position.set(1, -2, 7)
scene.add(spl1);
scene.add(spl2);
scene.add(spl3);

// // const pl2Helper = new T.PointLightHelper(pl2, 1);
// scene.add(pl2Helper)
const pl3 = new T.PointLight(0xffff00, 1000);
pl3.position.set(-20, 18, 0)
pl3.castShadow = true
scene.add(pl3);
// const pl4 = new T.PointLight(0xffffff, 5000);
// pl4.position.set(0, 10, -80)
// pl4.castShadow = true
// scene.add(pl4);
// const pl5 = new T.PointLight(0xffffff, 5000);
// pl5.position.set(-80, 10, 0)
// pl5.castShadow = true
// scene.add(pl5);
// const pl6 = new T.PointLight(0xffff, 100);
// pl6.position.set(4, 7.5, 5.5)
// pl6.castShadow = true
// scene.add(pl6);
const dl1 = new T.DirectionalLight(0xffffff, 1.5)
dl1.castShadow = true
camera.add(dl1)
scene.add(camera)
// const dl2 = new T.DirectionalLight(0xffffff, 10)
// dl2.position.set(0, 25, 0)
// dl2.castShadow = true
// scene.add(dl2)

const raycaster = new T.Raycaster()

window.addEventListener('pointerdown', onMouseDown)

function onMouseDown(event) {
  camera.updateProjectionMatrix()
  controls.update()
  const coords = new T.Vector2(
    (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
    -((event.clientY / renderer.domElement.clientHeight) * 2 - 1),
  )
  raycaster.setFromCamera(coords, camera)

  let intersections = raycaster.intersectObjects(scene.children, true);
  if (intersections.length > 0) {
    console.log(intersections[0].object);
    if (intersections[0].object.name == "M_Dake6721PIV") {
      click.play()
      whoosh.play()
      gsap.to(camera.position, {
        x: 17.6,
        y: 5.7,
        z: 3.57,
        duration: 1.4,
        ease: "none",
        onUpdate: function () {
          controls.target = new T.Vector3(3, 6.5, -17)
          controls.update()
        },
      })
      controls.enabled = false;
    }
    if (intersections[0].object.name == "aboutPIV") {
      click.play()
      whoosh.play()
      if (detectDeviceType == "Mobile") {
        return
      } else {
        gsap.to(camera.position, {
          x: 16,
          y: 40,
          z: 36,
          duration: 1.4,
          ease: "none",
          onUpdate: function () {
            controls.target = new T.Vector3(0, 3, 0)
            controls.update()
          },
        })
        controls.maxPolarAngle = 1.5
      }
    }
    if (intersections[0].object.name == "back") {
      click.play()
      whoosh.play()
      gsap.to(camera.position, {
        x: -18,
        y: 5,
        z: 45,
        duration: 1.4,
        ease: "none",
        onUpdate: function () {
          controls.target = new T.Vector3(0, 13, 0)
          controls.update()
        },
      })
      controls.enabled = true;
    }
    if (intersections[0].object.name == "franchisingPIV") {
      if (detectDeviceType() == "Desktop") {
        click.play()
        whoosh.play()
        // css3DObject.scale(0.00470, 0.00505, 1)
        // css3DObject2.scale(0.00470, 0.00505, 1)
        textMesh.position.set(-8, 29, -8.6);
        scene.add(textMesh);
        gsap.to(camera.position, {
          x: -15.3,
          y: 26.3,
          z: -3.7,
          duration: 1.4,
          ease: "none",
          onUpdate: function () {
            controls.target = new T.Vector3(0, 26.3, -3.7)
            controls.update()
          },
        })
        controls.enabled = false;
      } else {

        click.play()
        whoosh.play()
        textMesh.position.set(-8, 29, -8.6);
        scene.add(textMesh);
        gsap.to(camera.position, {
          x: -21.3,
          y: 26.3,
          z: -3.7,
          duration: 1.4,
          ease: "none",
          onUpdate: function () {
            controls.target = new T.Vector3(0, 26.3, -3.7)
            controls.update()
          },
        })
        controls.enabled = true;
      }
    }
    if (intersections[0].object.name == "back2") {
      click.play()
      whoosh.play()
      scene.remove(textMesh);
      gsap.to(camera.position, {
        x: -18,
        y: 5,
        z: 45,
        duration: 1.4,
        ease: "none",
        onUpdate: function () {
          controls.target = new T.Vector3(0, 13, 0)
          controls.update()
        },
      })
      controls.enabled = true;
    }
    if (intersections[0].object.name == "D11PIV" && isOpen) {
      click.play()
      document.getElementById("cover").classList.remove("hidden")
      document.getElementById("wrapper").classList.remove("hidden")
      document.getElementById("popframe").classList.remove("invisible")
      document.getElementById("popframe").classList.remove("opacity-0")
      document.getElementById("popframe").classList.remove("-mt-[100%]")
      controls.enabled = true;
      isOpen = false;
    }
    if (intersections[0].object.name == "points") {
      const geo5 = intersections[0].object.geometry;
      const posAtr = geo5.attributes.position;
      const positions = posAtr.array; // Directly access the array
      const vertices = [];

      for (let i = 0; i < posAtr.count; i++) {
        vertices.push({
          x: posAtr.getX(i),
          y: posAtr.getY(i),
          z: posAtr.getZ(i)
        });
      }
      vertices.forEach((vertex, i) => {
        const originalY = vertex.y;
        const originalZ = vertex.z

        gsap.to(vertex, {
          duration: 1.4,
          y: 15.5, // animate to a new random y position
          z: Math.random() * 2 + 11,
          yoyo: true, // animate back to the original position
          onUpdate: () => {
            // Update the positions in the geometry
            positions[i * 3 + 2] = vertex.z;
            positions[i * 3 + 1] = vertex.y;
            geo5.attributes.position.needsUpdate = true;
          }
        });
        gsap.to(vertex, {
          duration: 1.4,
          y: originalY, // animate to a new random y position
          z: originalZ,
          yoyo: true, // animate back to the original position
          delay: 1.4,
          onUpdate: () => {
            // Update the y position in the geometry
            positions[i * 3 + 2] = vertex.z;
            positions[i * 3 + 1] = vertex.y;
            geo5.attributes.position.needsUpdate = true;
          }
        });
      });

      controls.enabled = true;
      isOpen = false;
    }
    function handleImgs(src) {
      for (let i = 0; i < document.getElementById("imgFrame").children.length; i++) {
        document.getElementById("imgFrame").children.item(i).classList.add("hidden")
        if (document.getElementById("imgFrame").children.item(i).getAttribute("src") == src) {
          document.getElementById("imgFrame").children.item(i).classList.remove("hidden")
        }
      }
    }
    if (intersections[0].object.name == "veggie") {
      click.play()
      console.log("faasd");
      document.querySelector("#cover").classList.remove("hidden")
      document.querySelector("#wrapper2").classList.remove("invisible")
      document.querySelector("#wrapper2").classList.remove("pointer-events-none")
      handleImgs("/images/veggie_delight.png")
    }
    if (intersections[0].object.name == "sausage") {
      click.play()
      console.log("faasd");
      document.querySelector("#cover").classList.remove("hidden")
      document.querySelector("#wrapper2").classList.remove("invisible")
      document.querySelector("#wrapper2").classList.remove("pointer-events-none")
      handleImgs("/images/sausage.png")
    }
    if (intersections[0].object.name == "chickenBBQ") {
      click.play()
      console.log("faasd");
      document.querySelector("#cover").classList.remove("hidden")
      document.querySelector("#wrapper2").classList.remove("invisible")
      document.querySelector("#wrapper2").classList.remove("pointer-events-none")
      handleImgs("/images/bbq_chicken.png")
    }
    if (intersections[0].object.name == "beef") {
      click.play()
      console.log("faasd");
      document.querySelector("#cover").classList.remove("hidden")
      document.querySelector("#wrapper2").classList.remove("invisible")
      document.querySelector("#wrapper2").classList.remove("pointer-events-none")
      handleImgs("/images/steak.png")
    }
    if (intersections[0].object.name == "yogu") {
      click.play()
      console.log("faasd");
      document.querySelector("#cover").classList.remove("hidden")
      document.querySelector("#wrapper2").classList.remove("invisible")
      document.querySelector("#wrapper2").classList.remove("pointer-events-none")
      handleImgs("/images/beetroot_yogurt.png")
    }
    if (intersections[0].object.name == "fajitas") {
      click.play()
      console.log("faasd");
      document.querySelector("#cover").classList.remove("hidden")
      document.querySelector("#wrapper2").classList.remove("invisible")
      document.querySelector("#wrapper2").classList.remove("pointer-events-none")
      handleImgs("/images/chicken_fajita.png")
    }
  }
  camera.updateProjectionMatrix()
  controls.update()
}

// camera.layers.enable(0);
// camera.layers.set(0);
// maskPass1.enabled = false;
// bloomPass.enabled = false;
// maskPass2.enabled = true;
// bloomComposer.render();


window.removePopup = () => {
  document.getElementById("cover").classList.add("hidden")
  document.getElementById("wrapper").classList.add("hidden")
  document.getElementById("popframe").classList.add("invisible")
  document.getElementById("popframe").classList.add("opacity-0")
  document.getElementById("popframe").classList.add("-mt-[100%]")
  scene.remove(textMesh);
  gsap.to(camera.position, {
    x: -18,
    y: 5,
    z: 45,
    duration: 1.4,
    ease: "none",
    onUpdate: function () {
      controls.target = new T.Vector3(0, 13, 0)
      controls.update()
    },
  })
  controls.enabled = true;
  isOpen = true;
}

function detectDeviceType() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    console.log("Mobile");
    return "Mobile";
  } else return "Desktop"
}

function darkenNonBloomed(obj) {
  if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
    materials[obj.uuid] = obj.material;
    obj.material = darkMaterial;
  }
}

function restoreMaterial(obj) {
  if (materials[obj.uuid]) {
    obj.material = materials[obj.uuid];
    delete materials[obj.uuid];
  }
}

function addStars() {
  const geometry = new T.SphereGeometry(0.15, 0.15, 0.15);
  const mat = new T.MeshStandardMaterial({ color: 0xffffff })
  const starsMesh = new T.Mesh(geometry, mat)
  starsMesh.name = "rain";

  const [x, z] = Array(2).fill().map(() => T.MathUtils.randFloatSpread(400))
  const [y] = Array(1).fill().map(() => T.MathUtils.randFloatSpread(45))

  starsMesh.position.set(x, 60 + y, z);
  scene.add(starsMesh);
}

// Array(1200).fill().forEach(addStars)

scene.traverseVisible(obj => {
  if (obj.name == "rain") {
    const [y] = Array(1).fill().map(() => T.MathUtils.randFloatSpread(8))
    obj.position.y = 60 + y
  }
})

window.removeImgFrames = () =>{
  click.play()
  document.getElementById("cover").classList.add("hidden")
  document.getElementById("wrapper2").classList.add("invisible")
  document.getElementById("wrapper2").classList.add("pointer-events-none")
}


function animate() {
  // console.log(scene.children)
  requestAnimationFrame(animate);
  // console.log(camera.position);
  // const spin = scene.children[scene.children.length - 1].children[0].getObjectByName("SA_Obj29PIV")
  // spin.rotateOnAxis(new T.Vector3(1,0,0) , 1)
  controls.update()
  // renderer2.render(scene, camera)
  // camera.layers.set(0);
  // baseComposer.render();

  // // Render bloom only for the objects on layer 1
  // camera.layers.set(1);
  // bloomComposer.render();
  // camera.layers.set(0); // Reset to render all layers

  // // Combine the base scene and the bloom
  // finalComposer.passes[0].uniforms.baseTexture.value = baseComposer.renderTarget2.texture;
  // renderer.setRenderTarget(null);
  // renderer.clear();
  // finalComposer.render();

  // renderer.render(scene, camera)
  // renderer2.render(scene2, camera)

  // renderer.setRenderTarget(composer.renderTarget2);
  // renderer.render(bloomScene, camera);
  // renderer.setRenderTarget(null);

  // composer.render()

  scene.traverse(darkenNonBloomed);

  bloomComposer.render();
  scene.traverse(restoreMaterial);
  finalComposer.render();
  // camera.updateProjectionMatrix()
}
animate()