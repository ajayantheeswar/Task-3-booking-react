import * as actions from '../actions/ActionTypes';
const initialState = {
    trips : [],
    loading : false,
    error : '',
    AlertSuccess : false
}

const refresher = {...initialState,trips : []};

const reducer = (state=initialState,action) => {
    switch(action.type){
        case actions.FETCH_TRIPS_START:
            return{
                ...state,
                loading:true
            }
        case actions.FETCH_TRIPS_SUCCESS:
            return{
                ...state,
                trips : action.trips,
                loading:false
            }
        case actions.FETCH_TRIPS_FAIL:
            return{
                ...state,
                loading:false,
                error : action.error
            }

        case actions.SEND_EMAIL_ALERT_START:
            return {
                ...state,
                loading: true,
                AlertSuccess : false,
                error : ''
            }
        case actions.SEND_EMAIL_ALERT_SUCCESS:
            return {
                ...state,
                loading: true,
                AlertSuccess : true
            }
        case actions.SEND_EMAIL_ALERT_FAIL:
            return {
                ...state,
                loading: true,
                AlertSuccess : false,
                error : 'Failed'
            }
        default :
            return state
    }
}

export default reducer;