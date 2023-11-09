import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"

const ModelViewer = () => {

    const mount = useRef(null)

    useEffect(() => {
        const canvas = mount.current;
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const scene = new THREE.Scene();
        const light = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
        const model = new THREE.Object3D();
        scene.add(light);
        scene.add(camera);
        scene.add(model);
    
        const loader = new GLTFLoader();
        loader.load('model/scene.gltf', (gltf) => {
          scene.add(gltf.scene);
          gltf.animations; // Array<THREE.AnimationClip>
          gltf.scene; // THREE.Scene
          gltf.scenes; // Array<THREE.Scene>
          gltf.cameras; // Array<THREE.Camera>
          gltf.asset; // Object
    
          const animate = () => {
            requestAnimationFrame(animate);
            model.rotation.x += 0.01;
            model.rotation.y += 0.01;
            renderer.render(scene, camera);
          };
    
          animate();
        }, undefined, (error) => {
          console.error('An error occurred:', error);
        });
    
        return () => {
          mount.current = null;
        };
     }, []);

  return (
    <canvas ref={mount} />
  )
}

export default ModelViewer
