import cn from "classnames";
import {connect} from "react-redux";
import React, {useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import {Button} from "../form/button";
import './index.scss';
import TextField from "../form/final-form/text-field";
import Timer from "../timer";
import {Field, Form} from "react-final-form";
import {HELPERS} from "../../helpers";
import {validators} from "../../helpers/form-validators";
import {sendCodeLogin, sendPhoneLogin} from "../../actions/auth";
import {updateOrderPhone} from "../../actions/cart";


const AuthDialog = ({ open, close, sendPhoneLogin, sendCodeLogin, updateOrderPhone }) => {
    const [step, setStep] = useState(1);
    const [canRetry, setCanRetry] = useState(false);
    const [phone, setPhone] = useState('');
    const [phoneForOrder, setPhoneForOrder] = useState('');
    const [contactType, setContactType] = useState('phoneNumber');

    const sendPhone = (values) => {
        if (step === 1) {
            let data;
            if (values.contact.includes('@')) {
                data = {
                    contactType: 'email',
                    contact: encodeURIComponent(values.contact)
                };
                setContactType('email');
            } else {
                data = {
                    contactType: 'phoneNumber',
                    contact: encodeURIComponent('+7' + HELPERS.getOnlyNumsPhone(values.contact))};
                setContactType('phoneNumber');
                setPhoneForOrder(data.contact);
            }
            sendPhoneLogin({ data, onFinish: (isSuccess) => {
                    if (isSuccess) {
                        setPhone(data.contact);
                        setStep(2);
                    }
                }
            })
        } else {
            sendCodeLogin({ data : { contactType, contact: phone, code: values.code }, onFinish: (result) => {
                console.log('[AUTH DIALOG] on finish')
                    close(result);
                    updateOrderPhone(phoneForOrder);
                }
            })
        }
    };

    const retrySendPhone = () => {
        sendPhoneLogin({ data: phone, onFinish: () => {
                setCanRetry(false)
            }
        })
    };

    const onEnd = () => {
        setCanRetry(true);
    };

    return(
        <Dialog
            open={open}
            maxWidth={"lg"}
            onClose={() => close(false)}
            aria-labelledby="form-dialog-title">
            <div className={cn('authDialog')}>
                <h3>Вход</h3>
                <div className="form">
                    <Form
                        onSubmit={sendPhone}
                        render={({ handleSubmit }) => {
                            return (
                                <form onSubmit={handleSubmit}>
                                    {
                                        step === 1 && (
                                            <Field
                                                fullWidth
                                                component={TextField}
                                                name="contact"
                                                type="text"
                                                label="Номер телефона*"
                                                autoFocus={true}
                                                format={HELPERS.formatPhone}
                                                inputProps={{
                                                    maxLength: 17,
                                                }}
                                                validate={validators.required}
                                            />
                                        )
                                    }
                                    {
                                        step === 2 && (
                                            <>
                                                <Field
                                                    fullWidth
                                                    component={TextField}
                                                    name="code"
                                                    type="text"
                                                    label="Код из смс/сообщения*"
                                                    autoFocus={true}
                                                    inputProps={{
                                                        maxLength: 4,
                                                    }}
                                                    validate={validators.required}
                                                />
                                            </>
                                        )
                                    }
                                    <div className={cn('authDialog__btn')}>
                                        <Button color="blue" variant="contained" size="large" type="submit" onClick={() => {}}>
                                            { step === 1 ? 'Отправить код' : 'Войти на сайт'}
                                        </Button>
                                        {
                                            !canRetry && step === 2 && <Timer onEnd={onEnd}/>
                                        }
                                        {
                                            canRetry && step === 2 && (
                                                <Button onClick={retrySendPhone} variant="link">
                                                    Отправить код повторно
                                                </Button>
                                            )
                                        }
                                    </div>
                                </form>
                            );
                        }}
                    />
                </div>
            </div>
        </Dialog>
    )
};

export const mapStateToProps = () => {
    return {
    };
};

const ConnectedComponent = connect( mapStateToProps, {
    sendPhoneLogin,
    sendCodeLogin,
    updateOrderPhone
})( AuthDialog );

export default ConnectedComponent;
