export default function routes($stateProvider){
	$stateProvider
		.state('home', {
			url: '/',
			template: require('./homePage/templates/index.html'),
			controller: 'MainCtrl',
			controllerAs: 'mCtrl'
		})
}