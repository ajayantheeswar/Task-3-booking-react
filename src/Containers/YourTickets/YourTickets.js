import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Ticket from '../../Components/TicketItem/TicketItem';
import classes from './YourTickets.module.css';

class YourTicket extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.fetchTickets()
    }    

    onChat = (tripId)=>{
        this.props.history.push('/customer/chatroom/' + tripId)
    }

    onLocation = (tripId) => {
        this.props.history.push('/customer/location/' + tripId)
    }
    render(){

    
        const tickets = this.props.ticketList ? this.props.ticketList.map(ticket => {
            return <Ticket cancel key={ticket.id} onLocation={() => this.onLocation(ticket.trip.id)} onChat={() => this.onChat(ticket.trip.id)} onCancel={() => this.props.onCancel(ticket.id)} ticket={ticket} trip={ticket.trip} />
        }) : null;
        
        return(<div className={classes['your-tickets']}>
            <h3>Your Tickets</h3>
            <hr/>
            {tickets}
        </div>);
    }

}


const mapPropsToState = state => {
    return {
        ticketList : state.yourtickets.tickets
    }
}

const mapPropsToDispatch = dispatch => {
    return {
        fetchTickets : () => dispatch(actions.FetchTicketsAsync()),
        onCancel : (ticketid) => dispatch(actions.StarCancelAsync(ticketid))
    }
}

export default connect(mapPropsToState,mapPropsToDispatch)(YourTicket);