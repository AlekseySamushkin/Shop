import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import cn from "classnames";
import {sendCart} from "../../actions/cart";
import './index.scss';
import {connect} from "react-redux";
import {validators} from "../../helpers/form-validators";


const CheckoutModal = ({ onClose, sendCart, phoneList }) => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(null);
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(null);

    const sendOrder = () => {
        console.log('validators.is.email(email)',validators.is.email(email))
        if(validators.is.email(email)) {
            setEmailError("Некорректный email")
        }
        if(!name) {
            setNameError("Введите имя")
        }
        if(!validators.is.email(email) && name) {
            sendCart({
                email,
                name,
                phoneList,
            })
            onClose();
        }
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        setEmailError(null);
    }

    const handleChangeName = (e) => {
        setName(e.target.value);
        setNameError(null);
    }

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
                    <TextField
                        value={email}
                        onChange={handleChangeEmail}
                        id="standard-basic"
                        required
                        label="Ваш email"
                        name="email"
                        error={!!emailError}
                        helperText={emailError ? emailError : ""}
                    />
                    <TextField
                        error={!!nameError}
                        helperText={nameError ? nameError : ""}
                        value={name}
                        onChange={handleChangeName}
                        id="standard-basic"
                        required
                        label="Ваше имя"
                        name="email"
                    />
                    <button
                        className={cn("send",{"disabled": name.length === 0 || email.length === 0})}
                        disabled={name.length === 0 || email.length === 0}
                        onClick={sendOrder}
                    >
                        Оформить заказ
                    </button>
                    <button className="goBack">Вернуться в корзину</button>
                </div>
            </div>
        </Modal>
    )
}

export const mapStateToProps = () => {
    return {};
};

const ConnectedComponent = connect(mapStateToProps, {
    sendCart
})(CheckoutModal);

export default ConnectedComponent;
