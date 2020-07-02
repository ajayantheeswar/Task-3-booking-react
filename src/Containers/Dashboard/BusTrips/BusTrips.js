import React , {Component } from 'react';
import classes from './BusTrips.module.css';
import {connect} from 'react-redux';
import Trip from '../../../Components/TripItem/Trip';

import * as actions from '../../../store/actions/index';

class BusTrips extends Component {

    
    componentDidMount(){
        const busno = this.props.match.params.busno;
        this.props.getTrips(busno);
    }

    gotoSetLocation=(tripId)=>{
        this.props.history.push('/admin/location/' + tripId);
    }


    render(){
        const Triplist = this.props.trips.map(trip =>{
            return (<li key={trip.id}><Trip trip={trip} gotoSetLocation={() => this.gotoSetLocation(trip.id)} sendAlert={()=> this.props.sendAlert(trip.id)} /></li>)
        });      
        return(<div className={classes['bus-trips']}>
            <div>
                <h3>Trips</h3>
                <ul className={classes['trips-list']}>
                    {Triplist}
                </ul>
            </div>
        </div>);
    }
}

const mapPropsToState = state => {
    return {
        trips : state.bustrips.trips,
        isAlertSuccess : state.bustrips.AlertSuccess
    }
}

const mapPropsToDispatch = dispatch => {
    return {
        getTrips : (busno) => dispatch(actions.getTripsByBusAsync(busno)),
        sendAlert : (tripid) => dispatch(actions.sendAlertAsync(tripid)),
        
    }
}

export default connect(mapPropsToState,mapPropsToDispatch)(BusTrips);