import React from "react";
import {connect} from "react-redux";
import Category from "./category";
import ProductLIst from "./productLIst";
import './index.scss';


const Home = () => {

    return (
        <div className="mainPage">
            <Category />
            <ProductLIst />
        </div>
    )
};

export const mapStateToProps = (state) => {
    return {

    };
};

const ConnectedComponent = connect(mapStateToProps, {

})(Home);

export default ConnectedComponent;
