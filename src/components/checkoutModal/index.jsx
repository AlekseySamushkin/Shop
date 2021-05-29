import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import cn from "classnames";
import './index.scss';


const CheckoutModal = ({ onClose }) => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    return (
        <Modal
            open
            onClose={onClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className="CheckoutModal"
        >
            <div className="CheckoutModal__content">
                <div className="title">Заказ товара</div>
                <div className="fields">
                    <TextField value={email} id="standard-basic" required label="Ваш email" name="email" />
                    <TextField value={name} onChange={(e)=> setName(e.target.value)} id="standard-basic" required label="Ваше имя" name="email" />
                    <button className={cn("send",{"disabled": name.length === 0 || email.length === 0})} disabled={name.length === 0 || email.length === 0}>Оформить заказ</button>
                    <button className="goBack">Вернуться в корзину</button>
                </div>
            </div>
        </Modal>
    )
}

export default CheckoutModal;
