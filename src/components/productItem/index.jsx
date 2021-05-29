import React from "react";
import {history} from "../../store";
import routes from "../../routes";
import {connect} from "react-redux";
import {addCart} from "../../actions/cart";
import "./index.scss";

const ProductItem = ({ name, description, img, id, addCart, price, actualCategory }) => {

    const addToBasket = (id) => {
        addCart({
            itemId: id,
            categoryId: actualCategory,
            price,
            amount: 1,
            // token: "UIQMLL0BAZVB42W2NOOY"
        })
    }

    return (
        <div className="ProductItem">
            <img onClick={()=> history.push(routes.phone(id))} src={img} alt="ProductItemImg" />
            <div className="ProductItem__info">
                <div onClick={()=> history.push(routes.phone(id))} className="name">{name}</div>
                <div className="price">Цена: {price}</div>
                <div onClick={()=> history.push(routes.phone(id))} className="description">{description}</div>
                <div className="addToBasketContainer">
                    <button onClick={() => addToBasket(id)}>Добавить в корзину</button>
                </div>
            </div>
        </div>
    )
}


export const mapStateToProps = (state) => {
    return {
        actualCategory: state.categories.actualCategory,
    };
};

const ConnectedComponent = connect(mapStateToProps, {
    addCart
})(ProductItem);

export default ConnectedComponent;
