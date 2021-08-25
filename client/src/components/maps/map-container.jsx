import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

// Map does not center when updating single location
export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        console.log("Map mounted");
        console.log(this.props);
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
        console.log("Component updated");
        if (this.props.mode === 'single' && this.props.result !== prevProps.result) {
            this.setState({
                ...this.state,
                initialCenter: {
                    lat: this.props.result.coordinates.latitude,
                    lng: this.props.result.coordinates.longitude
                }
            })
        }
    }

    render() {
        return (
            this.props.mode === 'single' ? (
                <Map
                    google={this.props.google}
                    initialCenter={{
                        lat: this.props.result.coordinates.latitude,
                        lng: this.props.result.coordinates.longitude
                    }}
                    zoom={14}
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
        );
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer)