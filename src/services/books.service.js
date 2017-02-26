export default class BooksService {
    constructor(_, $log, $http, $q) {
        this._ = _;
        this.log = $log.getInstance('BooksService');
        this.$http = $http;
        this.$q = $q;
    }
    list() {
        this.log.info('list');
        return this.$http.get('/api/books');
    }
    isUniqueId(bookId, newBookId) {
        this.log.info('isUniqueId', bookId, newBookId);
        return this.$q((resolve, reject) => {
            this.list()
            .then((response) =>{
                const books = response.data;
                this._.remove(books, { id: bookId });
                if(this._.find(books, { id: newBookId })) reject();
                else resolve();
            })
            .catch((response) => {
                this.log.error('response', response);
                reject();
            });
        });
    }
    delete(bookId) {
        this.log.info('delete', bookId);
        return this.$http.delete(`/api/books/${bookId}`);
    }
    get(bookId) {
        this.log.info('editBook', bookId);
        return this.$http.get(`/api/books/${bookId}`);
    }
    save(book) {
        this.log.info('saveBook', book);
        return this.$http.put(`/api/books/${book.id}`, book);
    }
}

BooksService.$inject = ['_', '$log', '$http', '$q'];