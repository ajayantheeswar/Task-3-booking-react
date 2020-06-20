import axois from 'axios';
import * as actions from './ActionTypes';

export const fetchSearchResultsAsync = (token,origin,destination) => dispatch=> {
    dispatch(SearchStart());
    axois.post('http://localhost:3001/customer/getbus',{
        token : token,
        origin : origin,
        destination :destination
    }).then(response => {
        dispatch(SearchSuccess(response.data.Buses,origin,destination));
        console.log(response);
    }).catch(error =>{
        dispatch(SearchFail(error,origin,destination));
         console.log(error);
    })
}

const SearchStart = ()=>{
    return {
        type : actions.FETCH_RESULTS_START
    }
}

const SearchSuccess = (busResults,origin,destination)=>{
    return {
        type : actions.FETCH_RESULTS_SUCCESS,
        result : busResults,
        searchOrigin : origin,
        searchDestination : destination
    }
}

const SearchFail = (error,origin,destination)=>{
    return {
        type : actions.FETCH_RESULTS_FAIL,
        error : error,
        searchOrigin : origin,
        searchDestination : destination
    }
}