export default class LibraryService {
    constructor($log, $http) {
        this.log = $log;
        this.$http = $http;
    }
    books() {
        this.log.info('LibraryService', 'books');
        return this.$http.get('/api/books');
    }
}

LibraryService.$inject = ['$log', '$http'];