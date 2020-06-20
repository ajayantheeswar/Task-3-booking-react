import * as actions from '../actions/ActionTypes';
const initialState = {
    tickets : null,
    loading : false
}

const refresher = {...initialState};

const reducer = (state=initialState,action) => {
    switch(action.type){
        case actions.FETCH_TICKETS_START:
            return{
                ...state,
                loading:true
            }
        case actions.FETCH_TICKETS_SUCCESS:
            return{
                ...state,
                loading:false,
                tickets : action.tickets
            }
        case actions.FETCH_TICKETS_FAIL:
            return{
                ...state,
                loading:false,
                error : action.error
            }
        case actions.CANCEL_TICKET_START:
            return{
                ...state,
                loading:true
            }
        case actions.CANCEL_TICKET_FAIL:
            return{
                ...state,
                loading:false,
                error:action.error
            }
        default:
            return state;
    }
}

export default reducer;