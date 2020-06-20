import * as actions from '../actions/ActionTypes';

const initialState = {
    loading:false,
    isAuth : false,
    isAdmin : false,
    token : null,
    error : ''
}
 
const reducer = (state=initialState,action) => {
    switch(action.type){
        case actions.AUTH_START :
            return {
                ...state,
                loading : true
            }
        case actions.AUTH_SUCCESS:
            return {
                ...state,
                isAuth : true,
                isAdmin : action.isAdmin,
                token : action.token,
                loading : false,
                error : ''
            }
        case actions.AUTH_FAIL:
            return{
                ...state,
                loading : false,
                error : action.error
            }
        case actions.AUTH_LOGOUT:
            return{
                ...state,
                isAuth : false,
                isAdmin : false,
                token: null
            }
        default:
            return state;
    }
}

export default reducer;