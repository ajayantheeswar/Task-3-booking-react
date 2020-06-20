import * as actions from '../actions/ActionTypes';

const initialState = {
    busid : '',
    tripid : '',
    seatsBooked : [],
    seatsSelected : [],
    origin :'',
    trip : null,
    date : '',
    loading : false,
    loaded : false,
    booked : false,
    ticket : null
}

const refreshState = {
    ...initialState,
    seatsBooked : [],
    seatsSelected : []
}

const reducer = (state=initialState,action) => {
    switch(action.type){
        case actions.SELECT_BUS:
            return{
                ...state,
                origin:action.origin,
                busid : action.busid,
                tripid : '',
                seatsBooked : [],
                seatsSelected : [],
                booked : false
            }
        case actions.UPDATE_SEAT_SELECTED:
            return {
                ...state,
                seatsSelected : action.UpdatedSeats
            };
        case actions.FETCH_TRIP_START:
            return{
                ...state,
                loading:true,
                loaded : false
            }
        case actions.FETCH_TRIP_SUCCESS:
            return{
                ...state,
                trip : action.trip,
                seatsBooked : action.seats,
                tripid : action.trip.id,
                loading : false,
                loaded : true
            }
        case actions.FETCH_TRIP_FAIL:
            return{
                ...state,
                loading:false,
                error : action.error
            }

        case actions.BOOK_TICKET_SUCCESS:
            return{
                ...state,
                ...refreshState,
                booked : true,
                trip : action.trip,
                ticket :action.ticket,
                seatsBooked : action.seats
            }
        case actions.BOOK_TICKET_FAIL:
            return{
                ...state,
                ...refreshState,
                error: action.error
            }
        case actions.CLEAR_BOOK_TICKET:
            return{
                ...state,
                ...refreshState
            };

        default:
            return state;
    }
}

export default reducer;