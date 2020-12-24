import React, {Component} from 'react'
import {View, 
        Text, 
        TouchableOpacity, 
        StyleSheet, 
        Image, 
        TextInput, 
        KeyboardAvoidingView,
        SafeAreaView, 
        Alert,
        PermissionsAndroid,
        Animated
    } 
    from 'react-native'

import commonstyles from '../commonstyles'
import logo from '../assets/logo.png'
import logosiga from '../assets/logosiga.png'
import auth from '@react-native-firebase/auth'
import OneSignal from 'react-native-onesignal'

import Geolocation from 'react-native-geolocation-service'

//pk.eyJ1IjoidHJhZGVzeXN0ZW0iLCJhIjoiY2tqMXBqZDRiMjFyaDJycDIxYm41aWt3MSJ9.xYzez0sj5Ybgidne3bCvdg

const styles = StyleSheet.create({
    
    containerKeyboard: {
        flex: 1,
        backgroundColor: commonstyles.colors.sigasyscinza,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    containerLogo: {
        flex: 3
    },
    containerCentral: {
        flex: 4
    },
    containerRodape: {
        flex: 4,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },  
    logo: {
        width: 90,
        height: 90,
        marginTop: 5,
        marginBottom: 2
    },
    logosiga: {
        width: 100,
        resizeMode: 'center',
    },
    titulo: {
        fontSize: 24
    },
    input: {
        width: 300,
        borderWidth: 1,        
        borderRadius: 8,
        borderColor: 'black',
        backgroundColor: 'white',
        padding: 5,
        marginVertical: 8
    },
    botaoEntrar: {
        width: 300,
        paddingVertical: 12,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10
    },
    botaoDesabilitado: {
        width: 300,
        paddingVertical: 12,
        borderColor: 'white',
        color: '#000',
        backgroundColor: '#ececec',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10
    }
})

class Auth extends Component {
    
    state = {
        login: 'teste@sigarg.com.br',
        senha: 'teste123',
        userPosition: null,
        hasLocationPermission: false
    }

    verifyLocationPermission = async () => {
        try{
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            )
            if(granted === PermissionsAndroid.RESULTS.GRANTED){
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
                    await this.setState(
                        {
                            userPosition: {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            }
                        }
                    )
                },
                error => {
                    //console.log(error.code, error.message)
                }
            )
        }
    }

    handleLogin = async () => {
        //Alert.alert("aqui", 'entrou aqui')
        await auth()
        .signInWithEmailAndPassword(this.state.login, this.state.senha)
        .then(() => {
            Alert.alert('Sucesso', 'Login realizado!')
            this.props.navigation.navigate('Inicio')
        })
        .catch(error => Alert.alert('Erro', error.message)) 
    }

    componentDidMount = async () => {
        OneSignal.init("f7e3d68d-b469-469a-9017-a856851a7831")
        OneSignal.addEventListener('received', this.receivedPush)
        OneSignal.addEventListener('opened', this.openedPush)
        OneSignal.addEventListener('ids', this.idsPush)
        await this.verifyLocationPermission()
        await this.pegaPosicaoAtual()
    }

    receivedPush(push){
        console.log(`Received Push: ${push}`)
    }

    openedPush(push){
        console.log(`Opened Push: ${push}`)
    }

    idsPush(push){
        console.log(`IDS Push: ${push}`)
    }

    render(){

        const user = auth().currentUser
        const validations = []
        validations.push(this.state.senha && this.state.senha.length >= 3)
        validations.push(this.state.login && this.state.login.includes('@'))
        
        
        //o formulário só será válido se todas as validações forem verdadeiras, com este reduce implementado
        const validForm = validations.reduce((t, a) => t && a)

        return (
            <KeyboardAvoidingView style={styles.containerKeyboard}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.containerLogo}>
                        <Image source={logo} style={styles.logo} />
                    </View>
                    {!user &&
                        <Text style={{color: 'white'}}>Faça login</Text>
                    }
                    <View style={styles.containerCentral}>      
                        <TextInput style={styles.input} value={this.state.login} placeholder='E-mail' onChangeText={(val) => this.setState({login: val})} />
                        <TextInput secureTextEntry style={styles.input} value={this.state.senha} placeholder='senha' onChangeText={(val) => this.setState({senha: val})} />
                        <TouchableOpacity disabled={!validForm} style={validForm ? styles.botaoEntrar : styles.botaoDesabilitado} onPress={() => this.handleLogin()}>
                            <Text style={{textAlign: 'center', color: 'white'}}>Entrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botaoEntrar} onPress={() => this.props.navigation.navigate('Cadastro')}>
                            <Text style={{textAlign: 'center', color: 'white'}}>Solicitar Acesso ao Sistema</Text>    
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerRodape}>                    
                        <Image source={logosiga} style={styles.logosiga} />
                    </View>  
                </SafeAreaView>
            </KeyboardAvoidingView>
        )
    }
}

export default Auth

/*
<FontAwesomeIcon icon={faDoorOpen} size={20} color='white' />
<Text>Latitude: {this.state.userPosition ? this.state.userPosition.latitude : ''}</Text>          
                        <Text>Longitude: {this.state.userPosition ? this.state.userPosition.longitude : ''}</Text>  
*/