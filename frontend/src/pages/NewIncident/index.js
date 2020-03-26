import React,{useState} from 'react';

//Importando componente Link para usar no lugar da Anchor
import {Link, useHistory} from 'react-router-dom';

//Importando o nosso client HTTP fornecido pelo AXIOS
import api from '../../services/api'; 

//Importando os icons do pacote react-icons
import {FiArrowLeft} from 'react-icons/fi';

//Importando as imagens
import logoImg from '../../assets/logo.svg';

import './style.css';

export default function NewIncident(){
    //Definindo os states de cada variável que vai estar vinculado aos inputs
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    
    //Pegando o ID da ong que está logada
    const ongId = localStorage.getItem('ongId');

    /**
     * O history serve para fazer navegação através de uma função javascript
    */
    const history = useHistory();

    //Funcao responsável por criar um novo incident
    async function handleNewIncident(e){
        e.preventDefault();
        
        //Montando o json com as informações para enviar para o backend
        const data = {
            title,
            description,
            value,
        };

        try{
            //Fazendo a requisição via post para cadastrar um novo incident
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            });

            //Redirecionando o usuário para o profile
            history.push('/profile');
        } catch(err){
            alert('Erro ao cadastrar caso, tente novamente.');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do caso"
                        value = {title}
                        onChange = {e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value = {description}
                        onChange = {e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em reais"
                        value = {value}
                        onChange = {e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}