import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import commonstyles from '../commonstyles'
import logo from '../assets/logo.png'
import logosiga from '../assets/logosiga.png'
import {ArrowUp, Check, CheckCircle, CheckSquare, UserCheck} from 'react-native-feather'

const styles = StyleSheet.create({
    
    container: {
        borderBottomWidth: 1, 
        borderBottomColor: commonstyles.colors.sigasysazul, 
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    containerDesmarcado: {
        borderBottomWidth: 1, 
        borderBottomColor: commonstyles.colors.sigasysazul, 
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: commonstyles.colors.sigasyscinza
    },
    nome: {
        color: 'black', 
        textAlign: 'auto',
        fontSize: 12
    },
    logo: {
        width: 20,
        height: 20
    }

})

class Item extends Component {
    
    state = {
        checked: false
    }

    alteraValor = () => {
        this.props.emp ? this.props.clicadoEmp() : this.props.ap ? this.props.clicadoAp() : this.props.clicadoEquip()
        this.setState({checked: !this.state.checked})
    }

    render(){
        
        return (
            <TouchableOpacity onPress={() => this.alteraValor()} style={styles.container}>
                <Text style={styles.nome}>{this.props.nome}</Text>
                <Check 
                    width={28} 
                    height={28} 
                    stroke={this.state.checked ? "#0f0" : "#ececec"} 
                />
            </TouchableOpacity>
        )
    }

}

export default Item