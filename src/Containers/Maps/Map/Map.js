import React from "react"
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const Map = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyA0BqLkcw3whzI34BDoyEOXAEltTywIfa0&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px`, width: '80%' , margin:'2rem auto'}} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    center={props.markerPosition}
  >
    {props.isMarkerShown && 
    <Marker 
     position={props.markerPosition}
     draggable
     onDragEnd={(event)=> props.onDragMarker(event)}
      />}
  </GoogleMap>
)

export default Map;