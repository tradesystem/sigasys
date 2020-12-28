import React, {useState, useEffect} from 'react'
import {View, Text, SafeAreaView, StyleSheet, ActivityIndicator} from 'react-native'
import moment from 'moment'
import commonstyles from '../commonstyles'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat'

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    }
})

//const user = auth().currentUser

function ChatOnline(props){
    //const [user, setUser] = useState([props.route.params.userChat])
    const [user, setUser] = useState(['Teste trade'])
    const [messages, setMessages] = useState([])
    //const [user, setUser] = useState([auth().currentUser])

    //const [hora, setHora] = useState([moment().format('YYYY_MM_DD_hh_mm_ss').toString()])
    //const [collection, setCollection] = useState([props.route.params.colecao ? props.route.params.colecao : `chat_${hora}`])
    const [collection, setCollection] = useState(['chat'])
    useEffect(() => {
        //console.log(user)
        const db = firestore()
                    .collection(`${collection}`)
                    .orderBy('createdAt', 'desc')
                    .onSnapshot(function(doc) {
                        let receivedMessages = []
                        doc.docs.map(doc => {
                        let fire = doc.get('createdAt')
                        let data = new Date(fire.seconds * 1000)
                        receivedMessages.push({
                            _id: doc.id,
                            createdAt: new Date(),
                            ...doc.data(),
                    })
            })
            setMessages(GiftedChat.append(messages, receivedMessages))
        })
    }, [user])

    function onSend([messages]){
        firestore()
        .collection(`${collection}`)
        .add(messages)
    }

    function renderBubble(props){
        return (
            <View style={styles.container}>
                <View style={{backgroundColor: commonstyles.colors.sigasysazul, borderRadius: 20, padding: 5}}>
                    <Text style={{right: 1, fontSize: 16, textAlign: 'justify', color: 'white'}}>{props.user.id} - {props.user.hora}</Text>
                </View>
                <Bubble
                    {...props}
                />
            </View>
        )
    }

    return (
        <GiftedChat
            renderLoading={() => <ActivityIndicator size='large' color={commonstyles.colors.sigasysazul} />}
            renderBubble={renderBubble}
            //renderInputToolbar={() => <InputToolbar />}
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                id: user,
                name: user,
                hora: messages.hora
            }}
        />
    )
}

export default ChatOnline