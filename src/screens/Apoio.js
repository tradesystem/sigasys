import React, {Component} from 'react'
import {View, SafeAreaView, StyleSheet, Text, FlatList, ScrollView, ActivityIndicator, Alert, Image} from 'react-native'
import {CheckBox, ListItem, Body} from 'native-base'

import commonstyles from '../commonstyles'
import api from '../services/api'
import moment from 'moment'

import logo from '../assets/logo.png'
import logosiga from '../assets/logosiga.png'
import { TouchableOpacity } from 'react-native-gesture-handler'

import Item from '../components/Item'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: commonstyles.colors.sigasyscinza,
    },
    cabecalho: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        //alignItems: 'baseline',
        width: '100%',
        marginTop: 10,
        flex: 2
    },
    logo: {
        width: 60,
        height: 60,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 50
    },
    tiposEmergencia: {
        flexDirection: 'row',
        width: 150,
        marginTop: 8,
    },
    listaEquipamentos: {
        width: '90%',
        height: 80,
        marginVertical: 20,
        backgroundColor: 'white',
        borderRadius: 4,
        padding: 5,
        flex: 3
    },
    listaEmpresas: {
        width: '90%',
        height: 80,
        backgroundColor: 'white',
        borderRadius: 4,
        padding: 5,
        flex: 5,
        marginBottom: 15
    },
    botaoProximo: {
        width: 300,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itens: {
        borderBottomWidth: 1, 
        borderBottomColor: commonstyles.colors.sigasysazul, 
        marginBottom: 12
    },
    rodape: {
        flex: 2,
        alignItems: 'flex-end'
    },
    logoRodape: {
        width: 110,
        resizeMode: 'center'
    }
})

class Apoio extends Component {
    
    state = {
        apoios: [],
        apoiosSelecionados: [],
        loading: true,
        empresas: [],
        equipamentos: [],
        pam: false,
        paporg: false
    }

    componentDidMount = async () => {
        await this.carregaApoios()
        //await this.carregaEmpresas()
        await this.setState({loading: false})
        if(this.props.route.params.empresas){
            await this.setState({empresas: this.props.route.params.empresas})
        }
        if(this.props.route.params.equipamentos){
            await this.setState({equipamentos: this.props.route.params.equipamentos})
        }
        if(this.props.route.params.pam){
            await this.setState({pam: this.props.route.params.pam})
        }
        if(this.props.route.params.paporg){
            await this.setState({paporg: this.props.route.params.paporg})
        }
        //Alert.alert(this.state.equipamentos[0])
    }

    carregaApoios = async () => {
        await api.get('wsapp/ws_apoio.php')
            .then(
                async res => {
                    let json = await JSON.stringify(res.data)
                    let obj = JSON.parse(json)
                    if(obj.apoio){
                        await this.setState({apoios: obj.apoio})
                    }
                    //Alert.alert("equipamentos", `${this.state.apoios}`) 
                },
                async res => Alert.alert('Erro', 'Erro de banco de dados') 
            )
    }

    proximaTela = async () => {
        
        let equipamentos = JSON.stringify(this.state.equipamentos)
        let empresas = JSON.stringify(this.state.empresas)
        let apoios = JSON.stringify(this.state.apoiosSelecionados)
        let datahora = await moment().format('YYYY_MM_DD_hh_mm_ss').toString()
        let colecao = `chat_${datahora}`
        //console.log(equipamentos)
        let data = new FormData()
        data.append("equipamentos", equipamentos)
        data.append("empresas", empresas)
        data.append("apoios", apoios)
        data.append("colecao", colecao)
        await api.post('wsapp/notificacao.php', data, {
        }).then(
            async res => {
                Alert.alert("chamado aberto!")
                await this.props.navigation.navigate('ChatOnline', {
                    userChat: 'Chamado',
                    colecao: colecao
                })
            },
            async res => await Alert.alert('Erro', 'Tente novamente!')
        )
        //Alert.alert("Chamado Aberto!")
    }
    

    clicar = async (nome) => {
        if(this.state.apoiosSelecionados.indexOf(nome) == -1){
            await this.setState({apoiosSelecionados: [...this.state.apoiosSelecionados, nome]})
            //Alert.alert("Inserido", JSON.stringify(this.state.apoiosSelecionados))
        }else{
            let posicao = this.state.apoiosSelecionados.indexOf(nome)
            let temp = this.state.apoiosSelecionados
            temp.splice(posicao, 1)
            await this.setState({apoiosSelecionados: temp})
            //Alert.alert("Removido", JSON.stringify(this.state.apoiosSelecionados))
        }
    }
    
    render(){
        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.cabecalho}>
                    <Image style={styles.logo} source={logo} />
                    <View>
                        <Text>Tipo de Emergência</Text>
                        <View style={styles.tiposEmergencia}>
                                <CheckBox checked={this.state.pam} onPress={() => this.setState({pam: this.state.pam})} style={{borderColor: 'white'}}/>
                                <Body>
                                    <Text>PAM</Text>
                                </Body>
                                <CheckBox checked={this.state.paporg} onPress={() => this.setState({paporg: this.state.paporg})} style={{borderColor: 'white'}}/>
                                <Body>
                                    <Text>PAPORG</Text>
                                </Body>
                        </View>
                    </View>
                </View>

                <View style={styles.listaEmpresas}>
                    <Text>Selecione o(s) Apoio(s) Técnico(s)</Text>
                    {!this.state.loading &&
                        <FlatList
                            ListEmptyComponent={<View style={styles.equipamento}><Text style={{color: 'white'}}>Sem itens</Text></View>}
                            data={this.state.apoios}
                            keyExtractor={(item) => `${item.nome}`}
                            renderItem={({item, index}) =>
                              <Item ap clicadoAp={() => this.clicar(item.nome)} nome={item.nome} />
                            }
                        />
                    }
                    {this.state.loading &&
                        <ActivityIndicator size='large' color={commonstyles.colors.sigasysazul} />
                    } 
                </View> 
                
                <View style={styles.rodape}>
                    <TouchableOpacity style={styles.botaoProximo} onPress={() => this.proximaTela()}>
                        <Text>Iniciar Chamado</Text>    
                    </TouchableOpacity>
                    <Image source={logosiga} style={styles.logoRodape}/>
                </View> 
            </SafeAreaView>
        )
    }
}

export default Apoio