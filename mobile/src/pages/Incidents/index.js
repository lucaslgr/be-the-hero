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
    const [total, setTotal] = useState([0]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    //Análogo ao useHistory para navegação entre as rotas no react
    const navigation = useNavigation();

    //Função que faz a navegação para a rota especificada definida na routes.js na tag AppStack.Screen
    function navigateToDetail(incident){
        navigation.navigate('Detail', {incident});
    }

    //Função responsável por carregar através de requisição http do tipo get os incidents gravados no banco
    async function loadIncidents(){
        //Se já esta carregando mais conteudos, não tentar começar o processo de páginação dnvs
        if (loading == true) {
            return;
        }
        //Se já carregou todos conteúdos.. FIM
        if(total > 0 && incidents.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get(
            'incidents',{
            params: { page }
        });
        
        /**
         * Anexando todos "incidents" e todo "data" nos arrays que já foram setados dentro do setIncidents pois se não o 
         * array seria sobreescrito toda vez que fizesse a requisição, e queremos apenas deixar o conteúdo que foi pego 
         * na última requisição e anexar os novos conteúdos de acordo com a página.
        */
        setIncidents([...incidents, ...response.data]);
        
        //Pegando o número total de caso no header da resposta da requisição
        setTotal(response.headers['x-total-count']);
        
        //Mudando a pagina
        setPage(page + 1);
        
        //Após pegar a response da requisição GET libera o loading novamente 
        setLoading(false);
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
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
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
                // showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                //Função responsável por renderizar os itens da FlatList
                renderItem={({ item: incident })=> (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {
                                Intl.NumberFormat(
                                    'pt-BR',
                                    {style: 'currency', currency:'BRL'}
                                ).format(incident.value)
                            }
                        </Text>
                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(incident)}
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