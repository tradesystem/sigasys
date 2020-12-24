import React, {useState, useEffect} from 'react'
import {View, Text, SafeAreaView, StyleSheet} from 'react-native'
import moment from 'moment'

import firestore from '@react-native-firebase/firestore'
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat'

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    }
})
function ChatOnline(props){
    const [user, setUser] = useState(props.route.params.userChat)
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
            <View style={styles.container}>
                <Text style={{left: 25, fontSize: 16, textAlign: 'justify'}}>{props.currentMessage.user.name}</Text>
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
            renderInputToolbar={() => <InputToolbar />}
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                id: user,
                name: user,
            }}
        />
    )
}

export default ChatOnline