import React, {useState} from 'react';

//Importando o nosso client HTTP fornecido pelo AXIOS
import api from '../../services/api'; 

import './style.css';

//Importando os icons do pacote react-icons
import {FiArrowLeft} from 'react-icons/fi';

//Importando componente Link para usar no lugar da Anchor
//Importando o componente useHistory para fazer navegação através de uma function do JS
import {Link, useHistory} from 'react-router-dom';

//Importando as imagens
import logoImg from '../../assets/logo.svg';

//Exportando a função que retorna o component do Register, a página no caso
export default function Register(){
    /**
     * Definindo cada states para manipular as variáveis que vão recebecer os valores de 
     * entrada fornecidos pelos campos input do form que serão preenchidos pelo usuário
    */
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');

    /**
     * O history serve para fazer navegação através de uma função javascript
    */
    const history = useHistory();

    /**
     * Função responsável por fazer o cadastro do usuário
     * É disparada assim que o usuário der um SUBMIT no form
     */
    async function handleRegister(e){
        e.preventDefault();

        const data = ({
            name,
            email,
            whatsapp,
            city,
            uf
        });

        try {
            //Enviado os dados para rota do backend http:localhost:3333/ongs com requisição POST
            const response = await api.post('ongs', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/'); //Redirecionando para página de login
        } catch (error) {
            alert('Erro no cadastro! Tente novamente.');             
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}    
                    />
                    <input
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}    
                    />
                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}    
                        />
                        <input
                            placeholder="UF"
                            style={{width: 80}}
                            value={uf}
                            onChange={e => setUF(e.target.value)}    
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}