import apiOneSignal from '../services/apiOneSignal'
import { Alert } from 'react-native'

static function enviarNotificacao(){
    return Alert.Alert("Teste", 'Notificação teste')
}