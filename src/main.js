import './main.css';
import '../index.html';

import _ from 'lodash';
import angular from 'angular';
import TestController from './test.controller';
import LibraryService from './library.service';

angular.module('webproject', [])
.constant('_', _)
.controller('TestController', TestController)
.service('LibraryService', LibraryService);


