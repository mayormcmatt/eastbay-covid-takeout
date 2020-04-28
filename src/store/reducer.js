// Main Redux store for app
const initialState = {
  mapState: {
    lng: -122.25,
    lat: 37.8,
    zoom: 10.5
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
    case 'TEXTSEARCH':
      return {
        ...state,
        pointsData: action.payload.points,
        searchValue: action.payload.value,
        cuisineApp: 'Search By Cuisine'
      }
    case 'UPDATECUISINEFILTER':
      return {
        ...state,
        pointsData: action.payload.points,
        searchValue: action.payload.value,
        cuisineApp: action.payload.cuisine
      }
    case 'CLEARFILTERS':
      const allPoints = state.allPointsData;

      return {
        ...state,
        pointsData: allPoints,
        searchValue: '',
        cuisineApp: 'Search By Cuisine'
      }
    default:
      return state
  }
};

export default reducer;