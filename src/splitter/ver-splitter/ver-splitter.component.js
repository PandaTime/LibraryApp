import VerSplitterTemplate from './ver-splitter.html';

const verSplitter = {
    template: VerSplitterTemplate,
    transclude: {
        'topPane': 'topPane',
        'bottomPane': 'bottomPane'
    },
    bindings: {
        wsize: '@'
    }
};

export default verSplitter;

