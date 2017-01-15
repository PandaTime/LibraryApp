import BookListTemplate from './book-list.html';
import * as types from './../event-types';
import './style.css';

class BookListController{
    constructor(lodash, $rootScope, $log, LibraryService) {
        this._ = lodash;
        this.log = $log;
        this.rootScope = $rootScope;
        this.LibraryService = LibraryService;
        this.orderBy = 'id';
        this.rootScope.$on(types.BookListChangedEvent, ()=>{this.GetBooksList()})
    }

    $onInit() {
        this.GetBooksList();
    }
    GetBooksList(){
        this.LibraryService.bookList()
            .then((response) => {
                this.bookList = response.data;
            })
            .catch(response => this.log.error('response', response));
    }
    EditBook(id){
        this.rootScope.$emit(types.EditBookEvent, id);
    }
}

BookListController.$inject = ['_', '$rootScope','$log', 'LibraryService'];
const BookListComponent = {
    template: BookListTemplate,
    controller: BookListController
};

export default BookListComponent;