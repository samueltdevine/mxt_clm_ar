giimport * as THREE from "three";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";

const container = document.querySelector("#container");
container.addEventListener("targetFound", (event) => {
  console.log("target found");
});

const mindarThree = new MindARThree({
  container: document.querySelector("#container"),
  imageTargetSrc: "/cover.mind",
  filterBeta: 0.001,
  filterMinCF: 0.00005,
  missTolerance: 10,
  uiScanning: "no",
});
console.log(mindarThree);

function degToRad(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

const { renderer, scene, camera } = mindarThree;

scene.backgroundIntensity = 0;
const anchor = mindarThree.addAnchor(0);
const anchors = mindarThree.anchors;
console.log("anchors", anchors);
anchors[0].onTargetFound = () => {
  console.log("found");
  renderer.setClearColor(0x272727, 0.95);
  // background.backgroundIntensity = 0.01;
};
anchors[0].onTargetLost = () => {
  console.log("lost");
  renderer.setClearColor(0x272727, 0.0);
};

// // detect target lost
// target.addEventListener("onTargetLost", (event) => {
//   console.log("target lost");
// });
const geometry = new THREE.PlaneGeometry(1, 0.55);

const material = new THREE.MeshBasicMaterial({
  color: 0x272727,
  transparent: false,
  opacity: 0.2,
});
const plane = new THREE.Mesh(geometry, material);
geometry.translate(0, 0, 0);

const videos = [];

const idToVideoMat = (id) => {
  const video = document.getElementById(id);
  videos.push(video);
  const texture = new THREE.VideoTexture(video);
  texture.format = THREE.RGBAFormat;
  const materialVideo = new THREE.MeshBasicMaterial({
    map: texture,
    alphaMap: texture,
    transparent: true,
    opacity: 100,
  });
  return materialVideo;
};

const rotBack = degToRad(33);

const coverGroup = new THREE.Group();

const geoYellow = new THREE.PlaneGeometry(7.0, 6.72);
const yellowMat = idToVideoMat("videoYellow");
const planeYellow = new THREE.Mesh(geoYellow, yellowMat);
geoYellow.translate(-3, 2, 2);
geoYellow.rotateX(rotBack);
geoYellow.scale(1 / 14, 1 / 14, 1 / 14);
coverGroup.add(planeYellow);

const geoPink = new THREE.PlaneGeometry(7.0, 6.72);
const pinkMat = idToVideoMat("videoPink");
const planePink = new THREE.Mesh(geoPink, pinkMat);
geoPink.translate(-3, 2, 1);
geoPink.rotateX(rotBack);
geoPink.scale(1 / 14, 1 / 14, 1 / 14);
coverGroup.add(planePink);

const geoOrange = new THREE.PlaneGeometry(7.0, 6.72);
const orangeMat = idToVideoMat("videoOrange");
const planeOrange = new THREE.Mesh(geoOrange, orangeMat);
geoOrange.translate(3.5, 2, 2);
geoOrange.rotateX(rotBack);
geoOrange.scale(1 / 14, 1 / 14, 1 / 14);
coverGroup.add(planeOrange);

const geoGreen = new THREE.PlaneGeometry(7.0, 6.72);
const greenMat = idToVideoMat("videoGreen");
const planeGreen = new THREE.Mesh(geoGreen, greenMat);
geoGreen.translate(1, 1, 3);
geoGreen.rotateX(rotBack);
geoGreen.scale(1 / 14, 1 / 14, 1 / 14);
coverGroup.add(planeGreen);

videos.forEach((video) => video.play());
coverGroup.translateY(-0.1);
anchor.group.add(coverGroup);

const start = async () => {
  const header = document.getElementById("header");
  header.style.display = "none";
  const container = document.querySelector("#container");
  container.style.display = "block";
  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
};

const startButton = document.querySelector("#startButton");
startButton.addEventListener("click", () => {
  start();
});

stopButton.addEventListener("click", () => {
  mindarThree.stop();
  mindarThree.renderer.setAnimationLoop(null);
});
