import React from 'react';
import ReactDOM from 'react-dom';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

// Map does not center when updating single location
export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
        this.loadMap = this.loadMap.bind(this);
        this.state = {
        }
    }

    componentDidMount() {
        console.log("Map mounted");
        this.loadMap();
        let bounds = new this.props.google.maps.LatLngBounds();
        for (let result of this.props.results) {
            const point = { lat: result.coordinates.latitude, lng: result.coordinates.longitude };
            bounds.extend(point);
        }
        if (this.props.mode === 'single') {
            console.log("Setting initial center");
            this.setState({
                initialCenter: {
                    lat: this.props.result.coordinates.latitude,
                    lng: this.props.result.coordinates.longitude
                }
            })
        }
        this.setState({ bounds: bounds })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.mode === 'single' && this.props.result !== prevProps.result) {
            this.setState({
                ...this.state,
                initialCenter: {
                    lat: this.props.result.coordinates.latitude,
                    lng: this.props.result.coordinates.longitude
                }
            })
        }
        // if (this.props.mode === 'single' && prevState.initialCenter !== this.state.initialCenter) {
        //     this.recenterMap();
        // }
    }

    loadMap() {
        if (this.props && this.props.google) {
            console.log("Loading map");
            // google is available
            const {google} = this.props;
            const maps = google.maps;
            const node = ReactDOM.findDOMNode(this.mapRef.current);
      
            let zoom = 14;
            let lat = 37.774929;
            let lng = -122.419416;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
              center: center,
              zoom: zoom,
            })
            this.map = new maps.Map(node, mapConfig);
          }
    }

    // recenterMap() {
    //     console.log("recentering map");
    //     const map = this.map;
    //     const curr = this.state.currentLocation;

    //     const google = this.props.google;
    //     const maps = google.maps;

    //     if (map) {
    //         let center = new maps.LatLng(curr.lat, curr.lng)
    //         map.panTo(center)
    //     }
    // }

    render() {
        return (
            <div className="map__container" ref={this.mapRef}>
                {/* {
                    this.props.mode === 'single' ? (
                        <Map
                            google={this.props.google}
                            initialCenter={{
                                lat: this.props.result.coordinates.latitude,
                                lng: this.props.result.coordinates.longitude
                            }}
                            zoom={14}
                            onReady={this.onMapReady}
                            style={{width: '100%', height: '100%', position: 'relative'}}>
                                <Marker
                                    name={this.props.result.name}
                                    position={{
                                        lat: this.props.result.coordinates.latitude,
                                        lng: this.props.result.coordinates.longitude
                                    }}>
                                        <InfoWindow>
                                            <div>Info</div>
                                        </InfoWindow>
                                </Marker>
                        </Map>
                    ) : (
                        <Map
                            google={this.props.google}
                            zoom={14}
                            style={{width: '100%', height: '100%', position: 'relative'}}
                            bounds={this.state.bounds}>
                            {
                                this.props.results.map((result,idx) => (
                                    <Marker
                                        key={idx}
                                        name={result.name}
                                        position={{
                                            lat: result.coordinates.latitude,
                                            lng: result.coordinates.longitude}}
                                    >
                                            <InfoWindow>
                                                <div>Info</div>
                                            </InfoWindow>
                                    </Marker>
                                ))
                            }
                        </Map>
                    )
                } */}
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer)