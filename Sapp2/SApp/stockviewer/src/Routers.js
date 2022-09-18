import {Routes,Route,BrowserRouter as Router} from 'react-router-dom'; 
import React from 'react';
import App from './Apps/App'
import App2 from './Apps/App2'
import App3 from './Apps/App3'
import App4 from './Apps/App4'
import News from '../src/components/News'

export class Routers extends React.Component{
    render(){
        return(
            <Router>
                <Routes>
                    <Route path='/' element={<App/>}></Route>
                    <Route path='News/' element={<News/>}></Route>
                    <Route path='ETHUSD/' element={<App2/>}></Route>
                    <Route path='LTCUSD/' element={<App3/>}></Route>
                    <Route path='TRXUSD/' element={<App4/>}></Route>
                </Routes>
            </Router>
        )
    }
}