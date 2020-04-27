// Main Redux store for app
const initialState = {
  mapState: {
    lng: -122.25,
    lat: 37.8,
    zoom: 13
  },
  map: {},
  pointsData: [],
  allPointsData: [],
  dropdownItems: [],
  cuisineApp: 'Search By Cuisine',
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GETMAP':
      return {
        ...state,
        map: action.payload
      }
    case 'SETPOINTS':
      return {
        ...state,
        pointsData: action.payload.points,
        allPointsData: action.payload.allPoints
      }
    case 'SETDROPDOWNCUISINES':
      return {
        ...state,
        dropdownItems: action.payload
      }
    case 'UPDATECUISINEFILTER':
      return {
        ...state,
        pointsData: action.payload.points,
        cuisineApp: action.payload.cuisine
      }
    case 'CLEARFILTERS':
      const allPoints = state.allPointsData;

      return {
        ...state,
        pointsData: allPoints,
        cuisineApp: 'Search By Cuisine'
      }
    default:
      return state
  }
  // if (action.type === 'GETMAP') {
  //   return {
  //     ...state,
  //     map: action.payload
  //   }
  // }

  // if (action.type === 'FUNCTEST') {
  //   let newMsg = 'Updated test';
  //   console.log(state)
  //   return {
  //     ...state,
  //     test: newMsg
  //   }
    // console.log(state.test);
    // const map = new mapboxgl.Map({
    //   container: this.mapContainer,
    //   style: 'mapbox://styles/mapbox/streets-v11',
    //   center: [this.props.mapState.lng, this.props.mapState.lat],
    //   zoom: this.props.mapState.zoom
    // });

    // return {
    //   test: newMsg,
    //   map: map
    // }
  // }

  // if (action.type === 'POPULATECUISINEFILTERDROPDOWN') {
  //   let results = [];
  //   state.pointsData.forEach(e => {
  //     if(!results.includes(e.properties.cuisine)) {
  //       results.push(e.properties.cuisine)
  //     }
  //   });
  //   // console.log(this.props.pointsData)
  //   return {dropdownItems: results};
  // }

  // if (action.type === 'FILTERBYCUISINE') {
  //   const results = state.allPointsData.filter(item => {
  //     return item.properties.cuisine === cuisine
  //   });

  //   return {
  //     pointsData: results,
  //     cuisineApp: cuisine
  //   };
  // }

  // return state;
};

export default reducer;