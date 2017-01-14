import './main.scss';
//import 'bootstrap/dist/css/bootstrap.min.css'
import '../index.html';
import routes from './app.routing.js';

import _ from 'lodash';
import angular from 'angular';
import uirouter from 'angular-ui-router';
import MainCtrl from './homePage/main.ctrl.js'
import BookListComponent from './homePage/book-list/book-list.component';
import LibraryService from './library.service';

angular.module('webproject', [uirouter, routes])
	.constant('_', _)
	.config(routing)
	.controller('MainCtrl', MainCtrl)
	.component('bookList', BookListComponent)
	.service('LibraryService', LibraryService);


function routing($urlRouterProvider, $locationProvider){//, NotificationProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/');
	/*NotificationProvider.setOptions({
		positionY: 'top',
		positionX: 'right'
	});*/
}