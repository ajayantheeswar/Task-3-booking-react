import axios from 'axios';
import * as actions from './ActionTypes';

export const getTripsByBusAsync = (busno) => (dispatch,getState) =>{
    dispatch(getTripsByBusStart())
    const s = getState();
    const token = s.auth.token;
    axios.post('http://localhost:3001/admin/getTripsbybus',{
        token : token,
        isAdmin : true,
        busno : busno
    }).then(response =>{
        dispatch(getTripsByBusSuccess(response.data))
    }).catch(error => {
        dispatch(getTripsByBusFail(error))
    })
}

export const getTripsByBusStart = () => {
    return {
        type:actions.FETCH_TRIPS_START
    }
}

export const getTripsByBusSuccess = (response) => {
    return {
        type: actions.FETCH_TRIPS_SUCCESS,
        trips : response.Trips
    }
}

export const getTripsByBusFail = (error) => {
    return {
        type: actions.FETCH_TRIPS_FAIL,
        error : error
    }
}
///// ALERT /////

export const sendAlertAsync = (tripId) => (dispatch,getState) =>{
    dispatch(sendAlertStart())
    const s = getState();
    const token = s.auth.token;
    console.log('INSIDE');
    axios.post('http://localhost:3001/admin/sendAlert',{
        token : token,
        isAdmin : true,
        tripId : tripId
    }).then(response => {
        dispatch(sendAlertSuccess())
    }).catch(error => {
        dispatch(sendAlertFail());
    })
}

export const sendAlertStart = () => {
    return {
        type:actions.SEND_EMAIL_ALERT_START
    }
}

export const sendAlertSuccess = () => {
    return {
        type:actions.SEND_EMAIL_ALERT_SUCCESS
    }
}

export const sendAlertFail = () => {
    return {
        type:actions.SEND_EMAIL_ALERT_FAIL
    }
}



