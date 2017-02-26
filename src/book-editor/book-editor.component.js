import BookEditorTemplate from './book-editor.html';

class BookEditorController {
    constructor($log, BooksService, $scope, $state) {
        this.log = $log.getInstance('BookEditorController');
        this.BooksService = BooksService;
        this.$scope = $scope;
        this.$state = $state;
    }

    $onInit() {
        this.log.info('$onInit');
        this.$scope.$watch(() => this.bookId, this.loadBook.bind(this));
    }

    loadBook(bookId) {
        this.log.info('loadBook');
        this.book = undefined; 
        this.$scope.form.$setPristine();
        if(!bookId) {
            return;
        }
        this.BooksService.get(bookId)
        .then((response) => {
            this.log.info('response', response);
            this.book = response.data;
        })
        .catch(response => this.log.error('response', response));
    }

    onSave() {
        this.log.info('onSave');
        this.BooksService.save(this.book)
        .then((response) => {
            this.log.info('response', response);
            this.$scope.form.$setPristine();
            this.onSaved({ book: this.book });
            this.$state.reload();
        })
        .catch(response => this.log.error('response', response));
    }
}

BookEditorController.$inject = ['$log', 'BooksService', '$scope', '$state'];

const bookEditorComponent = {
    template: BookEditorTemplate,
    controller: BookEditorController,
    bindings: {
        bookId: '<',
        onSaved: '&'
    }
};

export default bookEditorComponent;