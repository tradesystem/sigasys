import React, {Component} from 'react'
import {View, Text, PermissionsAndroid, StyleSheet, Alert} from 'react-native'

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

class Chat extends Component {
    
    state = {
        nome: 'Teste'
    }

    componentDidMount = async () => {
        Alert.alert('Chat')
    }
     
    render(){
        
        return (
            <View>
                <Text>Chat</Text>
            </View>
        )
    }
}

export default Chat