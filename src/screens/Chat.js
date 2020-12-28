import React, { Component } from 'react'
import { GiftedChat, Bubble, SystemMessage, Send } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore'
import {View, Text, ActivityIndicator, Alert, StyleSheet} from 'react-native'
import commonstyles from '../commonstyles'

const styles = StyleSheet.create({
  container: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
  }
})

const user = {
  _id: 1,
  name: 'Dev'
}

const otherUser = {
  _id: 2,
  name: 'React Native'
}

class Chat extends Component{
  
  state = {
    inverted: false,
    step: 0,
    messages: []
  }

  _isMounted = false

  componentDidMount = async () => {
    this._isMounted = true
    await this.setState({
      appIsReady: true,
      isTyping: false
    })
    await this.carregarMensagens()
  }

  componentWillUnmount(){
    this._isMounted = false
  }

  carregarMensagens = async () => {
    let mensagensRecebidas = []
    const db = firestore()
      .collection('chat')
      .orderBy('createdAt', 'desc')
      .onSnapshot(async function(doc){
            doc.docs.map(async doc => {
              await mensagensRecebidas.push({
                _id: doc.id,
                createdAt: new Date(),
                ...doc.data()
              })
            })
            //console.log(mensagensRecebidas)
            //this.setState({messages: GiftedChat.append(mensagensRecebidas)})
      })
      this.setState({messages: mensagensRecebidas})
      /*this.setState((previousState) => {
        return {
          messages: GiftedChat.append(
            previousState.messages,
            [mensagensRecebidas]
          )
        }
      })
      */
  }

  onSend = ([messages]) => {
    firestore()
    .collection(`chat`)
    .add(messages)
  }

  renderBubble = (props) => {
    return (
      <View style={styles.container}>
          <View style={{backgroundColor: commonstyles.colors.sigasysazul, borderRadius: 20, padding: 5}}>
              <Text style={{right: 1, fontSize: 16, textAlign: 'justify', color: 'white'}}>{props.user.id} - {props.user.name}</Text>
          </View>
          <Bubble
              {...props}
          />
      </View>
  )
  }

  render(){
    return (
        <GiftedChat
            renderLoading={() => <ActivityIndicator size='large' color={commonstyles.colors.sigasysazul} />}
            renderBubble={this.renderBubble}
            messages={this.state.messages}
            onSend={mensagem => this.onSend(mensagem)}
            user={{
              id: user._id,
              name: user.name
            }}
        />
    )
  }


}

export default Chat