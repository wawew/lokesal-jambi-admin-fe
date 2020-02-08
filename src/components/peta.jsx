import React from 'react';
import mapboxgl from 'mapbox-gl';
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../store/store";
import '../styles/peta.css';
 
mapboxgl.accessToken = store.getState().mapboxKey;
 
class Peta extends React.Component {
    state = {
        lng: this.props.longitude,
        lat: this.props.latitude,
        zoom: 16
    }

    componentDidMount = async() => {
        let map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [ this.state.lng, this.state.lat ],
            zoom: this.state.zoom
        });
 
        map.on('move', () => {
        this.setState({
            lng: map.getCenter().lng.toFixed(4),
            lat: map.getCenter().lat.toFixed(4),
            zoom: map.getZoom().toFixed(2)
            });
        });

        let geojson = {
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [this.state.lng, this.state.lat]
              },
              properties: {
                title: 'LOKESAL',
                description: 'Nama lokasinya'
              }
            }]
        };

        // add markers to map
        geojson.features.forEach(function(marker) {

            // create a HTML element for each feature
            let el = document.createElement('div');
            el.className = 'marker';
        
            // make a marker for each feature and add to the map
            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .addTo(map);
            
            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
                .addTo(map);
        });

    }
 
    render() {
        return (
            <div style={{textAlign:'center'}}>
                <div>
                    <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
                    </div>
                <div ref={el => this.mapContainer = el} className='mapContainer' />
            </div>
        )
    }
}
 
export default connect("mapboxKey", actions)(withRouter(Peta));