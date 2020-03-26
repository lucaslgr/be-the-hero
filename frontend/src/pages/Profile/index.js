import React, {useState, useEffect} from 'react';

//Importando o arquivo de estilo da pagina
import './style.css';

import { Link, useHistory } from 'react-router-dom';

//Importando o nosso client HTTP fornecido pelo AXIOS
import api from '../../services/api'; 

//Importando a logo.svg
import logoImg from '../../assets/logo.svg';

//Importando icone do pacote react-icons
import {FiPower, FiTrash2} from 'react-icons/fi'; 

//Exportando a função que retorna o component do Profile, a página no caso
export default function Profile(){
    //Definindo os states de cada variável que vai estar vinculado aos inputs
    const [incidents, setIncidents] = useState([]);
    
    /**
     * O history serve para fazer navegação através de uma função javascript
    */
    const history = useHistory();
    
    //Pegando o name e o id da ONG no localStorage do navegador que foi salvo quando a ONG fez logon
    const ongname = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    /**
     * O useEffect é utilizado para disparar uma função em algum determinado momento do componente
     * 1º Parametro: Qual função deve ser executada
     * 2º Parametro: Quando essa função vai ser executada, passando um array de dependências onde todas vez que as informações que estiverem dentro desse array mudarem o useEffect vai executar a função passada no primeiro parâmetro novamente
    */
    useEffect( () => {
        //Fazendo requisição get passando no header da requisição no campo Authorization o Id da ONG 
        api.get('profile',{
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId]);

    //Função para deletar um incident, que está associada ao botão com icone do icon trash2
    async function handleDeleteIncident(id){
        try {
            //Fazendo a requisição DELETE na rota incidentes e passando o id do incident a ser deletado para o backend
            await api.delete(`incidents/${id}`,{
                headers: {
                    Authorization: ongId
                }
            });

            //Remove da minha lista visual de incidents o incident que tiver o id igual ao id do incident que foi executada a requisiçãod e DELETE acima
            setIncidents(incidents.filter(
                incident => incident.id !== id
            ));

        } catch (error) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    //Função que faz o logout do usuário
    function handleLogout() {
        //Limpando o localStorage do navegador
        localStorage.clear();

        //Redirecionando o user para a página inicial
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongname}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id} >
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                        <strong>VALOR:</strong>
                        <p>{
                            Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})
                            .format(incident.value)
                            }
                        </p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}