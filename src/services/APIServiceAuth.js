export class APIServiceResource {
    constructor(baseUrl) {
        if (APIServiceResource.instance)
            throw new Error("Use getInstance() instead of new");

        this.baseUrl = baseUrl;
        APIServiceResource.instance = this;
    }

    static getInstance(baseUrl) {
        if (APIServiceResource.instance)
            return APIServiceResource.instance;
        if (!baseUrl)
            throw new Error("Base url is empty!");
        return APIServiceResource.instance = new APIServiceResource(baseUrl);
    }


    fetch(adrs,config) {
        let url = `${this.baseUrl}/auth/${adrs}`;
        return fetch(url,config );
    }

    getAuth() {
        return this.fetch(`me`, ({method: 'GET', headers: APIServiceResource.MethodType.getHeaders()}));
    }

    createUser(newUser) {
        return this.fetch(`register`, ({method: 'POST', body: JSON.stringify(newUser), headers: APIServiceResource.MethodType.getHeaders()}));
    }

    login(user) {
        return this.fetch(`login`,  ({method: 'POST', body: JSON.stringify(user), headers: APIServiceResource.MethodType.getHeaders()}));
    }
    static MethodType = {
        getHeaders: () => {
            return {
                'Content-Type': 'application/json',
                'Authorization': "Basic " + localStorage.getItem('token')
            }
        },
    };
}
export default new APIServiceResource('http://localhost:3000');