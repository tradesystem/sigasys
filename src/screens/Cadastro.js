import React, {Component} from 'react'
import {View, ScrollView, Text, StyleSheet, TextInput, KeyboardAvoidingView, Image, Alert, TouchableOpacity} from 'react-native'
import logo from '../assets/logo.png'
import {Item, Picker} from 'native-base' 

import commonstyles from '../commonstyles'
import api from '../services/api'
import { SafeAreaView } from 'react-native-safe-area-context'

const styles = StyleSheet.create({
  
  containerKeyboard: {
      backgroundColor: commonstyles.colors.sigasyscinza,
      flex: 1
  },
  containerHeader: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },    
  containerScroll: {
    flex: 6,
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: commonstyles.colors.sigasysazul,
    padding: 15
  },
  containerBotao: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 20
  },
  titulo: {
    fontSize: 20,
    color: commonstyles.colors.sigasysazul,
    marginBottom: 10
  },
  input: {
      borderColor: commonstyles.colors.sigasysazul,
      borderWidth: 1,
      borderRadius: 5,
      width: 300,
      padding: 7,
      backgroundColor: 'white',
      marginBottom: 10
  },
  picker: {
      marginVertical: 20
  },
  botaoEnviar: {
    margin: 10,
    padding: 12,
    borderRadius: 8,
    backgroundColor: commonstyles.colors.sigasysazul,
  },
  botaoNaoEnviar: {
    margin: 10,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },    
})

class Cadastro extends Component {
    
    state = {
        matricula: '',
        empresa: 0,
        nome: '',
        telefone: '',
        funcao: '',
        nivel: 0,
        email: '',
        senha: '',
        confirmaSenha: '',
        empresas: [],
        niveis: []
    }

    componentDidMount = async () => {
        await this.carregarEmpresas()
    }

    enviarDadosCadastro = async () => {
        let data = new FormData()
        data.append("matricula", this.state.matricula)
        data.append("empresa", this.state.empresa)
        data.append("nome", this.state.nome)
        data.append("nivel", this.state.nivel)
        data.append("senha", this.state.senha)
        data.append("tel", this.state.telefone)
        data.append("funcao", this.state.empresa)
        data.append("email", this.state.email)

        await api.post('wsapp/ins_sol_usu_ap.php', data, {
        }).then(
            async res => await Alert.alert('Sucesso', res.data),
            async res => await Alert.alert("Erro", res.data)
        )
    }

    carregarEmpresas = async () => {
        await api.get('wsapp/ws_emp.php')
            .then(
                async res => {
                    let json = await JSON.stringify(res.data)
                    let obj = JSON.parse(json)
                    if(obj.empresas){
                        await this.setState({empresas: obj.empresas})
                    }
                    //Alert.alert("empresas", `${obj}`) 
                },
                async res => Alert.alert('Erro', 'Erro de banco de dados') 
            )
    }

    onNivelValueChange(value) {
        this.setState({
          nivel: value,
        });
    }

    listaEmpresas = () => {
        return( this.state.empresas.map( (x, i) => { 
              return( <Picker.Item label={x.nome} key={i} value={i + 1}  />)} ))
    }

    onEmpresaValueChange(value) {
        this.setState({
          empresa: value,
        });
    }
    
    render(){

        const validations = []
        validations.push(this.state.nome && this.state.nome.length >= 3)
        //validations.push(this.state.matricula && this.state.matricula > 0)
        validations.push(this.state.nivel && this.state.nivel > 0)
        validations.push(this.state.senha && this.state.senha.length >= 3)
        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.confirmaSenha && this.state.senha === this.state.confirmaSenha)
        
        //o formulário só será válido se todas as validações forem verdadeiras, com este reduce implementado
        const validForm = validations.reduce((t, a) => t && a)

        return (
            <KeyboardAvoidingView style={styles.containerKeyboard}>
                <View style={styles.containerHeader}>
                    <Image source={logo} style={styles.logo} /> 
                    <Text style={styles.titulo}>Faça seu Cadastro</Text>
                </View>
                <View style={styles.containerScroll}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    > 
                        <TextInput style={styles.input} placeholder='Matrícula' value={this.state.matricula} onChangeText={(val) => this.setState({matricula: val})} />
                        <Item picker style={styles.picker}>
                            <Picker
                                mode="dropdown"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                style={{ width: 100 }}
                                selectedValue={this.state.empresa}
                                onValueChange={this.onEmpresaValueChange.bind(this)}
                            >
                                <Picker.Item label="Selecione a Empresa" value={0} />
                                {this.listaEmpresas()}
                            </Picker>
                        </Item>
                        <TextInput style={styles.input} placeholder='Nome' value={this.state.nome} onChangeText={(val) => this.setState({nome: val})} />
                        <TextInput style={styles.input} placeholder='Telefone' value={this.state.telefone} onChangeText={(val) => this.setState({telefone: val})} />
                        <TextInput style={styles.input} placeholder='Função' value={this.state.funcao} onChangeText={(val) => this.setState({funcao: val})} />
                        <Item picker style={styles.picker}>
                            <Picker
                                mode="dropdown"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                style={{ width: 100 }}
                                selectedValue={this.state.nivel}
                                onValueChange={this.onNivelValueChange.bind(this)}
                            >
                                <Picker.Item label="Selecione o Nível" value={0} />
                                <Picker.Item label="Usuário" value={1} />
                                <Picker.Item label="Administrador" value={2} />
                            </Picker>
                        </Item>
                        <TextInput style={styles.input} placeholder='Email' value={this.state.email} onChangeText={(val) => this.setState({email: val})} />
                        <TextInput style={styles.input} placeholder='Senha' value={this.state.senha} onChangeText={(val) => this.setState({senha: val})} secureTextEntry={true}/>
                        <TextInput style={styles.input} placeholder='Confirme a senha' value={this.state.confirmaSenha} onChangeText={(val) => this.setState({confirmaSenha: val})} secureTextEntry={true}/>
                    </ScrollView>
                </View>
           
                <View style={styles.containerBotao} >
                    <TouchableOpacity disabled={!validForm} style={validForm ? styles.botaoEnviar : styles.botaoNaoEnviar} onPress={() => this.enviarDadosCadastro()}>
                        <Text style={{textAlign: 'center', color: 'white'}}>Enviar dados</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

/*{this.listaEmpresas()}*/

export default Cadastro
