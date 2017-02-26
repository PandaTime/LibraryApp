export default class ReadersService {
    constructor(_, $log, $http, $q) {
        this._ = _;
        this.log = $log.getInstance('ReadersService');
        this.$http = $http;
        this.$q = $q;
    }
    list() {
        this.log.info('list');
        return this.$http.get('/api/readers');
    }
    isUniqueId(readerId, newReaderId) {
        this.log.info('isUniqueId', readerId, newReaderId);
        return this.$q((resolve, reject) => {
            this.list()
            .then((response) =>{
                const readers = response.data;
                this._.remove(readers, { id: readerId });
                if(this._.find(readers, { id: newReaderId })) reject();
                else resolve();
            })
            .catch((response) => {
                this.log.error('response', response);
                reject();
            });
        });
    }

    delete(readerId) {
        this.log.info('delete', readerId);
        return this.$http.delete(`/api/readers/${readerId}`);
    }
    get(readerId) {
        this.log.info('editBook', readerId);
        return this.$http.get(`/api/readers/${readerId}`);
    }
    save(reader) {
        this.log.info('saveBook', reader);
        return this.$http.put(`/api/readers/${reader.id}`, reader);
    }
}

ReadersService.$inject = ['_', '$log', '$http', '$q'];