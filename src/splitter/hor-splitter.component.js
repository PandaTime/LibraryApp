import HorSplitterTemplate from './hor-splitter.html';

const horSplitter = {
    template: HorSplitterTemplate,
    transclude: {
        'topPane': 'topPane',
        'bottomPane': 'bottomPane'
    }
};

export default horSplitter;

