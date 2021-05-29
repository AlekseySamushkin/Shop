import fp from 'lodash/fp';
import is from 'is_js';
import moment from 'moment';
import { HELPERS } from '../index';


const validators = {
    pipe:
        (...args) =>
            (v) => (
                args.map((arg) => arg(v))
                    .filter((vv) => !!vv)
                    .shift()
            ),
    required:
        (v) => (
            fp.isNil(v) || v === ''
                ? 'Обязательное поле'
                : undefined
        ),
    selectRequired:
        (v) => (
            fp.isNil(v) || v === '' || v === 'empty'
                ? 'Обязательное поле'
                : undefined
        ),
    pdfPrint:
        (count, max) =>
            () => (
            count > max
                ? `Превышено допустимое количество кодов маркировки для печати`
                : ''
        ),
    is: {
        max:
            (max) =>
                (value) => (
                    value > max
                        ? `Не должно быть больше ${max}`
                        : ''
                ),
        min:
            (min) =>
                (value) => (
                    value < min
                        ? `Не должно быть меньше ${min}`
                        : ''
                ),
        time:
            (v) => (
                moment(`2018-10-16 ${v || '00:00'}`).format('HH:mm') === 'Invalid date'
                    ? 'Неверный формат времени'
                    : ''
            ),
        phone:
            (v) => {
                const onlyNum = v ? `+7${v.replace(/[^\d]/g, '').slice(1)}` : v;
                return HELPERS.isPhone(onlyNum)
                    ? undefined
                    : 'Неверный формат телефона';
            },
        emailOrPhone:
            (v) => (
                is.email(v) || HELPERS.isPhone(v)
                    ? undefined
                    : 'Введите email или телефон'
            ),
        email:
            (v) => (
                is.email(v)
                    ? undefined
                    : 'Введите email'
            ),
        numeric:
            (v) => (
                v
                    ? (/^[0-9., ]+$/i).test(v)
                        ? ''
                        : 'Допустимы только цифры'
                    : ''
            ),
        latin:
            (v) => (
                (/^[a-z.\- ]+$/i).test(v)
                    ? ''
                    : 'Допустимы символы на латинице'
            ),
        cyrillic:
            (v) => (
                (/^[а-я.\- ]+$/i).test(v)
                    ? ''
                    : 'Допустимы символы на кирилице'
            ),
        alphanumeric:
            (v) => (
                (/^[0-9a-z.\- ]+$/i).test(v)
                    ? undefined
                    : 'Допустимы только буквенно-цифровые символы на латинице'
            ),
        cyralphanumeric:
            (v) => (
                (/^[0-9a-zа-я.\- ]+$/i).test(v)
                    ? undefined
                    : 'Допустимы только буквенно-цифровые символы'
            ),
        password:
            (v) => (
                (/^[0-9a-z.@%!$*()\- ]+$/i).test(v)
                    ? undefined
                    : 'Допустимы A-Z, 0-9, @, %, !, $, *, (, )'
            ),
        emailSymbols:
            (v) => (
                (/^[0-9a-z._@\- ]+$/i).test(v)
                    ? undefined
                    : 'Допустимы A-Z, 0-9, @, -, _'
            ),
        inn: (country) =>
            (value) => {
                if (value) {
                    switch (country) {
                        case 'KZ': {
                            return validators.length.equal(12)(value);
                        }
                        case 'AM': {
                            return validators.length.equal(8)(value);
                        }
                        case 'KG': {
                            return validators.length.equal(14)(value);
                        }
                        case 'UZ': {
                            return validators.length.equal(9)(value);
                        }
                        default: return undefined
                    }
                }
            },
        commonInn:
            (min, max) =>
                (value) => (
                    is.within(fp.size(value), min, max)
                        ? undefined
                        : `Некорректная длина ИНН. Проверьте введённое значение`
                ),
    },
    eq:
        (sample) =>
            (v) => (
                sample === v
                    ? undefined
                    : 'Значения не совпадают'
            ),
    has: {
        nospace:
            (v) => (
                (/\s/).test(v)
                    ? 'Пробельные символы не допустимы'
                    : undefined
            ),
    },
    startWith:
        (start, position) =>
            (value) => (
                value && start && start.length === position
                    ? value.slice(0, position) === start
                        ? ''
                        : `Должно начинаться с ${start}`
                    : ''
            ),
    length: {
        equal:
            (val) =>
                (value) => (
                    value
                        ? val === fp.size(value.split(' ').join(''))
                            ? ''
                            : `Длина должна быть равна ${val}`
                        : ''
                ),
        min:
            (min) =>
                (value) => (
                    value
                        ? is.above(fp.size(value), min - 1)
                            ? undefined
                            : `Длина не должна быть меньше ${min}`
                        : ''
                ),
        max:
            (max) =>
                (value) => (
                    is.under(fp.size(value), max + 1)
                        ? undefined
                        : `Длина не должна превышать ${max}`
                ),
        within:
            (min, max) =>
                (value) => (
                    is.within(fp.size(value), min, max)
                        ? undefined
                        : `Длина должна находиться в диапазоне [${min} ... ${max}]`
                ),
    },
};

export default validators;
