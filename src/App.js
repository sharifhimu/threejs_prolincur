import { useEffect } from 'react';
import './App.css';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { shapeOne, Marker } from './components/geometry/GeometryStructure';
import { isInside } from './components/geometry/InsideChecking';
import { wallsPoint, cubeonepos, wallsPointtwo, cubetwopos, wallsPointthree, cubethreepos } from './components/geometry/Shapes'
import closestPointInPolygon from './components/geometry/ClosestPointInPolygon';

const App = () => {

  const checkIfinside = (marker, shape) => {
    let check = isInside(marker.position, shape.wallPoints);
    if(check){
      shape.cube.position.x = marker.position.x
      shape.cube.position.y = marker.position.y
      shape.cube.position.z = marker.position.z
    }
    else{
      let closestpoint = closestPointInPolygon(shape.wallPoints, marker.position )
      shape.cube.position.x = closestpoint.x
      shape.cube.position.y = closestpoint.y
      shape.cube.position.z = closestpoint.z
    }
  }

  useEffect(() => {

    // CREATING ENVIRONMENT
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(3.5, 10, 5);
    // camera.position.z = 3;
    // camera.position.set(0,0,0);
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    // ORBITCONTROL
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(2.5, -20, -10);
    // controls.target.set(0 , 0, 0);
    controls.update();
    controls.enabled = false

    // SHAPEONE
  let shapeone = shapeOne(wallsPoint, cubeonepos )
  scene.add( shapeone.lines );
  scene.add( shapeone.cube )
  // console.log('shapeone ', shapeone );

  // SHAPETWO
  let shapetwo = shapeOne(wallsPointtwo, cubetwopos )
  scene.add( shapetwo.lines );
  scene.add( shapetwo.cube )

  // SHAPETHREE
  let shapethree = shapeOne(wallsPointthree, cubethreepos )
  scene.add( shapethree.lines );
  scene.add( shapethree.cube )

  //MOUSE
  const marker = Marker().marker 
  scene.add(marker)

  // EVENT LISTENER
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

  const onMouseMove = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, marker.position);

    checkIfinside(marker, shapeone )
    checkIfinside(marker, shapetwo )
    checkIfinside(marker, shapethree )

  }

  document.addEventListener("mousemove", onMouseMove, false);


  

  renderer.setAnimationLoop(() => {
      renderer.render(scene, camera)
  })
    
  }, [])

  return (
    <div className="App" >
    </div>
  );
}

export default App;
