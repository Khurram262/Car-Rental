// reducers/bookingsReducer.js
const initialState = {
    bookings: [],
    loading: false,
  };
  
  export const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_ALL_BOOKINGS':
        return { ...state, bookings: action.payload, loading: false };
      case 'REMOVE_BOOKING':
        return {
          ...state,
          bookings: state.bookings.filter((booking) => booking._id !== action.payload),
        };
      case 'LOADING':
        return { ...state, loading: true };
      default:
        return state;
    }
  };
  