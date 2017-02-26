import NavigationBarTemplate from './navigation-bar.html';

class NavigationBarController {
    constructor($log, $state, LoginService) {
        this.log = $log.getInstance('NavigationBarController');
        this.$state = $state;
        this.LoginService = LoginService;
    }
    logout() {
        this.log.info('logout');
        this.LoginService.logout()
        .finally(() => this.$state.go('login'));
    }
}

NavigationBarController.$inject = ['$log', '$state', 'LoginService'];

const navigationBar = {
    template: NavigationBarTemplate,
    controller: NavigationBarController,
};

export default navigationBar;