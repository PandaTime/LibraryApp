import PanelTemplate from './lb-panel.html';

const lbPanelComponent = {
    template: PanelTemplate,
    transclude: true,
    bindings: {
        title: '@',
    }
};

export default lbPanelComponent;