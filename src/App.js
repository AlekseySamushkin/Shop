import React from 'react';
import {ConnectedRouter} from 'connected-react-router';
import {Provider} from 'react-redux';
import {store, history} from './store';
import {APIConnector} from './api';
import Layout from './components/layout';
import Auth from './components/auth';


function App() {
    return (
        <Provider store={store}>
            <APIConnector>
                <Auth>
                    <ConnectedRouter history={history}>
                        <Layout/>
                    </ConnectedRouter>
                </Auth>
            </APIConnector>
        </Provider>
    );
}

export default App;
