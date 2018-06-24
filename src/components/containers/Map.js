import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MapView, Permissions, Location } from 'expo';

// Todo fix latitudeDelta and longitude delta
export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      errorMessage: null,
      permissionGranted: false,
    };
  }

  componentDidMount() {
    this.getPermission();
  }

  getPermission = async () => {
    const response = await Permissions.askAsync(Permissions.LOCATION);

    if (response.status === 'granted') {
      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      this.setState({
        permissionGranted: true,
        location: {
          ...location.coords,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      });
    }
  };
  render() {
    return (
      <MapView
        showsTraffic
        style={{ flex: 1 }}
        initialRegion={this.state.location}
      />
    );
  }
}
