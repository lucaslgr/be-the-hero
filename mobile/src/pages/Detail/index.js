import React from 'react';
import {Feather} from '@expo/vector-icons';

//Pacote Linking utilizado para fazer a chamada do app whatsapp
import {View, Image, TouchableOpacity, Text, Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import logoImg from '../../assets/logo.png';

//Pacote utilizado para a chamada do app gmail
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';

export default function Detail() {
    //Análogo ao useHistory para navegação entre as rotas no react
    const navigation = useNavigation();
    const message = 'Olá APAE estou entrando em contato pois gostaria de ajudar no caso "Cadelinha atropelada" com o valor de R$120,00';

    //Função para navegar para página anterior
    function navigateBack(){
        navigation.goBack()
    }

    function senMail(){
        MailComposer.composeAsync({
            subject: 'Herói do caso: Cadelinha atropelada',
            recipients: ['lucaslgr1206@gmail.com'],
            body: message,
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=5532988094352&text=${message}`);
    }   

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E82041"/>
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
                <Text style={styles.incidentValue}>APAE</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>Cadelinha atropelada:</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>R$ 120,00:</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o heroí desse caso.</Text>
                <Text style={styles.heroDescription}>Entre em contato:</Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={senMail}>
                        <Text style={styles.actionText}>E-mai</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}