
  // HAVERSINE THEORY
  const getDistance = (polyx, polyz, markerx, markery ) => {
    var radlat1 = Math.PI * markerx / 180;
    var radlat2 = Math.PI * polyx / 180;
    var theta = markery - polyz;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    // dist = dist * 1.609344;
    return dist;
    // return isNaN(dist * 0.62137) ? 0 : dist * 0.62137;
  }

const closestPointInPolygon = (poly, pos) => {
    // console.log('poly ', poly, 'pos ', pos  );
    let allDistance = []
    poly.forEach((coordinate,index)=> {
      var res = getDistance(coordinate.x, coordinate.z, pos.x, pos.z );
      // console.log(index, ' coordinate distance ', res );
      allDistance.push({ distance: res, obj: coordinate,index: index});
    });

    allDistance.sort((a, b) => a.distance - b.distance);
    // console.log("Index: "+allDistance[0].index+" co-ordinate: "+allDistance[0].obj.x," ",allDistance[0].obj.y  );  
    return { x: allDistance[0].obj.x, y: 0, z: allDistance[0].obj.z };
  }

  export default closestPointInPolygon ;