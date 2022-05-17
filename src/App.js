import { useEffect } from 'react';
import './App.css';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { shapeOne } from './components/geometry/GeometryStructure';
import { isInside } from './components/geometry/InsideChecking';

function App() {

  const checkIfinside = (marker, shape) => {
    let check = isInside(marker.position, shape.wallPoints);
    if(check){
      shape.cube.position.x = marker.position.x
      shape.cube.position.y = marker.position.y
      shape.cube.position.z = marker.position.z
    }
  }

  useEffect(() => {

    // CREATING ENVIRONMENT
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(3.5, 10, 5);
    // camera.position.set(0,0,0);
    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    // ORBITCONTROL
    var controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(2.5, -20, -10);
    // controls.target.set(0 , 0, 0);
    controls.update();
    controls.enabled = false

    // SHAPEONE
    const wallsPoint = [{
        "X": 6.2,
        "Y": 2
      },
      {
        "X": 8,
        "Y": -2
      },
      {
        "X": 9,
        "Y": 6
      },
      {
        "X": 2,
        "Y": 5.5
      }
    ];
  let cubeonepos = { x: 7, y: -2 }
  let shapeone = shapeOne(wallsPoint, 'green', cubeonepos )
  scene.add( shapeone.lines );
  scene.add( shapeone.cube )
  // console.log('shapeone ', shapeone );

  // SHAPETWO
  const wallsPointtwo = [{
      "X": -4,
      "Y": -1.2
    },
    {
      "X": 0,
      "Y": -3
    },
    {
      "X": 3.5,
      "Y": -1
    },
    {
      "X": -1,
      "Y": 3
    }
  ];
  let cubetwopos = { x: 0, y: 0 }
  let shapetwo = shapeOne(wallsPointtwo, 'red', cubetwopos )
  scene.add( shapetwo.lines );
  scene.add( shapetwo.cube )

  // SHAPETHREE
  const wallsPointthree = [
    {
      "X": -18,
      "Y": 3
    },
    {
      "X": -16.5,
      "Y": 1
    },
    {
      "X": -8,
      "Y": -2
    },
    {
      "X": -10,
      "Y": -5
    },
    {
      "X": -8.5,
      "Y": -4.5
    },
    {
      "X": -7,
      "Y": -2
    }

  ];
  let cubethreepos = { x: -12, y: 0 }
  let shapethree = shapeOne(wallsPointthree, 'violet', cubethreepos )
  scene.add( shapethree.lines );
  scene.add( shapethree.cube )

  //MOUSE
  var marker = new THREE.Mesh(new THREE.BoxGeometry( .3, 0, .3 ), new THREE.MeshBasicMaterial({
    color: "white"
  }));
  marker.position.set( 0, 0, 0);
  scene.add(marker)

  document.addEventListener("mousemove", onMouseMove, false);

  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  var plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  
  function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, marker.position);

    checkIfinside(marker, shapeone )
    checkIfinside(marker, shapetwo )
    checkIfinside(marker, shapethree )

  }

  renderer.setAnimationLoop(() => {
      renderer.render(scene, camera)
  });

  }, [])

  return (
    <div className="App" >
    </div>
  );
}

export default App;
