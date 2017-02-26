import ReaderEditorTemplate from './reader-editor.html';

class ReaderEditorController {
    constructor($log, ReadersService, $scope, $state) {
        this.log = $log.getInstance('ReaderEditorController');
        this.ReadersService = ReadersService;
        this.$scope = $scope;
        this.$state = $state;
        this.emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }

    $onInit() {
        this.log.info('$onInit');
        this.$scope.$watch(() => this.readerId, this.loadReader.bind(this));
    }

    loadReader(readerId) {
        this.log.info('loadReader');
        if(!readerId) {
            this.reader = undefined; 
            return;
        }
        this.ReadersService.get(readerId)
        .then((response) => {
            this.log.info('response', response);
            this.reader = response.data;
        })
        .catch(response => this.log.error('response', response));
    }

    onSave() {
        this.log.info('onSave');
        this.ReadersService.save(this.reader)
        .then((response) => {
            this.log.info('response', response);
            this.$scope.form.$setPristine();
            this.onSaved({ reader: this.reader });
            this.$state.go('readers');
        })
        .catch(response => this.log.error('response', response));
    }
}

ReaderEditorController.$inject = ['$log', 'ReadersService', '$scope', '$state'];

const readerEditorComponent = {
    template: ReaderEditorTemplate,
    controller: ReaderEditorController,
    bindings: {
        readerId: '<',
        onSaved: '&'
    }
};

export default readerEditorComponent;