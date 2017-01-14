webpackHotUpdate(0,{

/***/ 16:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__book_list_html__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__book_list_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__book_list_html__);


class BookListController{
    constructor(lodash, $log, LibraryService) {
        this._ = lodash;
        this.log = $log;
        this.LibraryService = LibraryService;
        this.orderBy = 'id';
    }

    $onInit() {
        this.log.info('TestController', 'onBookClick');
        this.LibraryService.bookList()
            .then((response) => {
                this.log.info('response', response);
                this.bookList = response.data;
            })
            .catch(response => this.log.error('response', response));
    }   
}

BookListController.$inject = ['_', '$log', 'LibraryService'];
const BookListComponent = {
    template: __WEBPACK_IMPORTED_MODULE_0__book_list_html___default.a,
    controller: BookListController
};

/* harmony default export */ exports["a"] = BookListComponent;

/***/ }

})