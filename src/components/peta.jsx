import React from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../store/store";
import { FaMapMarkerAlt } from "react-icons/fa";
import '../styles/peta.css';
 
mapboxgl.accessToken = store.getState().mapboxKey;
 
class Peta extends React.Component {
    state = {
        lokasi: "",
        lng: this.props.longitude,
        lat: this.props.latitude,
        zoom: 16
    }

    componentDidMount = async() => {
        // fungsi untuk membuat peta sesuai garis bujur dan garis lintang yang sesuai
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

        // fungsi untuk mendapatkan nama lokasi dari garis lintang dan garis bujurnya
        const req = {
            method: "get",
            url: `${store.getState().mapboxUrl}${this.props.longitude},${
              this.props.latitude
            }.json?access_token=${store.getState().mapboxKey}`,
            headers: { "Content-Type": "application/json" }
        };
        axios(req)
            .then(response => {
            this.setState({
                lokasi: response.data.features[0].place_name,
            });
        });

        // fungsi untuk memberikan posisi khusus di dalam peta
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
                    description: [this.state.lokasi]
                }
            }]
        };

        // menambahkan penanda ke dalam peta
        geojson.features.forEach(function(marker) {

            // create a HTML element for each feature
            let el = document.createElement('div');
            el.className = 'marker';
        
            // membuat penanda sesuai dengan posisi yang ditentukan sebelumnya
            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .addTo(map);
            
            // menambahkan tampilan pop up dalam penanda peta 
            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .setPopup(new mapboxgl.Popup({ offset: 25 })
                .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
                .addTo(map);
        });
    };
 
    render() {
        return (
            <div style={{textAlign:'center'}}>
                <h6>
                    <FaMapMarkerAlt style={{color:'red'}}/>{" "}{this.state.lokasi}
                </h6>
                <div>
                    <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
                    </div>
                <div ref={el => this.mapContainer = el} className='mapContainer' />
            </div>
        )
    }
}
 
export default connect("mapboxKey", actions)(withRouter(Peta));