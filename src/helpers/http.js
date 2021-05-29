import fp from 'lodash/fp';
import { saveAs } from 'file-saver';
import { /*AB_PAYMENT_URL,*/ URL_AB_BASE, URL_BASE, YANDEX_GEOCODE_URL} from "../api/constants";


export const CONTENT_TYPES = {
    json: 'application/json',
    formdata: 'multipart/form-data',
    form: 'application/x-www-form-urlencoded',
    patch: 'application/merge-patch+json',
    csv: 'text/csv',
    pdf: 'application/pdf',
    default: '*/*',
};

const URL_WITHOUT_VERSION = [
    '/oauth', '/payments', '/mock_recognition',
];

export const saveAsFile = (response, filename) =>{
    saveAs(response.data, filename.slice(0,-1).slice(1));
};


export const checkContentType = fp.curry(
    (response, contentType) =>
        !!~(fp.split('; ', response.headers['content-type'])[0] || '')
            .toLowerCase()
            .indexOf(contentType)
);

export const isHasBody = (method) => ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase());

export const getContentDispositionFilename = (response, fallback) => (
    fp.pipe(
        fp.defaultTo(''),
        fp.split(';'),
        fp.map(fp.trim),
        fp.find((v) => /^filename=/i.test(v)),
        fp.split('='),
        fp.last,
        fp.defaultTo(fallback),
    )(response.headers['content-disposition'])
);

export const isNeedVersionApi = (url) => fp.filter(
    (v) => ~url.indexOf(v)
)(URL_WITHOUT_VERSION).length > 0;

export const getBaseUrl = (url) => {
    // console.log(url);
    // console.log(AB_PAYMENT_URL);
    // console.log(url.includes(AB_PAYMENT_URL));
    return url === YANDEX_GEOCODE_URL
        ? ''
        : url === '/rest'
            ? URL_AB_BASE
            : URL_BASE;
};
