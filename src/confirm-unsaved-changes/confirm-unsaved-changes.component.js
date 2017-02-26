import confirmUnsavedChangesTemplate from './confirm-unsaved-changes.html';
import { RejectType, Rejection } from 'angular-ui-router';

class ConfirmUnsavedChangesController {
    constructor($log, $transitions, $uibModal) {
        
        this.log = $log.getInstance('ConfirmUnsavedChangesController');
        this.log.info('constructor', this);
        this.$transitions = $transitions;
        this.$uibModal = $uibModal;
    }

    $onInit() {
        this.log.info('$onInit');

        this.isDialogShown = false;
        this.dialogData = {
            message: this.message || 'Leave this page?',
            title: this.title || 'Unsaved changes',
            reject: new Rejection(RejectType.IGNORED)
        };
        this.deRegisterHook = this.$transitions.onEnter({}, this.transitionHook.bind(this));
    }
    
    $onDestroy() {
        this.log.info('$onDestroy');
        this.deRegisterHook();
    }


    transitionHook(transition, state) {
        this.log.info('transitionHook', transition, state);
        if(this.isUnsavedChanges) {
            const promise = this.showDialog();
            promise.then(() => this.deRegisterHook());
            return promise;
        }
        else return true;
    }

    showDialog() {
        this.log.info('showDialog');

        return this.$uibModal.open({
            animation: true,
            template: confirmUnsavedChangesTemplate,
            size: 'md',
            backdrop: 'static',
            controller: () => this.dialogData,
            controllerAs: '$ctrl',
            bindToController: true
        }).result;
    }
}

ConfirmUnsavedChangesController.$inject = ['$log', '$transitions', '$uibModal'];

const confirmUnsavedChanges  = {
    controller: ConfirmUnsavedChangesController,
    bindings: {
        isUnsavedChanges: '<',
        message: '@',
        title: '@'
    }
};

export default confirmUnsavedChanges;