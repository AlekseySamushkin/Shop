import React from "react";
import './index.scss'

import {connect} from "react-redux";
import {history} from "../../../store";
import routes from "../../../routes";
import {Link} from "react-router-dom";


const Header = () => {
    return (
        <header>
            <div className="header__content">
                <Link to={routes.home()}>Phone Market</Link>
                <button className="basket" onClick={() => history.push(routes.basket())}>Моя корзина</button>
            </div>
        </header>
    )
};

export const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

const ConnectedComponent = connect( mapStateToProps, {})( Header );

export default ConnectedComponent;
