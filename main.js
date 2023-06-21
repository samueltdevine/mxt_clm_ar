import * as THREE from "three";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";
const mindarThree = new MindARThree({
  container: document.querySelector("#container"),
  imageTargetSrc: "/cover.mind",
});

function degToRad(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

const { renderer, scene, camera } = mindarThree;
const anchor = mindarThree.addAnchor(0);
const geometry = new THREE.PlaneGeometry(1, 0.55);

const material = new THREE.MeshBasicMaterial({
  color: 0x272727,
  transparent: false,
  opacity: 0.2,
});
const plane = new THREE.Mesh(geometry, material);
geometry.translate(0, 0, 0);

const geoYellow = new THREE.PlaneGeometry(7.0, 6.72);

const videoYellow = document.getElementById("videoYellow");
videoYellow.play();
const textureYellow = new THREE.VideoTexture(videoYellow);
textureYellow.format = THREE.RGBAFormat;

// const videoYellowAlpha = document.getElementById("videoYellowAlpha");

// const textureYellowAlpha = new THREE.VideoTexture(videoYellowAlpha);
// textureYellowAlpha.format = THREE.RGBAFormat;

// videoYellow.muted = true;

// videoYellowAlpha.muted = true;

const materialYellow = new THREE.MeshBasicMaterial({
  map: textureYellow,
  alphaMap: textureYellow,
  // color: 0x00ff00,
  transparent: true,
  opacity: 90,
});
const planeYellow = new THREE.Mesh(geoYellow, materialYellow);
geoYellow.translate(-3, 2, 2);
geoYellow.rotateX(degToRad(45));
geoYellow.scale(1 / 14, 1 / 14, 1 / 14);

anchor.group.add(planeYellow);
// anchor.group.add(plane);
// videoYellowAlpha.play();
// videoYellow.play();

const start = async () => {
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
