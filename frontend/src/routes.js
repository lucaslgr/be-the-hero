import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'; //Importando o módulo de rotas para o frontend

//Importando os componentes das pages
import Logon from './pages/Logon'; //Pega o index.js como default do folder
import Register from './pages/Register'; //Pega o index.js como default do folder
import Profile from './pages/Profile'; //Pega o index.js como default do folder
import NewIncident from './pages/NewIncident'; //Pega o index.js como default do folder

export default function Routes(){
    return (
        <BrowserRouter>
            {/*Garante que uma rota seja executada por momento*/}
            <Switch> 
                <Route path="/" exact component={Logon}/>
                <Route path="/register" component={Register}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/incidents/new" component={NewIncident}/>
            </Switch>
        </BrowserRouter>
    );
}