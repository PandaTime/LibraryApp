export default class LoginService {
    constructor($log, $http, $q) {
        this.log = $log.getInstance('LoginService');
        this.log.info('constructor');
        this.$http = $http;
        this.$q = $q;
        this.loggedIn = false;
    }

    login(user, password) {
        this.log.info('login', user);
        return this.$q((resolve, reject) => {
            this.$http.post('/api/login', { user, password })
            .then(r => {
                this.loggedIn = true;
                resolve(r);
            })
            .catch(r => {
                this.loggedIn = false;
                reject(r);
            });
        });
    }

    logout() {
        this.log.info('logout');
        this.loggedIn = false;
        return this.$http.post('/api/logout');
    }
}

LoginService.$inject = ['$log', '$http', '$q'];