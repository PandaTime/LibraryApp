import angular from 'angular';

export default function lbAsyncValidate($log, $parse, $q) {
    const log = $log.getInstance('lbAsyncValidate');
    log.info('lbAsyncValidate');
    return {
        restrict: 'A',
        require: 'ngModel',
        link: (scope, element, attr, ctrl) => {
            let expression = () => {};
            attr.$observe('lbAsyncValidate', (value) => {
                expression = $parse(value);
            });
            ctrl.$asyncValidators.lbAsyncValidate = ($modelValue, $viewValue) => {
                const r = expression(scope, { $modelValue, $viewValue });
                if(r && angular.isFunction(r.then)) return r;
                else return $q(resolve => {
                    resolve();
                });
            };
        }
    };
}

lbAsyncValidate.$inject = ['$log', '$parse', '$q'];
