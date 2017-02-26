import LoginTemplate from './login.html';

class LoginController {
    constructor($log, $timeout, $state, LoginService) {
        this.log = $log.getInstance('LoginController');
        this.log.info('constructor');
        this.$timeout = $timeout;
        this.$state = $state;
        this.LoginService = LoginService;
        this.user = 'vasya';
    }

    login() {
        this.log.info('login');
        this.okMessage = '';
        this.errorMessage = '';
        this.LoginService.login(this.user, this.password)
        .then(r => this.okMessage = r.data)
        .then(() => this.$timeout(1000))
        .then(() => this.$state.go('app.books.empty'))
        .catch(r => this.errorMessage = r.data);
    }
}

LoginController.$inject = ['$log', '$timeout', '$state', 'LoginService'];

const login = {
    template: LoginTemplate,
    controller: LoginController,
};

export default login;