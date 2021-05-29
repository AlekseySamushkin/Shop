import React, {useEffect} from "react";
import "./index.scss";
import {connect} from "react-redux";
import {getProduct} from "../../actions/productList";
import {history} from "../../store";


const PhonePage = ({getProduct, location, product}) => {
    const id = location.pathname.split('/')[2];
    useEffect(() => {
        getProduct({id})
    }, [id, getProduct])

    const addToBasket = () => {
        console.log('addToBasket',id)
    }

    return (
        <div className="PhonePage">
            {product && (
                <>
                    <div className="imageContainer">
                        <div className="backContainer">
                            <button onClick={()=> history.goBack()}>Назад</button>
                        </div>
                        <img src={product.image} alt="productImg"/>
                    </div>
                    <div className="infoContainer">
                        <div className="title">{product.name ?? "Название отсутствует"}</div>
                        <button className="addToBasket" onClick={addToBasket}>Добавить в корзину</button>
                        <div className="description">{product.description ?? "Описание отсутствует"}</div>
                    </div>
                </>
            )
            }
        </div>
    )
}

export const mapStateToProps = (state) => {
    return {
        location: state.router.location,
        product: state.products.product,
    };
};

const ConnectedComponent = connect(mapStateToProps, {
    getProduct
})(PhonePage);

export default ConnectedComponent;
