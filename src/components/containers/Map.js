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
      let location = await Location.getCurrentPositionAsync({});
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

  handleNoPermissions = () => {
    if (!this.state.permissionGranted) {
      return (
        <View>
          <Text>Need permission to display</Text>
        </View>
      );
    } else {
      return (
        <MapView
          showsTraffic
          style={{ flex: 1 }}
          initialRegion={this.state.location}
        />
      );
    }
  };
  render() {
    return this.handleNoPermissions();
  }
}
