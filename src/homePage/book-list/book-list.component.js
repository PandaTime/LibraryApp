import BookListTemplate from './book-list.html';

class BookListController{
    constructor(lodash, $log, LibraryService) {
        this._ = lodash;
        this.log = $log;
        this.LibraryService = LibraryService;
        this.orderBy = 'id';
    }

    $onInit() {
        this.log.info('TestController', 'onBookClick');
        this.LibraryService.bookList()
            .then((response) => {
                this.log.info('response', response);
                this.bookList = response.data;
            })
            .catch(response => this.log.error('response', response));
    }   
}

BookListController.$inject = ['_', '$log', 'LibraryService'];
const BookListComponent = {
    template: BookListTemplate,
    controller: BookListController
};

export default BookListComponent;