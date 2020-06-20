import axios from 'axios';
import * as actions from './ActionTypes';

export const StartAuthAsync = (isSignUp,isAdmin,authDetails) => dispatch => {
    
   //dispatch(AuthSuccess(Usermode,authDetails.email));
   let url;
   if(isAdmin){
       if(isSignUp){
           url = "http://localhost:3001/auth/createAdmin";
       }else{
           url = "http://localhost:3001/auth/authAdmin"
       }
   }else{
       if(isSignUp){
           url = "http://localhost:3001/auth/createCustomer";
       }else{
           url = "http://localhost:3001/auth/authCustomer";
       }
   }
   dispatch(AuthStart())
   axios.post(url,authDetails)
            .then(response =>{
                dispatch(AuthSuccess(isAdmin,response.data.token));
            })
            .catch(error => {
                console.log("PODAMG",error.response.data);
                dispatch(AuthFail(error.response.data.message));
            });
}

export const AuthSuccess = (isAdmin,token) => {
    return {
        type: actions.AUTH_SUCCESS,
        isAdmin : isAdmin,
        token : token
    };
}

export const AuthFail = (error) => {
    return {
        type: actions.AUTH_FAIL,
        error: error
    };
}

export const AuthStart = ()=>{
    return{
        type : actions.AUTH_START
    }
}

export const logout = () =>{
    return {
        type : actions.AUTH_LOGOUT
    }
}