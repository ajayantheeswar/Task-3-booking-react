import axios from 'axios';
import * as actions from './ActionTypes';

export const FetchTicketsAsync = () => (dispatch,getState) => {
    const s = getState();
    const token = s.auth.token;
    dispatch(StartTicketsFetch());
    axios.post('http://localhost:3001/customer/gettickets',{
        token : token
    }).then(response =>{
            dispatch(TicketsFetchSuccess(response.data));
        })
        .catch(error =>{
            dispatch(TicketsFetchFail(error.response.data));
        })
}

export const StartTicketsFetch = () => {
    return {
        type:actions.FETCH_TICKETS_START
    }
}

export const TicketsFetchSuccess = (response) => {

    const tickets = response.result

    console.log(response);
    return {
        type:actions.FETCH_TICKETS_SUCCESS,
        tickets : tickets
    }
}

export const TicketsFetchFail = (error) => {
    return {
        type:actions.FETCH_TICKETS_FAIL,
        error : error
    }
}
//////////
export const StarCancelAsync = (ticketid) => (dispatch,getState) =>{
    const s = getState();
    const token = s.auth.token;
    dispatch(starCancel());
    axios.post('http://localhost:3001/customer/cancelticket',{
        token : token,
        ticketId : ticketid
    }).then(response =>{
            console.log(response);
            dispatch(FetchTicketsAsync());
        })
        .catch(error =>{
            dispatch(cancelFail(error.response.data));
        })
}

export const cancelSuccess = (response) => {
    console.log(response);
    return {
        type:actions.CANCEL_TICKET_SUCCESS,
    }
}

export const cancelFail = (error) => {
    return {
        type:actions.CANCEL_TICKET_FAIL,
        error : error
    }
}

export const starCancel = () => {
    return {
        type:actions.CANCEL_TICKET_START
    }
}