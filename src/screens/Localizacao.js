import React, {Component} from 'react'
import {View, Text, PermissionsAndroid, StyleSheet, Alert} from 'react-native'

import Geolocation from 'react-native-geolocation-service'
import MapBoxGL from '@react-native-mapbox-gl/maps'

//MapBoxGL.setAccessToken("pk.eyJ1IjoidHJhZGVzeXN0ZW0iLCJhIjoiY2tqMXJyNnQyMXp4bDJycXQ4bnVjeWN6cSJ9.gWJllB3ldx6PocpOnqucXQ")
//MapBoxGL.setConnected(true)
MapBoxGL.setAccessToken('pk.eyJ1IjoidHJhZGVzeXN0ZW0iLCJhIjoiY2tqMXBqZDRiMjFyaDJycDIxYm41aWt3MSJ9.xYzez0sj5Ybgidne3bCvdg')
//pk.eyJ1IjoidHJhZGVzeXN0ZW0iLCJhIjoiY2tqMXBqZDRiMjFyaDJycDIxYm41aWt3MSJ9.xYzez0sj5Ybgidne3bCvdg

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    titulo: {
        flex: 1
    },
    mapa: {
        flex: 1
    }
})

class Localizacao extends Component {
    
    state = {
        latitude: 0,
        longitude: 0,
        hasLocationPermission: false
    }

    verifyLocationPermission = async () => {
        try{
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            )
            if(granted == PermissionsAndroid.RESULTS.GRANTED){
                console.log('permissão concedida')
                await this.setState({hasLocationPermission: true})
            }else{
                console.error('permissão negada')
            }
        }catch(err){
            console.warn(err)
        }
    } 

    pegaPosicaoAtual = async () => {
        if(this.state.hasLocationPermission){
            Geolocation.getCurrentPosition(
                async position => {
                    await this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude})
                    console.log(position.coords.latitude)
                },
                error => {
                    console.log(error.code, error.message)
                }
            )
        }else{
            Alert.alert('aqui')
        }
    }

    componentDidMount = async () => {
        MapBoxGL.setTelemetryEnabled(false);
        await this.verifyLocationPermission()
        await this.pegaPosicaoAtual()
        //Alert.alert(JSON.stringify(this.state.userPosition))
        //await Alert.alert('Latitude', this.state.userPosition ? this.state.userPosition.latitude : 'erro')
    }
     
    render(){
        
        //let latitude = this.state.userPosition ? this.state.userPosition.latitude : -95.099215
        //let longitude = this.state.userPosition ? this.state.userPosition.longitude : 29.583299
        let latitude = -32.03737156760161
        let longitude = -52.10169498277187
        return (
                <MapBoxGL.MapView style={styles.mapa} styleURL={MapBoxGL.StyleURL.Street}>
                    <MapBoxGL.Camera
                        //centerCoordinate={this._ma}
                        centerCoordinate={[latitude, longitude]}
                        zoomLevel={1}
                    />
                    <MapBoxGL.PointAnnotation
                        id="primeira-anotacao"
                        coordinate={[latitude, longitude]}
                    />
                </MapBoxGL.MapView>
        )
    }
}

export default Localizacao