import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Alert, FlatList, ActivityIndicator} from 'react-native'

import commonstyles from '../commonstyles'
import logo from '../assets/logo.png'
import logosiga from '../assets/logosiga.png'
import auth from '@react-native-firebase/auth'
import api from '../services/api'

//import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
//import {faDoorOpen} from '@fortawesome/free-solid-svg-icons'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: commonstyles.colors.sigasyscinza,
    },
    logo: {
        width: 100,
        height: 100,
        marginTop: 50
    },
    logosiga: {
        width: 120,
        resizeMode: 'center'
    },
    titulo: {
        fontSize: 24
    },
    input: {
        width: '90%',
        borderWidth: 1,        
        borderRadius: 5,
        borderColor: 'black',
        padding: 5,
        marginVertical: 8
    },
    botaoEntrar: {
        width: '90%',
        padding: 5,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10
    },
    equipamento: {
        width: 200
    }
})

class Inicio extends Component {
    
    state = {
        login: '',
        senha: '',
        equipamentos: [],
        empresas: [],
        teste: [],
        loading: true
    }

    componentDidMount = async () => {
        const user = await auth().currentUser
        //await this.carregaEquipamentos()
        //await this.carregaEmpresas()
        await this.setState({loading: false})
        //Alert.alert('Email', user.email)
    }

    logout = async () => {
        const user = await auth().currentUser
        if(user.email){
            await auth().signOut()
            Alert.alert('Logout', 'Logout realizado!')
            await this.props.navigation.goBack()
        }
    }

    renderLoading(){
        return (
            <ActivityIndicator size='large' color={commonstyles.colors.sigasysazul} />
        )
    }

    render(){
        
        const user = auth().currentUser
        return (

            <View style={styles.container}>
                    <Image source={logo} style={styles.logo} />
                    {user &&
                        <Text style={{color: 'white'}}>Bem vindo, {user.email}</Text>
                    }
                    <TouchableOpacity style={styles.input} onPress={() => this.props.navigation.navigate("Chamar")}>
                        <Text style={{textAlign: 'center', color: 'white'}}>Acionar Emergência</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.input}>
                        <Text style={{textAlign: 'center', color: 'white'}}>Simular Emergência</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botaoEntrar} onPress={() => this.logout()}>
                        <Text style={{textAlign: 'center', color: 'white'}}>Sair</Text>
                    </TouchableOpacity>
                    {this.state.loading &&
                        this.renderLoading()
                    }        
                    <Image source={logosiga} style={styles.logosiga} />                    
            </View>
        )
    }
}

export default Inicio

/*
<FontAwesomeIcon icon={faDoorOpen} size={20} color='white' />*/