import React from 'react';
import Map from '../Map/Map'
import ChatRoom from '../../../Models/ChatRoom';

class MapContainer extends React.PureComponent {

    constructor(props){
        super(props)
        this.state = {
            tripId:'',
            isMarkerShown: true,
            currentMarkerPosition : { lat: 11.127123, lng: 78.656891 },
            socket : null
        }
    }
  
    OnDragMarker = (event) =>{
        console.log('pushed');
        const latLng = event.latLng;
        const currentLatitude = latLng.lat();
        const currentLongitude = latLng.lng();
        const location = {lat : currentLatitude,lng : currentLongitude}
        const tripId = this.state.tripId;    
        this.setState( (prevState) => {
            //console.log(currentLatitude,currentLongitude)
            return {
                ...prevState,
                currentMarkerPosition : location
            }
        });
        this.state.socket.emit('newLocation',{location , tripId});
    }

    componentDidMount(){
        const token = sessionStorage.getItem('token');
        const TripId = this.props.match.params.tripid;
        
        const socket = ChatRoom.getSocketLocation(TripId);
        this.setState((prevState)=>{
            return {
                ...prevState,
                tripId : TripId,
                socket : socket
            }
         })    
    }   
  
    render() {
      return (
        <Map
          isMarkerShown={this.state.isMarkerShown}
          onDragMarker = {this.OnDragMarker}
          markerPosition = {this.state.currentMarkerPosition}
        />
      )
    }
  }

export default MapContainer;