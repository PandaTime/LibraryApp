import angular from 'angular';

export default function lbRequired($log) {
    const log = $log.getInstance('lbRequired');
    log.info('lbRequired');
    return {
        restrict: 'A', // attribute
        require: 'ngModel', // will work with ng-model
        link: (scope, element, attr, ctrl) => { // ctrl = ngModelController
            log.info('link');
            ctrl.$validators.required = ($modelValue, $viewValue) =>
                angular.isUndefined($viewValue) || $viewValue !== '';
        }
    };
}

lbRequired.$inject = ['$log'];
