
export default class MainCtrl{
	constructor(lodash, $scope, $log, LibraryService){
		this._ = lodash;
		this.log = $log;
		this.scope = $scope;
		this.libService = LibraryService;
		this.selectedBook = {id: 'lol'};
		this.bookList = [];
	}
	onBooksClick() {
		this.libService.books()
			.then(this.booksAsyncHandler.bind(this), this.booksErrorHandler.bind(this));
	}
	delClick(id){
		this.libService.deleteBook(id)
			.then(this.booksAsyncHandler.bind(this), this.booksErrorHandler.bind(this));
	}
	selectBook(id){
		this.libService.editBook(id)
			.then(
				(res)=>{
					this.selectedBook = res.data;
					this.selectedBook.cat = this.selectedBook.cat.join(',');
				},
				(err)=>{this.log.error(err)}
			);
	}
	onSaveBook(){
		var book = Object.assign({}, this.selectedBook);
		book.cat = book.cat ? book.cat.split(',') : [];
		this.libService.saveBookInfo(book).then(
			(res)=>{
				if(res.data.type == 'new'){
					this.bookList.push(Object.assign({}, this.selectedBook));
				}else{
					this.bookList[this.bookList.findIndex((el)=>el.id==this.selectedBook.id)] = Object.assign({}, this.selectedBook);
				}
			},(err)=>{this.log.error('Bad')});
	}
	booksAsyncHandler(res){
		this.log.info('TestController response', res);
		this.bookList = res.data;
	}
	booksErrorHandler(err){
		this.log.error('Error:', err);
	}

}

MainCtrl.$inject = ['_', '$scope', '$log', 'LibraryService'];
