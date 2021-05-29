import React from "react";
import './index.scss';
import {history} from "../../store";
import routes from "../../routes";


const BasketItem = ({ id, name, img, description}) => {

    const onDelete = () => {
        console.log('delete',id)
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

export default BasketItem;
