import * as actions from '../actions/ActionTypes';

const initialState = {
    SearchResults : [],
    loading : false,
    error:'',
    searchOrigin : '',
    searchDestination : ''
}

const refresher = {
    ...initialState,
    SearchResults : []
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case actions.FETCH_RESULTS_START:
            return {
                ...state,
                loading: true
            }
        case actions.FETCH_RESULTS_SUCCESS:
            return{
                ...state,
                loading : false,
                SearchResults : action.result,
                error:'',
                searchOrigin: action.searchOrigin,
                searchDestination : action.searchDestination
            }
        case actions.FETCH_RESULTS_FAIL:
            return{
                ...state,
                loading : false,
                SearchResults : [],
                error : action.error,
                searchOrigin: action.searchOrigin,
                searchDestination : action.searchDestination
            }
        case actions.CLEAR_SEARCH_RESULTS :
            console.log(state);
            return {
                ...state,
                SearchResults : []
            }
        default:
            return state
    }
}

export default reducer;