/* global Flourish */

import * as THREE from 'three';
import { generateTextureCanvas } from '../generateTextureCanvas';

function generateIntroButton(name, width, yoffset) {
  const button = new THREE.Group();
  button.name = name;
  button.userData.type = name;

  const text = generateTextureCanvas(name, 36, width, width / 4, 'bold ', false, 1, 'rgb(17, 32, 59)', 'rgba(255, 255, 255, 0)');
  text.scale.set(0.5, 0.5, 0.5);
  text.position.set(0, 0, 2);
  text.userData.type = 'text';
  button.add(text);

  const rect = new THREE.Mesh(
    new THREE.PlaneGeometry((width / 3) * 2, width / 10),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color('#FFFFFF'),
      transparent: true,
      opacity: 1.0,
    }),
  );
  rect.position.set(0, 0, 1);
  rect.userData.type = 'button';
  button.add(rect);

  button.scale.set(0.906, 0.906, 0.906);
  button.position.set(0, yoffset, 0);
  return button;
}

export function generate(state, stageSize) {
  const intro = new THREE.Group();
  intro.name = 'intro';

  const width = 512;
  const height = 384;

  const backgroundGeometry = new THREE.PlaneGeometry(width, height);
  const backgroundMaterial = new THREE.MeshBasicMaterial({
    color: state.horizonBottomColor,
    transparent: true,
    opacity: 0.75,
    depthTest: false,
  });
  intro.add(new THREE.Mesh(backgroundGeometry, backgroundMaterial));

  const rectSize = 192;
  const textureLoader = new THREE.TextureLoader();
  const imgGeometry = new THREE.PlaneGeometry(rectSize, rectSize);

  const cursor = new THREE.Group();
  const cursorMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(`${Flourish.static_prefix}/cursor.png`),
    transparent: true,
    depthTest: false,
  });
  cursor.add(new THREE.Mesh(imgGeometry, cursorMaterial));
  const cursorText = generateTextureCanvas('Position the ring cursor over a node to show it\'s connections.', 36, 512, 256, '', true);
  cursorText.scale.set(0.43, 0.43, 0.43);
  cursorText.position.set(0, -166, 0);
  cursor.add(cursorText);
  cursor.position.set(-122, 80, 1);
  intro.add(cursor);

  const fuse = new THREE.Group();
  const fuseMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(`${Flourish.static_prefix}/fuse.png`),
    transparent: true,
    depthTest: false,
  });
  fuse.add(new THREE.Mesh(imgGeometry, fuseMaterial));
  const fuseText = generateTextureCanvas('When the cursor fills, the connected nodes will be brought into view.', 36, 512, 256, '', true);
  fuseText.scale.set(0.43, 0.43, 0.43);
  fuseText.position.set(0, -166, 0);
  fuse.add(fuseText);
  fuse.position.set(122, 80, 1);
  intro.add(fuse);

  intro.add(generateIntroButton('GOT IT', 512, -152));

  intro.scale.set(0.01, 0.01, 0.01);
  intro.position.set(0, 1.5, stageSize / 4);

  return intro;
}

export default generate;
