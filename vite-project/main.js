import * as THREE from "three";
import "./style.css"
import gsap from "gsap"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Timeline } from "gsap/gsap-core";

const sizes = {
    width: innerWidth,
    height: innerHeight
}

// first we need scene 

const scene = new THREE.Scene()

// creating sphere /object / geometry

const geometry = new THREE.SphereGeometry(3, 64, 64) // here 3 is the radius & other are height & width segments

// adding material

const material = new THREE.MeshStandardMaterial({

  color: '#00ff83',
  roughness: .5,
})

// you get mesh when you combine geometry + material

const mesh = new THREE.Mesh(geometry, material);

// add mesh to scene 

scene.add(mesh);

// adding camera

const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(0,10,10)
light.intensity = 1.25
scene.add(light)

const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height)
// adding camera to scene

camera.position.z = 20



scene.add(camera);

// renderer

const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({canvas})

// controls

const controls = new OrbitControls(camera, canvas)
controls.enableDamping= true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5

// renderer size set

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

// for responsize resize

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.updateProjectionMatrix()

    camera.aspect = sizes.width / sizes.height
    renderer.setSize(sizes.width,sizes.height)

})

const loop  = () => {
  controls.update()
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop)
} 

loop()

//gsap 

const tl = gsap.timeline({defaults:{duration:1}})
tl.fromTo(mesh.scale, {x:0, y:0, z:0}, {x:1, y:1, z:1})
tl.from("nav", {y: "-100%",},{y: "0%"} )
tl.fromTo('.title', {opacity:0},{opacity: 1} )

let mouseDown = false
let rgb =[]
window.addEventListener("mousedown", () => (mouseDown = true))
window.addEventListener("mouseup", () => (mouseDown = false))

window.addEventListener("mousemove", (e) => {
  if (mouseDown) {
  rgb = [
    Math.round((e.pageX / sizes.width)*255),
    Math.round((e.pageY / sizes.height) * 255),
    150,]
  


  let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
  gsap.to(mesh.material.color, {
    r: newColor.r, 
    g: newColor.g, 
    b: newColor.b,
  
  })
  
}

})