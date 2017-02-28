import ReaderListTemplate from './reader-list.html';

class ReaderListController{
    constructor(lodash, $log, ReadersService) {
        this._ = lodash;
        this.log = $log.getInstance('ReaderListController');
        this.ReadersService = ReadersService;
        this.orderBy = 'id';
        this.maxElements = 10;
        this.currentPage = 1;
    }

    $onInit() {
        this.log.info('$onInit');
        this.loadReaders();
        this.readerListApi = {
            update: this.loadReaders.bind(this)
        };
    }

    loadReaders() {
        this.ReadersService.list()
        .then((response) => {
            this.log.info('response', response);
            this.readerList = response.data;
        })
        .catch(response => this.log.error('response', response));
    }

    onRemove(readerId) {
        this.log.info('onRemove', readerId);
        this.ReadersService.delete(readerId)
        .then((response) => {
            this.log.info('response', response);
            this._.remove(this.readerList, { id: readerId });
            if(this.selectedReaderId === readerId)
                this.selectedReaderId = undefined;
        })
        .catch(response => this.log.error('response', response));
    }

    onSelect(readerId) {
        this.log.info('onSelectReader', readerId);
        this.selectedReaderId = readerId;
    }
}

ReaderListController.$inject = ['_', '$log', 'ReadersService'];
const readerListComponent = {
    template: ReaderListTemplate,
    controller: ReaderListController,
    bindings: {
        selectedReaderId: '=',
        ReaderListApi: '='
    }
};

export default readerListComponent;