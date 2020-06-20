import axios from 'axios';
import * as actions from './ActionTypes';

export const SelectBus = (busid,origin) =>{
    console.log(origin);
    
    return{
        type : actions.SELECT_BUS,
        busid : busid,
        origin : origin
    }
}

export const FetchTripAsync = (date) => (dispatch,getState) => {
    const s = getState();
    const token = s.auth.token;
    const busid = s.bookticket.busid;
    const origin = s.bookticket.origin;
    dispatch(StartTripFetch());
    axios.post('http://localhost:3001/customer/gettrip',{
        token : token,
        busid : busid,
        origin : origin,
        date : date
    })
        .then(response =>{
            dispatch(TripFetchSuccess(response.data));
        })
        .catch(error =>{
            dispatch(TripFetchFail(error.response.data));
        })
}

export const StartTripFetch = () => {
    return {
        type:actions.FETCH_RESULTS_START
    }
}

export const TripFetchSuccess = (response) => {

    const seats = response.payload.seats.map(seat => seat.seatno);

    console.log(response);
    return {
        type:actions.FETCH_TRIP_SUCCESS,
        trip : response.payload.trip,
        seats : seats
    }
}

export const TripFetchFail = (error) => {
    return {
        type:actions.FETCH_TRIP_FAIL,
        error : error
    }
}
/* BOOK TICKET*/
export const BookTicketAsync = () => (dispatch,getState) => {
    const s = getState();
    const token = s.auth.token;
    const busId = s.bookticket.busid;
    const tripId = s.bookticket.trip.id;
    const seats = s.bookticket.seatsSelected;
    dispatch(StartBookTicket());
    axios.post('http://localhost:3001/customer/bookbus',{
        token : token,
        busid : busId,
        tripId : tripId,
        seats : seats
    })
        .then(response =>{
            dispatch(BookTicketSuccess(response.data));
        })
        .catch(error =>{
            dispatch(BookTicketFail(error.response.data));
        })
}

export const BookTicketSuccess = (response) => {
    console.log(response);
    const trip = response.result.trip;
    const ticket = response.result.ticket;
    const seats = response.result.seats.map(seat => seat.seatno);
    return {
        type:actions.BOOK_TICKET_SUCCESS,
        trip: trip,
        ticket : ticket,
        seats : seats
    }
}

export const BookTicketFail = (error) => {
    return {
        type:actions.BOOK_TICKET_FAIL,
        error : error
    }
}

export const StartBookTicket = () => {
    return {
        type:actions.BOOK_TICKET_START
    }
}