import React, {useState, useEffect} from 'react'
import {View, Text} from 'react-native'
import moment from 'moment'

import firestore from '@react-native-firebase/firestore'
import {GiftedChat, Bubble} from 'react-native-gifted-chat'

function ChatOnline(props){
    const [user, setUser] = useState([{firstName: 'Usuario', lastname: 'Teste'}])
    const [messages, setMessages] = useState([])
    useEffect(() => {
        console.log(user)
        const db = firestore()
                    .collection('chat')
                    .orderBy('createdAt', 'desc')
                    .onSnapshot(function(doc) {
            let receivedMessages = []
            doc.docs.map(doc => {
                receivedMessages.push({
                    _id: doc.id,
                    ...doc.data(),
                })
            })
            setMessages(GiftedChat.append(messages, receivedMessages))
        })
    }, [user])

    function onSend([messages]){
        firestore()
        .collection('chat')
        .add(messages)
    }

    function renderBubble(props){
        return (
            <View>
                <Text style={{left: 90, top: 120}}>{props.currentMessage.user.name}</Text>
                <Bubble
                    {...props}
                />
            </View>
        )
    }

    return (
        <GiftedChat
            dateFormat={'YYYY'}
            timeFormat={'mm'}
            renderBubble={renderBubble}
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                id: user.id,
                name: user.firstName,
            }}
        />
    )
}

ChatOnline.navigationOptions = {
    title: 'Chat',
}

export default ChatOnline