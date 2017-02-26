import angular from 'angular';
import library from '../main';
import booksStr from '../../srv/books.json';

describe('Book Service spec', () => {
    let $httpBackend;
    let BooksService;

    beforeEach(angular.mock.module(library));
    beforeEach(angular.mock.inject((_$httpBackend_, _BooksService_) => {
        $httpBackend = _$httpBackend_;
        BooksService = _BooksService_;
    }));

    it('list()', () => {
        const books = angular.fromJson(booksStr);
        $httpBackend.expect('GET', '/api/books').respond(200, books);
        let responseBooks;
        BooksService.list()
        .then((r) => {
            responseBooks = r.data;
        });
        $httpBackend.flush();
        expect(books).toEqual(responseBooks);
    });
});