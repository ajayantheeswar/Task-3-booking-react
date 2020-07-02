import React from 'react';
import Map from '../../Maps/Map/Map';
import ChatRoom from '../../../Models/ChatRoom';

class CustomerMap extends React.PureComponent {

    constructor(props){
        super(props)
        this.state = {
            tripId:'',
            isMarkerShown: true,
            currentMarkerPosition : { lat: 11.127123, lng: 78.656891 },
            socket : null
        }
    }
  
    componentDidMount(){
        const token = sessionStorage.getItem('token');
        const TripId = this.props.match.params.tripid;
        const socket = ChatRoom.getSocketLocation(TripId,this.onNewLocation);
        this.setState((prevState)=>{
            return {
                ...prevState,
                tripId : TripId,
                socket : socket
            }
         });    
    }
    
    onNewLocation = (data) => {
        console.log(data);
        this.setState((prevState)=>{
            return {
                ...prevState,
                currentMarkerPosition : data.location
            }
        })
    }
  
    render() {
      return (
        <Map
          isMarkerShown={this.state.isMarkerShown}
          markerPosition = {this.state.currentMarkerPosition}
        />
      )
    }
  }

export default CustomerMap;