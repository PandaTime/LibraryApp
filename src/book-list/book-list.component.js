import BookListTemplate from './book-list.html';

class BookListController{
    constructor(lodash, $log, BooksService) {
        this._ = lodash;
        this.log = $log.getInstance('BookListController');
        this.BooksService = BooksService;
        this.orderBy = 'id';
    }

    $onInit() {
        this.log.info('$onInit');
        this.loadBooks();
        this.bookListApi = {
            update: this.loadBooks.bind(this)
        };
    }   

    loadBooks() {
        this.BooksService.list()
        .then((response) => {
            this.log.info('response', response);
            this.bookList = response.data;
        })
        .catch(response => this.log.error('response', response));
    }

    onRemove(bookId) {
        this.log.info('onRemove', bookId);
        this.BooksService.delete(bookId)
        .then((response) => {
            this.log.info('response', response);
            this._.remove(this.bookList, { id: bookId });
            if(this.selectedBookId === bookId)
                this.selectedBookId = undefined;
        })
        .catch(response => this.log.error('response', response));
    }

    onSelect(bookId) {
        this.log.info('onSelect', bookId);
        this.selectedBookId = bookId;
    }
}

BookListController.$inject = ['_', '$log', 'BooksService'];
const bookListComponent = {
    template: BookListTemplate,
    controller: BookListController,
    bindings: {
        selectedBookId: '=?',
        bookListApi: '=?'
    }
};

export default bookListComponent;