import * as actions from './ActionTypes';
import axios from 'axios';

export const StartAddBusAsync = (token,BusDetails,cb) => dispatch => {
    /*Add the network Element*/
    dispatch(StartAddBus())
    axios.post('http://localhost:3001/admin/addbus',{token:token, businfo:BusDetails , isAdmin:true})
        .then(response =>{
            {const UpdatedList = response.data.busList || [];
            console.log(UpdatedList);
            cb();
            dispatch(AddBusSuccess(UpdatedList));}
            
        })
        .catch(error=>{
            console.log(error);
            dispatch(AddBusFail(error.response.data.Message || "Error"));
        })
        
}

export const StartAddBus =() =>{
    return {
        type : actions.START_ADD_BUS
    }
}

export const AddBusSuccess =(newList) =>{
    return {
        type : actions.ADD_BUS_SUCCESS,
        busList : newList
    }
}

export const AddBusFail =(error) =>{
    return {
        type : actions.ADD_BUS_FAIL,
        error : error
    }
}

export const FetchBusStartAsync = (token) => dispatch=>{
    dispatch(StartAddBus());
    axios.post('http://localhost:3001/admin/getallbus',{token:token , isAdmin :true})
        .then(response =>{
            const BusList = response.data.busList || [];
            console.log(BusList);
            dispatch(AddBusSuccess(BusList));
        }).catch(error =>{
            console.log(error);
            dispatch(AddBusFail(error.response.data.Message || "Error"));
        })
}