import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack'

import Auth from './screens/Auth'
import Inicio from './screens/Inicio'
import Localizacao from './screens/Localizacao'
import Chamar from './screens/Chamar'
import Cadastro from './screens/Cadastro'
import Apoio from './screens/Apoio'
import Chat from './screens/Chat'
import ChatOnline from './screens/ChatOnline'

import commonstyles from './commonstyles'

const Stack = createStackNavigator()

function Navigator(){
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="Login" 
                headerMode='screen'
            >
                <Stack.Screen name="Login" component={Auth} options={{
                       title: 'SigaSys',
                       headerStyle: {backgroundColor: commonstyles.colors.sigasysazul},
                       headerTintColor: 'white',
                    }}
                />
                <Stack.Screen 
                    name="Inicio" 
                    component={Inicio} 
                    options={{
                       headerTintColor: '#ececec',
                       headerBackTitle: '',
                       headerStyle: {backgroundColor: commonstyles.colors.sigasysazul},
                       ...TransitionPresets.SlideFromRightIOS
                    }}
                />
                <Stack.Screen 
                    name="Localizacao" 
                    component={Localizacao} 
                    options={{
                       headerTintColor: '#ececec',
                       headerBackTitle: '',
                       headerStyle: {backgroundColor: commonstyles.colors.sigasysazul},
                       ...TransitionPresets.ModalPresentationIOS
                    }}
                />
                <Stack.Screen 
                    name="Chamar" 
                    component={Chamar} 
                    options={{
                       headerTintColor: '#ececec',
                       headerBackTitle: '',
                       headerStyle: {backgroundColor: commonstyles.colors.sigasysazul},
                       ...TransitionPresets.SlideFromRightIOS
                    }}
                />
                <Stack.Screen 
                    name="Apoio" 
                    component={Apoio} 
                    options={{
                       headerTintColor: '#ececec',
                       headerBackTitle: '',
                       headerStyle: {backgroundColor: commonstyles.colors.sigasysazul},
                       ...TransitionPresets.SlideFromRightIOS
                    }}
                />
                <Stack.Screen 
                    name="Cadastro" 
                    component={Cadastro} 
                    options={{
                       headerTintColor: '#ececec',
                       headerBackTitle: '',
                       headerStyle: {backgroundColor: commonstyles.colors.sigasysazul},
                       ...TransitionPresets.ModalPresentationIOS
                    }}
                />
                <Stack.Screen 
                    name="Chat" 
                    component={Chat} 
                    options={{
                       headerTintColor: '#ececec',
                       headerBackTitle: '',
                       headerStyle: {backgroundColor: commonstyles.colors.sigasysazul},
                       ...TransitionPresets.ModalPresentationIOS
                    }}
                />
                <Stack.Screen 
                    name="ChatOnline" 
                    component={ChatOnline} 
                    options={{
                       headerTintColor: '#ececec',
                       headerBackTitle: '',
                       headerStyle: {backgroundColor: commonstyles.colors.sigasysazul},
                       ...TransitionPresets.ModalPresentationIOS
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator