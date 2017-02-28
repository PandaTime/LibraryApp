import './main.css';
import '../index.html';

import _ from 'lodash';
import angular from 'angular';
import 'angular-logger';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';

import BooksService from './services/books.service';
import ReadersService from './services/readers.service';
import LoginService from './services/login.service';
import bookListComponent from './book-list/book-list.component';
import readersListComponent from './reader-list/reader-list.component';
import readersEditorComponent from './reader-editor/reader-editor.component';
import bookEditorComponent from './book-editor/book-editor.component';
import libraryAppComponent from './library-app/library-app.component';
import lbRequired from './validators/lb-required.directive';
import lbAsyncValidate from './validators/lb-async-validate.directive';
import lbArray from './parsers/lb-array.directive.js';
import lbPanel from './lb-panel/lb-panel.component';
import horSplitter from './splitter/hor-splitter/hor-splitter.component.js';
import verSplitter from './splitter/ver-splitter/ver-splitter.component.js';
import promisesTest from './promises-test/promises-test.component';
import login from './login/login.component';
import navigationBar from './navigation-bar/navigation-bar.component';

import confirmUnsavedChanges from './confirm-unsaved-changes/confirm-unsaved-changes.component';

import config from './main.config';

// https://github.com/pdorgambide/angular-logger
function logConfig(logEnhancerProvider) {
    logEnhancerProvider.datetimePattern = 'HH:mm:ss:SSS';
    logEnhancerProvider.prefixPattern = '%s [%s]-';
}

logConfig.$inject = ['logEnhancerProvider'];

export default angular.module('library', ['angular-logger', uiRouter, uiBootstrap])
.config(logConfig)
.constant('_', _)
.service('BooksService', BooksService)
.service('ReadersService', ReadersService)
.service('LoginService', LoginService)
.component('libraryApp', libraryAppComponent)
.component('bookList', bookListComponent)
.component('bookEditor', bookEditorComponent)
.component('readersList', readersListComponent)
.component('readerEditor', readersEditorComponent)
.component('confirmUnsavedChanges', confirmUnsavedChanges)
.component('lbPanel', lbPanel)
.component('horSplitter', horSplitter)
.component('verSplitter', verSplitter)
.component('promisesTest', promisesTest)
.component('navigationBar', navigationBar)
.component('login', login)
.directive('lbRequired', lbRequired)
.directive('lbAsyncValidate', lbAsyncValidate)
.directive('lbArray', lbArray)
.config(config)
.name;


