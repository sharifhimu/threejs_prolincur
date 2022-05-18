import * as THREE from "three";


export const shapeOne = (wallsPoint, cubepos ) => {

    var randomColor = Math.floor(Math.random()*16777215).toString(16);

    var wallPoints = wallsPoint.map(w => {
      return new THREE.Vector3(w.X, 0, -w.Y)
    });
    var geom = new THREE.BufferGeometry().setFromPoints(wallPoints);
    var lines = new THREE.LineLoop(geom, new THREE.LineBasicMaterial({
      color: `#${randomColor}`
    }));

    var geometry = new THREE.BoxGeometry( .3, 0, .3 );
    var material = new THREE.MeshBasicMaterial( {color: 'white' } );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.x = cubepos?.x || 0
    cube.position.z = cubepos?.y || 0


    return{ lines, cube, wallPoints };

}

export const Marker = () => {

  const marker = new THREE.Mesh(new THREE.BoxGeometry( .3, 0, .3 ), new THREE.MeshBasicMaterial({
    color: "white"
  }));
  marker.position.set( 0, 0, 0);
  
  return { marker }

}