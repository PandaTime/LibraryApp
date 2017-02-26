import angular from 'angular';
import library from '../main';
import $ from 'jquery';

const html =    `<confirm-unsaved-changes is-unsaved-changes="true" title="Title" message="Message">
                 </confirm-unsaved-changes>`;

function findController($element) {
    const data = $element.data();
    for(let prop in data) {
        if(prop.indexOf('Controller') != -1)
            return data[prop];
    }
}

describe('Confirm Unsaved Changes spec', () => {
    let $scope;
    let confirmUnsavedChanges;

    beforeEach(angular.mock.module(library));
    beforeEach(angular.mock.inject(($rootScope, $compile) => {
        const element = angular.element(html);
        const link = $compile(element);
        $scope = $rootScope.$new();
        $scope.$apply();

        confirmUnsavedChanges = link($scope);
    }));

    it('should show dialog with the message and resolve the promise', (endTest) => {
        const $ctrl = findController(confirmUnsavedChanges);
        const promise = $ctrl.transitionHook();
        promise.then(endTest);
        $scope.$apply();
        expect($('.modal-title').clone().children().remove().end().text().trim()).toBe('Title');
        expect($('.modal-body>p').text().trim()).toBe('Message');
        $('.btn-primary').trigger('click');
    });

    it('should reject the promise', (endTest) => {
        const $ctrl = findController(confirmUnsavedChanges);
        const promise = $ctrl.transitionHook();
        promise.catch(endTest);
        $scope.$apply();
        $('.btn-default').trigger('click');
    });
});