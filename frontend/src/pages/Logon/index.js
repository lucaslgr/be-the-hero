import React, {useState} from 'react';

//Importando os icons do pacote react-icons
import {FiLogIn} from 'react-icons/fi';

//Importando o estil do Logon
import './styles.css';

//Importando o nosso client HTTP fornecido pelo AXIOS
import api from '../../services/api'; 

//Importando componente Link para usar no lugar da Anchor
import {Link, useHistory} from 'react-router-dom';

//Importando as imagens
import heroesImg from '../../assets/heroes.png'; 
import logoImg from '../../assets/logo.svg';

//Exportando a função que retorna o component do Logon, a página no caso
export default function Logon(){
    //Definindo os states de cada variável que vai estar vinculada aos inputs
    const [ong_id, setId] = useState('');
    const history = useHistory();
    /**
     * Função responsável por fazer o login do usuário
     * É disparada assim que o usuário der um SUBMIT no form
     */
    async function handleLogin(e){
        e.preventDefault();

        try {
            const response = await api.post('sessions',{ong_id});   
            
            //Salvando o id da ong e o name em uma sessão do navegador
            localStorage.setItem('ongId', ong_id);
            localStorage.setItem('ongName', response.data.name);

            //Redirecionando para pagina de profile
            history.push('/profile');
        } catch (err) {
            alert('Falha no loginm, tente novamente.');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Logo"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input
                        placeholder="Sua ID"
                        value={ong_id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}