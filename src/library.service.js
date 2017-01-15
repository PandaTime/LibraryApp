export default class LibraryService {
    constructor($log, $http) {
        this.log = $log;
        this.$http = $http;
    }
    bookList() {
        this.log.info('LibraryService', 'books');
        return this.$http.get('/api/books')
    }
    bookInfo(id){
        return this.$http.get(`api/books/${id}`);
    }
    deleteBook(id){
        this.log.info(`Deleting books w/ id ${id}..`);
        return this.$http.delete(`/api/books/${id}`);
    }
    saveBookInfo(book){
        return this.$http.put(`/api/books/${book.id}`, book);
    }
}

LibraryService.$inject = ['$log', '$http'];