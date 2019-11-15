import React, { useEffect } from 'react';
import * as THREE from 'three';
import SunTexture from '../Component/textures/sun.jpg';
import MercuryTexture from '../Component/textures/mercury.jpg';
import VenusTexture from '../Component/textures/venus.jpg';
import EarthTexture from '../Component/textures/earth.jpg';
import MarsTexture from '../Component/textures/mars.jpg';
import JupiterTexture from '../Component/textures/jupiter.jpg';
import SaturnTexture from '../Component/textures/saturn.jpg';
import UranusTexture from '../Component/textures/uranus.jpg';
import NeptuneTexture from '../Component/textures/neptune.jpg';
import GalaxyStarfield from '../Component/textures/galaxy_stars.png';

const SolarSystem = (props) => {

// Initiate scene
  let Scene = new THREE.Scene();
  let Camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 5000);
  Camera.position.z = 2000;
  Camera.position.y = 1400;
  Camera.lookAt(0, 0, 0);
  let Renderer = new THREE.WebGLRenderer({antialias: true});
  let manager = new THREE.LoadingManager();
  let Loader = new THREE.TextureLoader(manager);
  let Light;
  let Mars, Mercury, Venus, Jupiter, Galaxy, Earth, Sun, Saturn, Uranus, Neptune;
  let canvasElement;
  const rEarth = 500;
  const rMars = 700;
  const rVenus = 350;
  const rMercury = 250;
  const rJupiter = 900;
  const rSaturn = 1250;
  const rUranus = 1500;
  const rNeptune = 1750;
  let theta = 0;
  const dTheta = Math.PI / 1000;
  

  useEffect(() => { //componentDidMount
    window.addEventListener('resize', handleWindowResize);
    InitBackground();
  }, []);

  manager.onProgress = (url, itemsLoaded, itemsTotal) => {
    console.log(url, itemsLoaded, itemsTotal);
  }

  manager.onLoad = () => {
    sceneAnimate();
  };

  const InitBackground = () => {

    //Injection du Renderer dans le DOM
    Renderer.setSize(window.innerWidth, window.innerHeight);
    canvasElement.appendChild(Renderer.domElement);

    // Création de la lumière de la scène
    Light = new THREE.PointLight( 0xffffff, 1);
    Light.position.set(0, 0, 0);
    Light.castShadow = true;
    Scene.add(Light);

    // Création du starfield
    Loader.load(GalaxyStarfield, (galaxyText) => {
      let galaxyGeometry = new THREE.SphereGeometry(2500, 50, 50);
      let galaxyMaterial = new THREE.MeshPhongMaterial({
        map: galaxyText,
        side: THREE.DoubleSide,
        shininess: 0
      });

      Galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial);
      Scene.add(Galaxy);
    })

    // Création du soleil que l'on place à l'endroit de la lumière
    Loader.load(SunTexture, (sunText) => {
      let sunGeometry = new THREE.SphereGeometry(180, 32, 32);
      let sunMaterial = new THREE.MeshLambertMaterial({
        map: sunText,
        emissive: 0xfdb813,
        emissiveIntensity: 1
      });

      Sun = new THREE.Mesh(sunGeometry, sunMaterial);
      Sun.position.set(0, 0, 0);
      Scene.add(Sun);
    })

    // Création de Mercure
    Loader.load(MercuryTexture, (mercuryText) => {
      let mercuryGeometry = new THREE.SphereGeometry(10, 32, 32);
      let mercuryMaterial = new THREE.MeshLambertMaterial({
        map: mercuryText
      });

      Mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
      Mercury.position.set(250, 0, 0);
      Scene.add(Mercury);
    });

    // Création de Venus
    Loader.load(VenusTexture, (venusText) => {
      let venusGeometry = new THREE.SphereGeometry(22, 32, 32);
      let venusMaterial = new THREE.MeshLambertMaterial({
        map: venusText
      });

      Venus = new THREE.Mesh(venusGeometry, venusMaterial);
      Venus.position.set(350, 0, 0);
      Scene.add(Venus);
    });

    // Création de la terre
    Loader.load(EarthTexture, (earthText) => {
      let earthGeometry = new THREE.SphereGeometry(25, 32, 32);
      let earthMaterial = new THREE.MeshLambertMaterial({
        map: earthText
      });

      Earth = new THREE.Mesh(earthGeometry, earthMaterial);
      Earth.position.set(500, 0, 0);
      Scene.add(Earth);
    });


    // Création de Mars
    Loader.load(MarsTexture, (marsText) => {
      let marsGeometry = new THREE.SphereGeometry(14, 32, 32);
      let marsMaterial = new THREE.MeshLambertMaterial({
        map: marsText
      });

      Mars = new THREE.Mesh(marsGeometry, marsMaterial);
      Mars.position.set(630, 0, 0);
      Scene.add(Mars);
    })

    // Création de Jupiter
    Loader.load(JupiterTexture, (jupiterText) => {
      let jupiterGeometry = new THREE.SphereGeometry(100, 32, 32);
      let jupiterMaterial = new THREE.MeshLambertMaterial({
        map: jupiterText
      });

      Jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
      Jupiter.position.set(900, 0, 0);
      Scene.add(Jupiter);
    })

    // Création de Saturn
    Loader.load(SaturnTexture, (saturnText) => {
      let saturnGeometry = new THREE.SphereGeometry(80, 32, 32);
      let saturnMaterial = new THREE.MeshLambertMaterial({
        map: saturnText
      });

      Saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
      Saturn.position.set(1250, 0, 0);
      Scene.add(Saturn);
    })

    // Création de Uranus
    Loader.load(UranusTexture, (uranusText) => {
      let uranusGeometry = new THREE.SphereGeometry(50, 32, 32);
      let uranusMaterial = new THREE.MeshLambertMaterial({
        map: uranusText
      });

      Uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
      Uranus.position.set(1500, 0, 0);
      Scene.add(Uranus);
    })

    // Création de Neptune
    Loader.load(NeptuneTexture, (neptuneText) => {
      let neptuneGeometry = new THREE.SphereGeometry(43, 32, 32);
      let neptuneMaterial = new THREE.MeshLambertMaterial({
        map: neptuneText
      });

      Neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
      Neptune.position.set(1750, 0, 0);
      Scene.add(Neptune);
      //sceneAnimate();
    })

  }

  const handleWindowResize = () => {//Fonction pour resize la scene auto
    const width = window.innerWidth;
    const height = window.innerHeight;

    Renderer.setSize(width, height);
    Camera.aspect =  width / height;
    Camera.updateProjectionMatrix();
    Renderer.render(Scene, Camera);
  }

  const sceneAnimate = () => {//Creation de l'animation
    requestAnimationFrame(sceneAnimate);
    theta += dTheta;
    //Earth.rotation.y += 0.005;

    Mercury.position.x = rMercury * Math.cos(theta*1.6);
    Mercury.position.z = rMercury * Math.sin(theta*1.6);
    Venus.position.x = rVenus * Math.cos(theta*1.18);
    Venus.position.z = rVenus * Math.sin(theta*1.18);
    Earth.position.x = rEarth * Math.cos(theta);
    Earth.position.z = rEarth * Math.sin(theta);
    Mars.position.x = rMars * Math.cos(theta*0.8);
    Mars.position.z = rMars * Math.sin(theta*0.8);
    Jupiter.position.x = rJupiter * Math.cos(theta*0.44);
    Jupiter.position.z = rJupiter * Math.sin(theta*0.44);
    Saturn.position.x = rSaturn * Math.cos(theta*0.33);
    Saturn.position.z = rSaturn * Math.sin(theta*0.33);
    Uranus.position.x = rUranus * Math.cos(theta*0.23);
    Uranus.position.z = rUranus * Math.sin(theta*0.23);
    Neptune.position.x = rNeptune * Math.cos(theta*0.18);
    Neptune.position.z = rNeptune * Math.sin(theta*0.18);

    Renderer.render(Scene, Camera);
  }

  return(
    <div id='planet' ref={el => canvasElement = el}></div>
  )

}

export default SolarSystem;