export default class TestController {
    constructor(lodash, $log, LibraryService) {
        this._ = lodash;
        this.log = $log;
        this.LibraryService = LibraryService;
        this.bookList = [];
    }
    invertString(str) {
        return this._(str).split('').reverse().join('');
    }

    onBooksClick() {
        this.log.info('TestController', 'onBookClick');
        this.LibraryService.books()
            .then((response) => {
                this.log.info('TestController response', response);
                this.bookList = response.data;
            }, (err)=>{console.log('err', err)})
            //.catch(response => this.log.error('TestController response error', response));
    }
}

TestController.$inject = ['_', '$log', 'LibraryService'];
