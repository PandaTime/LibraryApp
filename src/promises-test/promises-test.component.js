import PromisesTestTemplate from './promises-test.html';

class PromisesTestController {
    constructor($log, $q) {
        this.log = $log.getInstance('PromisesTestController');
        this.log.info('constructor');
        this.$q = $q;
    }

    $onInit() {
        this.log.info('$onInit');
        this.resolve = [];
        this.reject = [];

        this.$q.race([this.operation1(), this.operation2()])
        .then(result => this.wholeResult = result)
        .catch(error => this.wholeResult = error);
    }

    operation1() {
        this.log.info('operation1');
        return this.$q((resolve, reject) => {
            this.resolve[1] = () => resolve('operation1 resolved');
            this.reject[1] = () => reject('operation1 rejected');
        });
    }

    operation2() {
        this.log.info('operation2');
        return this.$q((resolve, reject) => {
            this.resolve[2] = () => resolve('operation2 resolved');
            this.reject[2] = () => reject('operation2 rejected');
        });
    }
}

PromisesTestController.$inject = ['$log', '$q'];

const promisesTestComponent = {
    template: PromisesTestTemplate,
    controller: PromisesTestController
};

export default promisesTestComponent;