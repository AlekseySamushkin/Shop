import axios from 'axios';
import qs from 'qs';

import {
    checkContentType,
    CONTENT_TYPES, getBaseUrl,
    getContentDispositionFilename,
    isHasBody,
    isNeedVersionApi,
    saveAsFile
} from '../helpers/http';
import Errors from './errors';
// import {
//     // AB_TEST_ERROR_URL,
//     AB_TEST_LOGIN,
//     AB_TEST_PASSWORD,
//     // AB_TEST_SUCCESS_URL,
//     YANDEX_GEOCODE_URL,
//     YANDEX_TOCKEN
// } from './constants';
// import { getFailPaymentUrl, getSuccessPaymentUrl } from "../helpers";

const VERSION_API = '';
const BASIC = {
    username: 'tester', password: 'tester',
};

const resolve = ({ response, saveAs }) => {
    const isContentType = checkContentType(response);
    const response_json = isContentType(CONTENT_TYPES.json) && response.data;
    switch (response.status) {
        case 200:
        case 201:
        case 202:
            return (
                saveAs
                    ? saveAsFile(
                    response, getContentDispositionFilename(response, saveAs)
                    )
                    : (response_json || response)
            );
        case 204:
            return null;
        default:
            console.warn(`Unknown response status: ${response.status}\n`, response);
            return null;
    }
};


const reject = (response) => {
    if (response.request.responseType === 'blob' && response.data instanceof Blob) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onload = () => {
                response.data = JSON.parse(reader.result);
                resolve(Promise.reject(response));
            };

            reader.onerror = () => {
                reject(response);
            };

            reader.readAsText(response.data);
        });
    }
    switch (response.status) {
        case 401:
            throw new Errors.NotAuthorized(response);
        case 403:
            throw new Errors.Forbidden(response);
        case 400:
            throw new Errors.BadRequest(response);
        case 500:
            throw new Errors.Backend(response);
        default:
            throw new Errors.Unknown(response, response.data);
    }
};


const options = ({
                     accessToken,
                     // accept,
                     basic,
                     body,
                     content_type = CONTENT_TYPES.json,
                     headers = {},
                     method = 'POST',
                     onDownloadProgress,
                     onUploadProgress,
                     path = '',
                     query = {},
                     responseType,
                     token_type,
                     url = (() => { throw new Error('Url is not specified'); })(),
                     isNeedToken
                 }) => {
    const hasBody = isHasBody(method);
    const data = body && hasBody && (
        content_type === CONTENT_TYPES.json
            ? JSON.stringify(body)
            : content_type === CONTENT_TYPES.form
            ? qs.stringify(body)
            : body
    );
    const url_path = path ? `/${path}` : '';
    const url_query = qs.stringify({...query, ...!hasBody && body}, {arrayFormat: 'repeat'});
    const url_version_api = isNeedVersionApi(url) ? '' : VERSION_API;
    const url_base = getBaseUrl(url);
    const url_request = [url_base, url_version_api, url, url_path, url_query ? '?' : '', url_query].join('');

    return {
        method,
        ...data && {data},
        // ...!isNeedToken && {auth: basic},
        auth: BASIC,
        headers: {
            // Accept: accept ? accept : content_type ? content_type : CONTENT_TYPES.json,
            ...hasBody && {'Content-Type': content_type},
            // ...access_token && {Authorization: `${token_type} ${access_token}`},
            ...isNeedToken && { 'client-token': accessToken },
            ...headers,
        },
        responseType,
        onUploadProgress,
        onDownloadProgress,
        url: url_request,
    };
};


const request = ({
                     parent,
                     reconnect = reject,
                     saveAs,
                     ...props
                 }) => (
    axios(options(props))
        .then(
            (response) => resolve({ response, saveAs }),
            parent
                ? reject
                : ({ response }) => reject(response),
        )
);


const connect = (props) => {
    const { reconnect } = props;
    const { accessToken, refresh_token, token_type } = props.auth || {};
    const method =
        ({ name, ...opts }) => (args) =>
            request({ accessToken, token_type, ...opts, ...args,reconnect, method: name });

    const get = method({ name: 'GET' });
    const post = method({ name: 'POST' });
    const put = method({ name: 'PUT' });
    const patch = method({ name: 'PATCH', content_type: CONTENT_TYPES.patch });
    const remove = method({ name: 'DELETE' });

    const crud = (url) => ({
        create: (body) => post({ url, body }),
        item: (id) => get({ url, path: id }),
        list: (query = {}) => get({ url, query }),
        patch: ({ id, body }) => patch({ url, path: id, body }),
        remove: (id) => remove({ url, path: id }),
        update: ({ id, body }) => put({ url, path: id, body }),
        download: (id, onDownloadProgress) => get({
            url,
            path: id,
            responseType: 'blob',
            onDownloadProgress,
            saveAs: `download-${id}.file`,
        }),
        upload: (files, onUploadProgress) =>
            window.Promise.all(
                files.map(
                    (file) => {
                        const body = new window.FormData();
                        body.append('file', file);
                        return post({
                            url,
                            content_type: CONTENT_TYPES.formdata,
                            onUploadProgress,
                            body,
                        });
                    }
                )
            ),
    });

    const auth = (url) => ({
        check: (token) => (
            post({
                url,
                basic: BASIC,
                path: 'check_token',
                query: { token },
            })
        ),
        reconnect: () => (
            post({
                url,
                parent: true,
                path: 'token',
                basic: BASIC,
                content_type: CONTENT_TYPES.form,
                body: { grant_type: 'refresh_token', refresh_token },
            })
        ),
        signin: ({ username, password }) => (
            post({
                url,
                path: 'token',
                basic: BASIC,
                content_type: CONTENT_TYPES.form,
                accept: 'application/json, text/plain, */*',
                body: { username, password , grant_type: 'password'},
            })
        ),
        signout: () => remove({ url, path: 'token' }),
    });

    const cart = (url) => ({
        get: (query) => get({ url, query, path: 1 }),
        add: (body) => post({ url: `${url}/add`, body }),
        send: (body) => post({ url: "/Mail/sendMail", body }),
        remove: (id) => remove({ url, path: id }),
        update: (body) => put({ url, body }),
    })

    const category = (url) => ({
        getOne: (id) => get({ url, path: id }),
        getAll: () => get({ url: `${url}/All` }),
        add: (body) => post({ url, body }),
        remove: (id) => remove({ url, path: id }),
    })


    const client = (url) => ({
        getOne: (id) => get({ url, path: id }),
        add: (body) => post({ url, body }),
        remove: (id) => remove({ url, path: id }),
    })

    const item = (url) => ({
        getOne: (id) => get({ url, path: id }),
        getOneOfCategory: (id, query) => get({ url: `${url}/Category`, query, path: id }),
        getAll: () => get({ url: `${url}/All` }),
        add: (body) => post({ url, body }),
        remove: (id) => remove({ url, path: id }),
    })


    return {
        get,
        remove,
        post,
        put,
        patch,
        auth: auth('/oauth'),
        cart: cart('/Cart'),
        category: category('/Category'),
        client: client('/Client'),
        item: item('/Item'),
    };
};


export default connect;
