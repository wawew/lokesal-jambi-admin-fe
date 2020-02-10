import React from 'react';
import { Provider } from 'unistore/react';
import { store } from '../store/store';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import BerandaAdmin from '../pages/Beranda';
import Masuk from '../pages/Masuk';
import Pengguna from '../pages/Pengguna';
import DetailKeluhan from '../pages/DetailKeluhan';
import Komentar from '../pages/Komentar';

const MainRoute = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={BerandaAdmin} />
                    <Route exact path='/masuk' component={Masuk} />
                    <Route exact path='/pengguna' component={Pengguna} />
                    <Route exact path='/keluhan/:id' component={DetailKeluhan} />
                    <Route exact path='/komentar' component={Komentar} />
                </Switch>
            </BrowserRouter>
        </Provider>
    );
};

export default MainRoute;