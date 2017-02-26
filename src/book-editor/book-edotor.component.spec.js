import angular from 'angular';
import library from '../main';
import booksStr from '../../srv/books.json';

class FakeFormController {
    constructor() {
        this.$dirty = false;
        this.$pristine = true;
    }
    $setPristine() { 
        this.$dirty = false; 
        this.$pristine = true; 
    }
    $setDirty() {
        this.$dirty = true; 
        this.$pristine = false; 
    }
}

describe('Book Editor Controller spec', () => {
    let _;
    let $httpBackend;
    let $componentController;
    let $rootScope;
    let books;
    let formController;

    beforeEach(angular.mock.module(library));
    beforeEach(angular.mock.inject((___, _$httpBackend_, _$componentController_, _$rootScope_) => {
        _ = ___;
        $httpBackend = _$httpBackend_;
        $componentController = _$componentController_;
        $rootScope = _$rootScope_;
        books = angular.fromJson(booksStr);
        formController = new FakeFormController();
    }));

    it('should load book with id 978-0641723445', () => {
        const bookId = '978-0641723445';
        const book = _.find(books, { id :  bookId }); 
        $httpBackend.expect('GET', '/api/books/978-0641723445').respond(200, book);

        const locals = {
            $scope: $rootScope
        };
        locals.$scope.form = formController;

        const binding = { bookId, onSaved: () => {} };

        const ctrl = $componentController('bookEditor', locals, binding);
        spyOn(formController, '$setPristine');
        ctrl.$onInit();
        $httpBackend.flush();

        expect(ctrl.book).toEqual(book);
        expect(formController.$setPristine).toHaveBeenCalled();
    });
});