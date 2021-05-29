import qs from 'qs';


function request(url) {
    return (path = '', query = {}) => {
        const query_string = qs.stringify(query);
        return `${url}${path ? `/${path}` : ''}${query_string ? `?${query_string}` : ''}`;
    };
}

export const routes = {
    home: request('/'),
    phone: request('/phone'),
    basket: request('/basket'),
};

export default routes;
