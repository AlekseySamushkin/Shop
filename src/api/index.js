import { connect } from 'react-redux';

import RestAPI from './rest';
import { reconnect } from '../actions/auth';


const API = {};

export const APIConnector = connect(
    (state) => ({ auth: state.auth }),
    {
        reconnect
    }
)(
    ({ children, ...props }) => {
        API.rest = RestAPI(props);
        console.info('APIConnector: ', props.auth);
        return children;
    }
);

export default API;
