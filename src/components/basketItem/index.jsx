import React from "react";
import {connect} from "react-redux";
import {history} from "../../store";
import routes from "../../routes";
import {removeCart} from "../../actions/cart";
import './index.scss';


const BasketItem = ({ id, name, img, description, itemId, removeCart}) => {

    const onDelete = () => {
        removeCart(itemId)
    };

    return (
        <div className="BasketItem">
            <img onClick={()=> history.push(routes.phone(id))} className="img" src={img} alt="BasketItemImg" />
            <div className="infoContainer">
                <div onClick={()=> history.push(routes.phone(id))} className="name">{name}</div>
                <div onClick={()=> history.push(routes.phone(id))} className="description">{description}</div>
            </div>
            <div className="buttonContainer">
                <button onClick={onDelete}>Удалить</button>
            </div>
        </div>
    )
}

export const mapStateToProps = () => {
    return {};
};

const ConnectedComponent = connect(mapStateToProps, {
    removeCart
})(BasketItem);

export default ConnectedComponent;
