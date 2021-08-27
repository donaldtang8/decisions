import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

// Map does not center when updating single location
export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
        this.loadMap = this.loadMap.bind(this);
        this.state = {
            markers: []
        }
    }

    componentDidMount() {
        this.loadMap();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props && this.props.mode === 'single') {
            if (this.props.result !== prevProps.result) {
                this.removeMarkers();
                this.updateMarker();
                this.recenterMap();
            }
        }
        if (this.props && this.props.mapsRedux !== prevProps.mapsRedux) {
            if (this.map) {
                const { selectedMarker } = this.props.mapsRedux;
                if (selectedMarker !== null) {
                    this.hideAllMarkers();
                    this.showMarker(this.props.mapsRedux.selectedMarker, this.map);
                } else {
                    this.showAllMarkers(this.map);
                }
            }
        }
    }

    loadMap() {
        if (this.props && this.props.google) {
            // google is available
            const {google, mode, result, results} = this.props;
            const maps = google.maps;
            const node = ReactDOM.findDOMNode(this.mapRef.current);
      
            let mapConfig;
            if (mode === 'single') {
                const zoom = 14;
                const lat = result.coordinates.latitude;
                const lng = result.coordinates.longitude;
                const initialCenter = new maps.LatLng(lat, lng);
                mapConfig = Object.assign({}, {
                    center: initialCenter,
                    zoom: zoom
                })
            } 
            else {
                const zoom = 14;
                mapConfig = Object.assign({}, {
                    center: { lat: results[0].coordinates.latitude, lng: results[0].coordinates.longitude },
                    zoom: zoom
                })
            }
            this.map = new maps.Map(node, mapConfig);
            this.addMarkers();
        }
    }

    addMarkers() {
        const map = this.map;
        const {google, mode, result, results} = this.props;
        const maps = google.maps;
        if (mode === 'single') {
            const position = { lat: result.coordinates.latitude, lng: result.coordinates.longitude };
            const contentString = 
            '<div className="map__info">' +
                `<div className="map__info--title">${result.name}</div>` +
                `<div className="map__info--address">${result.location.display_address[0]} ${result.location.display_address[1]}</div>` +
                `<div className="map__info--phone">${result.phone}</div>` +
            "</div>";
            const infoWindow = new maps.InfoWindow({
                content: contentString,
            });
            const marker = new maps.Marker({
                position: position,
                map,
                title: result.name
            });
            marker.addListener("click", () => {
                infoWindow.open({
                    anchor: marker,
                    map,
                    shouldFocus: false
                })
            });
            this.state.markers.push(marker);
        } else {
            let bounds = new google.maps.LatLngBounds();
            const {page, perPage} = this.props.pagination;
            let i = (page * perPage) + 1;
            for (let result of results) {
                const position = { lat: result.coordinates.latitude, lng: result.coordinates.longitude };
                bounds.extend(position);
                const contentString = 
                '<div className="map__info">' +
                    `<div className="map__info--title">${result.name}</div>` +
                    `<div className="map__info--address">${result.location.display_address[0]} ${result.location.display_address[1]}</div>` +
                    `<div className="map__info--phone">${result.phone}</div>` +
                "</div>";
                const infoWindow = new maps.InfoWindow({
                    content: contentString,
                });
                const marker = new maps.Marker({
                    position: position,
                    map,
                    label: {text: i.toString(), color: "white"},
                    title: result.name
                });
                marker.addListener("click", () => {
                    infoWindow.open({
                        anchor: marker,
                        map,
                        shouldFocus: false
                    })
                });
                this.state.markers.push(marker);
                i++;
            }
            this.map.fitBounds(bounds);
        }
    }

    // for single markers - delete existing marker and add new one
    updateMarker() {
        const map = this.map;
        const {google} = this.props;
        const maps = google.maps;
        const result = this.props.result;
        const position = { lat: result.coordinates.latitude, lng: result.coordinates.longitude };
        const contentString = 
            '<div className="map__info">' +
                `<div className="map__info--title">${result.name}</div>` +
                `<div className="map__info--address">${result.location.display_address[0]} ${result.location.display_address[1]}</div>` +
                `<div className="map__info--phone">${result.phone}</div>` +
            "</div>";
        const infoWindow = new maps.InfoWindow({
            content: contentString,
        });
        const marker = new maps.Marker({
            position: position,
            map,
            title: this.props.result.name
        });
        marker.addListener("click", () => {
            infoWindow.open({
                anchor: marker,
                map,
                shouldFocus: false
            })
        })
        this.setState({
            markers: [marker]
        })
    }

    removeMarkers() {
        for (let marker of this.state.markers) {
            marker.setMap(null);
        }
        this.setState({
            markers: []
        });

    }

    showAllMarkers(map) {
        for (let marker of this.state.markers) {
            marker.setMap(map);
        }
    }

    showMarker(i, map) {
        this.state.markers[i].setMap(map);
    }

    hideAllMarkers() {
        this.showAllMarkers(null);
    }

    recenterMap() {
        const map = this.map;
        const curr = { lat: this.props.result.coordinates.latitude, lng: this.props.result.coordinates.longitude};

        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            let newCenter = new maps.LatLng(curr.lat, curr.lng)
            map.panTo(newCenter);
        }
    }

    render() {
        return (
            <div className={this.props.mode === "single" ? "map__container map__container--single" : "map__container map__container--multiple"} ref={this.mapRef}>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    mapsRedux: state.maps,
    pagination: state.pagination
})

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(connect(mapStateToProps, { })(MapContainer))