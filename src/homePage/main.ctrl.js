
export default class MainCtrl{
	constructor(lodash, $scope){
		this._ = lodash;
		this.scope = $scope;
		this.bookList = []
	}
	
}

MainCtrl.$inject = ['_', '$scope', 'LibraryService'];
