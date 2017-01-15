import BookEditorTemplate from './book-editor.html';
import * as types from './../event-types';

class BookEditorController{
    constructor(lodash, $log, $scope, $rootScope, LibraryService) {
        this._ = lodash;
        this.log = $log;
        this.scope = $scope;
        this.rootScope = $rootScope;
        this.LibraryService = LibraryService;
        this.bookInfo = {};
        this.scope.bookId = '978-0641723445';
        this.scope.$watch('bookId', (newValue, oldValue)=>{
            LibraryService.bookInfo(newValue)
                .then((res)=>{
                    this.bookInfo = res.data;
                    this.bookInfo.cat = res.data.cat.join(',');
                })
                .catch((err)=>{console.log('Book Editor', err)});
        });
        this.rootScope.$on(types.EditBookEvent, (event, data)=>{
            this.scope.bookId = data;
        })
    }
    $onInit() {
        this.LibraryService.bookList()
            .then((response) => {
                this.bookList = response.data;
            })
            .catch(response => this.log.error('response', response));
    }
    onSaveBook(){
        var book = Object.assign({}, this.bookInfo);
        book.cat = book.cat ? book.cat.split(',') : [];
        this.LibraryService.saveBookInfo(book)
            .then((res)=>{this.BookChange()})
            .catch((err)=>{this.log.error('Bad:', err)});
    }
    BookChange(){
        this.rootScope.$emit(types.BookListChangedEvent);
    }
}

BookEditorController.$inject = ['_', '$log', '$scope', '$rootScope', 'LibraryService'];
const BookEditorComponent = {
    template: BookEditorTemplate,
    controller: BookEditorController
};

export default BookEditorComponent;