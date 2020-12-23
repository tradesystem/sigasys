import React, {Component} from 'react'
import {View, SafeAreaView, StyleSheet, Text, FlatList, ScrollView, ActivityIndicator, Alert, Image} from 'react-native'
import {CheckBox, ListItem, Body} from 'native-base'

import commonstyles from '../commonstyles'
import api from '../services/api'

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
        marginBottom: 10,
        flex: 1
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
        height: 120,
        marginVertical: 20,
        backgroundColor: 'white',
        borderRadius: 4,
        padding: 5,
        flex: 3
    },
    selecione: {
        textAlign: 'left', 
        marginBottom: 5,
        color: commonstyles.colors.sigasyscinza,
        fontSize: 16
    },
    listaEmpresas: {
        width: '90%',
        height: 80,
        backgroundColor: 'white',
        borderRadius: 4,
        padding: 5,
        flex: 3
    },
    itens: {
        borderBottomWidth: 1, 
        borderBottomColor: commonstyles.colors.sigasysazul, 
        marginBottom: 12
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
    rodape: {
        flex: 1,
        //alignItems: 'flex-end',
    },
    logoRodape: {
        width: 110,
        resizeMode: 'center'
    }
})

class Chamar extends Component {
    
    state = {
        equipamentos: [],
        equipamentosSelecionados: [],
        empresas: [],
        empresasSelecionadas: [],
        teste: [],
        loading: true,
        pam: false,
        pei: false,
        pesquisaEmpresa: '',
        pesquisaCenario: ''
    }

    componentDidMount = async () => {
        await this.carregaCenarios()
        await this.carregaEmpresas()
        await this.setState({loading: false})
        //Alert.alert('Email', user.email)
    }

    carregaCenarios = async () => {
        await api.get('wsapp/ws_cenarios.php')
            .then(
                async res => {
                    let json = await JSON.stringify(res.data)
                    //Alert.alert(json)
                    let obj = JSON.parse(json)
                    if(obj.cenarios){
                        await this.setState({equipamentos: obj.cenarios})
                    }
                    
                    //Alert.alert("equipamentos", `${this.state.equipamentos}`) 
                },
                async res => Alert.alert('Erro', 'Erro de banco de dados') 
            )
    }

    carregaEmpresas = async () => {
        await api.get('wsapp/ws_emp.php')
            .then(
                async res => {
                    let json = await JSON.stringify(res.data)
                    let obj = JSON.parse(json)
                    if(obj.empresas){
                        await this.setState({empresas: obj.empresas})
                    }
                    //Alert.alert("empresas", `${this.state.empresas[0].nome}`) 
                },
                async res => Alert.alert('Erro', 'Erro de banco dados') 
            )
    }

    proximaTela = () => {
        this.props.navigation.navigate("Apoio", 
            {
                equipamentos: this.state.equipamentosSelecionados,
                empresas: this.state.empresasSelecionadas,
                pam: this.state.pam,
                pei: this.state.pei
            }
        )
    }

    clicarEmpresa = async (nome) => {
        if(this.state.empresasSelecionadas.indexOf(nome) == -1){
            await this.setState({empresasSelecionadas: [...this.state.empresasSelecionadas, nome]})
            //Alert.alert("Inserido", JSON.stringify(this.state.empresasSelecionadas))
        }else{
            let posicao = this.state.empresasSelecionadas.indexOf(nome)
            let temp = this.state.empresasSelecionadas
            temp.splice(posicao, 1)
            await this.setState({empresasSelecionadas: temp})
            //Alert.alert("Removido", JSON.stringify(this.state.empresasSelecionadas))
        }
    }

    clicarEquipamento = async (nome) => {
        if(this.state.equipamentosSelecionados.indexOf(nome) == -1){
            await this.setState({equipamentosSelecionados: [...this.state.equipamentosSelecionados, nome]})
            //Alert.alert("Inserido", JSON.stringify(this.state.equipamentosSelecionados))
        }else{
            let posicao = this.state.equipamentosSelecionados.indexOf(nome)
            let temp = this.state.equipamentosSelecionados
            temp.splice(posicao, 1)
            await this.setState({equipamentosSelecionados: temp})
            //Alert.alert("Removido", JSON.stringify(this.state.equipamentosSelecionados))
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
                                <CheckBox checked={this.state.pam} onPress={() => this.setState({pam: !this.state.pam})} style={{borderColor: 'white'}} />
                                <Body>
                                    <Text>PAM</Text>
                                </Body>
                                <CheckBox checked={this.state.pei} onPress={() => this.setState({pei: !this.state.pei})} style={{borderColor: 'white'}} />
                                <Body>
                                    <Text>PEI</Text>
                                </Body>
                        </View>
                    </View>
                </View>

                <View style={styles.listaEmpresas}>
                    <Text style={styles.selecione}>Selecione a(s) empresa(s)</Text>
                        {!this.state.loading &&
                            <FlatList
                                ListEmptyComponent={<View><Text style={{color: 'black'}}>Sem itens</Text></View>}
                                data={this.state.empresas}
                                keyExtractor={(item) => `${item.nome}`}
                                renderItem={({item, index}) =>
                                    <Item emp clicadoEmp={() => this.clicarEmpresa(item.nome)} nome={item.nome} />
                                }
                             />
                            }
                            {this.state.loading &&
                                <ActivityIndicator size='large' color={commonstyles.colors.sigasysazul} />
                            } 
                    </View> 
                <View style={styles.listaEquipamentos}>        
                    <Text style={styles.selecione}>Selecione o(s) cenário(s)</Text>
                    {!this.state.loading &&
                        <FlatList
                                ListEmptyComponent={<Text style={{color: 'black'}}>Sem itens</Text>}
                                data={this.state.equipamentos}
                                keyExtractor={(item) => `${item.id}`}
                                renderItem={({item, index}) =>
                                    <Item equip clicadoEquip={() => this.clicarEquipamento(item.descricao)} nome={item.descricao} />
                                }
                            />
                        }
                        {this.state.loading &&
                            <ActivityIndicator size='large' color={commonstyles.colors.sigasysazul} />
                        }  
                    </View> 
                <View style={styles.rodape}>
                    <TouchableOpacity onPress={() => this.proximaTela()} style={styles.botaoProximo}>
                        <Text>PRÓXIMO</Text>    
                    </TouchableOpacity>
                    <Image source={logosiga} style={styles.logoRodape}/>
                </View> 
            </SafeAreaView>
        )
    }
}

export default Chamar

/*
<View style={styles.itens}>
    <Text style={{color: 'black', textAlign: 'auto'}}>{item.nome}</Text>
</View>
*/