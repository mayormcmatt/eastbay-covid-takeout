const geojson = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-122.197400, 37.790380]
    },
    properties: {
      name: '1 Seafood & Chicken',
      cuisine: 'American',
      takeoutOption: 'takeout and delivery (DoorDash)',
      address: '3506 MacArthur Blvd.',
      city: 'Oakland',
      phone: '510-210-8235',
      website: '4505burgersandbbq.com'
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-122.200170, 37.793730]
    },
    properties: {
      name: '4505 Burgers & BBQ MacArthur',
      cuisine: 'American',
      takeoutOption: 'takeout and delivery (Grubhub, Caviar, Postmates, DoorDash, Seamless)',
      address: '3506 MacArthur Blvd.',
      city: 'Oakland',
      phone: '510-210-8235',
      website: '454505burgersandbbq.com05burgersandbbq.com'
    }
  }]
};

export default geojson;