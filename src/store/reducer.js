// Main Redux store for app
const initialState = {
  mapState: {
    lng: -122.25,
    lat: 37.84,
    zoom: 11.5
  },
  map: {},
  pointsData: [],
  allPointsData: [],
  dropdownItems: [],
  cuisineApp: 'Search By Cuisine',
  searchValue: '',
  menuViz: false,
  showCuisines: ''
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
        cuisineApp: 'Search By Cuisine',
        menuViz: false,
        showCuisines: ''
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
        cuisineApp: 'Search By Cuisine',
        menuViz: false,
        showCuisines: ''
      }
      case 'SHOWCUISINEDROPDOWN':
        return {
          ...state,
          menuViz: action.payload.toggleMenu,
          showCuisines: action.payload.show
        }
    default:
      return state
  }
};

export default reducer;