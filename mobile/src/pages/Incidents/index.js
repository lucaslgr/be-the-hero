import React, {useEffect, useState} from 'react';
import {Feather} from '@expo/vector-icons';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native'; //Componente utilizado para fazer o link no botão para outra pagina, análogo ao useHistory do react

//Importando a api fornecida pelo pacote axios em services.js para fazer requisições HTTP
import api from '../../services/api';

//Importando a logo do projeto
import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {
    //Definição dos estados de todas variáveis que estarão vinculadas com frontend do app mobile
    const [incidents, setIncidents] = useState([]);

    //Análogo ao useHistory para navegação entre as rotas no react
    const navigation = useNavigation();

    //Função que faz a navegação para a rota especificada definida na routes.js na tag AppStack.Screen
    function navigateToDetail(){
        navigation.navigate('Detail');
    }

    //Função responsável por carregar através de requisição http do tipo get os incidents gravados no banco
    async function loadIncidents(){
        const response = await api.get('incidents');
        setIncidents(response.data);
    }

    /**
     * O useEffect é utilizado para disparar uma função em algum determinado momento do componente
     * 1º Parametro: Qual funÃ§Ã£o deve ser executada     
     * 2º Parametro: Quando essa funÃ§Ã£o vai ser executada, passando um array de dependências onde todas vez que as informações que estiverem dentro desse array mudarem o useEffect vai executar a função passada no primeiro parâmetro novamente
    */
    useEffect(() => {
        loadIncidents();
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>0 casos</Text>.
                </Text>
            </View>
            <Text style={styles.title}>
                Bem-vindo!
            </Text>
            <Text style={styles.description}>
                Escolha um dos casos abaixo e salve o dia.
            </Text>
            <FlatList
                //Id de cada incident
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                //Função responsável por renderizar os itens da FlatList
                renderItem={({ item: incident })=> (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>{incident.value}</Text>
                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={navigateToDetail}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041"/>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}