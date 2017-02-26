export default function lbArray(_, $log) {
    const log = $log.getInstance('lbArray');
    log.info('lbArray');
    return {
        restrict: 'A', // attribute
        require: 'ngModel', // will work with ng-model
        link: (scope, element, attr, ctrl) => { // ctrl = ngModelController
            log.info('link', ctrl.$parsers, ctrl.$formatters);
            // direct calling order, initial - empty, last call - $modelValue 
            ctrl.$parsers.push($viewValue => _.map(_.split($viewValue, ','), s => s.trim())); 
            // reverse calling order, first - toString(), last call - DOM value
            ctrl.$formatters.push($modelValue => _.join($modelValue, ', '));
        }
    };
}

lbArray.$inject = ['_', '$log'];
