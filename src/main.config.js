export default function config($stateProvider, $urlServiceProvider) {
    $urlServiceProvider.rules.otherwise('/login');
    
    $stateProvider
    .state({
        name: 'login',
        url: '/login',
        component: 'login'
    })
    .state({
        name: 'app',
        abstract: true,
        component: 'libraryApp',
        onRetain : checkLogin
    })
    .state({
        name: 'app.books', 
        abstract: true,
        template: 
`
<hor-splitter>
    <top-pane>
        <book-list></book-list>
    </top-pane>
    <bottom-pane>
        <lb-panel title="Book details">
            <ui-view></ui-view>
        </lb-panel>
    </bottom-pane>
</hor-splitter>
`
    })
    .state({
        name: 'app.books.empty', 
        url: '/books',
        template: '<h1>Select any book above</h1>'
    })
    .state({
        name: 'app.books.edit', 
        url: '/{bookId}',
        component: 'bookEditor',
        resolve: {
            bookId: ['$transition$', ($transition$) => $transition$.params().bookId]
        }
    })
    .state({
        name: 'app.readers', 
		abstract: true,
        template: 
`
<ver-splitter wsize="48">
    <top-pane>
        <readers-list></readers-list>
    </top-pane>
    <bottom-pane>
        <lb-panel title="Reader details">
            <ui-view></ui-view>
        </lb-panel>
    </bottom-pane>
</ver-splitter>
`
    })
	.state({
		name: 'app.readers.empty',
        url: '/readers',
		template: '<h1>Select any reader above</h1>'
	})
    .state({
        name: 'app.readers.edit', 
        url: '/readers/{readerId}',
        component: 'readerEditor',
        resolve: {
            readerId: ['$transition$', ($transition$) => $transition$.params().readerId]
        }
    })
    .state({
        name: 'app.promises', 
        url: '/promises',
        component: 'promisesTest'
    });
    
}

config.$inject = ['$stateProvider', '$urlServiceProvider'];

function checkLogin($log, $state, LoginService) {
    const log = $log.getInstance('checkLogin');
    log.info('checkLogin');
    if(LoginService.loggedIn) return true;
    $state.go('login');
}
checkLogin.$inject = ['$log', '$state', 'LoginService'];