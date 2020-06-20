import * as actions from '../actions/ActionTypes';

const initialState = {
    loading:false,
    busList: [],
}

const Reducer = (state = initialState,action) => {
    switch(action.type){
        case actions.START_ADD_BUS:
            return {
                ...state,
                loading : true
            }
        case actions.ADD_BUS_SUCCESS:
            const newBusList = action.busList;
            return {
                ...state,
                loading: false,
                busList: newBusList || []
            }
            case actions.ADD_BUS_FAIL:
                return {
                    ...state,
                    loading: false,
                    error : action.error
                }
        default :
            break;
    }
    return state;
}

export default Reducer;
