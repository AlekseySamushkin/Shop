import React, {useEffect, useState} from "react";
import cn from "classnames";
import {connect} from "react-redux";
import {clearCart, getCart} from "../../actions/cart";
import BasketItem from "../../components/basketItem";
import './index.scss';
import CheckoutModal from "../../components/checkoutModal";


const Basket = ({ getCart, clearCart, basket}) => {
    const [checkOut, setCheckOut] = useState(false);

    useEffect(()=>{
        getCart()
        return clearCart
    },[getCart, clearCart])

    return (
        <div className="Basket">
            <h2>Корзина</h2>
            {
                basket && basket.map(el => (
                    <BasketItem
                        key={el.id}
                        id={el.id}
                        name={el.name}
                        description={el.description}
                        img={el.image}
                    />
                ))
            }
            {
                basket && basket.length === 0 && <div className="emptyBasket">Корзина пуста</div>
            }
            {checkOut &&
                <CheckoutModal onClose={()=>setCheckOut(false)} />
            }
            <button
                className={cn("Checkout",{"disabled": !basket || basket?.length === 0})}
                disabled={!basket || basket?.length === 0}
                onClick={() => setCheckOut(true)}
            >
                Оформить заказ
            </button>
        </div>
    )
}

export const mapStateToProps = (state) => {
    return {
        basket: state.basket.basket
    };
};

const ConnectedComponent = connect(mapStateToProps, {
    getCart,
    clearCart
})(Basket);

export default ConnectedComponent;
