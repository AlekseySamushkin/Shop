import * as R from 'ramda';
import fp from 'lodash/fp';
import moment from 'moment';
import React, {useEffect, useRef} from "react";


export const path =
    (data) =>
        (p) => R.flip(R.path)(data, p.split('.'));


export const HELPERS = {
    parseErrors: (errors) => {
        if (errors && errors.errors && errors.errors.length !== undefined) {
            return fp.map(
                (v) => v.defaultMessage
            )(errors.errors).join(', ');
        }
        return errors && (errors.message || errors.error_description);
    },
    isPhone: (data) => (/^((8|\+7)[-]?)?(\(?\d{3}\)?[-]?)?[\d-]{10,10}$/).test(data),

    getOnlyNumsPhone: (value) => value.replace('+7', '').replace(/[^\d]/g, ''),

    onlyNums: (value) => {
        if ((/^\d+$/).test(value)) return value;
        return false;
    },

    formatCard: (value) => {
        const onlyNums = HELPERS.getOnlyNumsPhone(value);
        if (onlyNums.length === 0) return ""
        if (onlyNums.length <= 3) return `${onlyNums.slice(0, 3)}`;
        if (onlyNums.length <= 6) return `${onlyNums.slice(0, 3)} ${onlyNums.slice(3, 6)}`;
        if (onlyNums.length <= 9) return `${onlyNums.slice(0, 3)} ${onlyNums.slice(3, 6)} ${onlyNums.slice(6, 9)}`;
        return `${onlyNums.slice(0, 3)} ${onlyNums.slice(3, 6)} ${onlyNums.slice(6, 9)}`;
    },

    formatPhone: (value, isNeedBracket = true) => {
        if (!value) {
            return value;
        }
        const prefix = '+7';
        const onlyNums = HELPERS.getOnlyNumsPhone(value);
        if (onlyNums.length === 0) {
            return isNeedBracket ? onlyNums : prefix;
        }
        if (onlyNums.length <= 3) {
            return isNeedBracket
                ? `${prefix}(${onlyNums}`
                : `${prefix}-${onlyNums}`;
        }
        if (onlyNums.length <= 6) {
            return isNeedBracket
                ? `${prefix}(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 7)}`
                : `${prefix}-${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}`;
        }
        if (onlyNums.length <= 8) {
            return isNeedBracket
                ? `${prefix}(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 8)}`
                : `${prefix}-${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 8)}`;
        }
        return isNeedBracket
            ? `${prefix}(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 8)}-${onlyNums.slice(8, 10)}`
            : `${prefix}-${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 8)}-${onlyNums.slice(8, 10)}`;
    },
    formatDate: (value) => {
        const onlyNums = HELPERS.getOnlyNumsPhone(value);
        // console.log(moment("21.12.2020", 'DD.MM.YYYY').format('L'))
        if (onlyNums.length === 0) return ""
        if (onlyNums.length < 3) {
            if (parseInt(onlyNums) <= 31) {
                return `${onlyNums}`;
            }
            return onlyNums.slice(0, -1);
        }
        if (onlyNums.length < 5) {
            if (parseInt(onlyNums.slice(2, 4)) <= 12) {
                return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 4)}`;
            }
            return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, -1)}`;
        }
        if (onlyNums.length < 10) {
            if (parseInt(onlyNums.slice(4, 8)) <= moment().format('YYYY')) {
                return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 4)}.${onlyNums.slice(4, 8)}`;
            }
            return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 4)}.${onlyNums.slice(4, -1)}`;
        }
    },
};

export const changeCartFromPreview = (list, item, count) => {
    const copy = fp.cloneDeep(list);
    console.log(copy);
    const findIndex = copy.findIndex((v) => v.id === item.id);
    console.log(findIndex);
    if (findIndex >=0) {
        copy[findIndex] = fp.cloneDeep({
            ...item,
            count
        })
    } else {
        copy.push({
            ...item,
            count
        })
    }
    return copy;
};

export const changeCart = (list, item, type) => {
    const copy = fp.cloneDeep(list);
    const findIndex = copy.findIndex((v) => v.id === item.id);
    if (type === 'add') {
        if (findIndex >=0) {
            copy[findIndex] = fp.cloneDeep({
                ...item,
                count: copy[findIndex].count + 1
            })
        } else {
            copy.push({
                ...item,
                count: 1
            })
        }
    } else {
        if (copy[findIndex].count > 1) {
            copy[findIndex] = {
                ...copy[findIndex],
                count: copy[findIndex].count - 1
            }
        } else {
            copy.splice(findIndex, 1)
        }
    }
    return copy;
};

export const calculateCart = (list, name) => list.length === 0
    ? 0
    : fp.pipe(
        fp.map((item) => item[name] ? parseFloat(item[name]) * item.count : 0),
        fp.reduce((sum, current) => sum + current, 0)
    )(list);

export default {
    path,
};

export function generateGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4();
}

export const getReturnUrl = () => {
    return window.location.href.split('#')[0]
};

export const calcSliderElements = () =>
    window.innerWidth < 1280 ? Math.trunc(window.innerWidth/400) : Math.trunc(1280/376);

export function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "none" }}
            onClick={onClick}
        />
    );
}

export function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export const getSuccessPaymentUrl = () => {
    return getReturnUrl() + '#/successPayment'
};

export const getFailPaymentUrl = () => {
    return getReturnUrl() + '#/failPayment'
};

export const cutString = (text) => {
    let result = text.trim();
    if( result.length <= 150) return result;

    result = result.slice(0, 150);

    return result.trim() + "...";
};

export const pluralizerQuantityDishes = (value) => {
    if (value % 10 === 1) return `${value} блюдо`;
    // if (value > 1 && value < 5) return `${value} блюда`;
    if (value % 10 > 1 && value % 10 < 5) return `${value} блюда`;
    return `${value} блюд`;
};