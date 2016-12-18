##Redux App

[![Build Status](https://semaphoreci.com/api/v1/freezystem/redux-app/branches/master/shields_badge.svg)](https://semaphoreci.com/freezystem/redux-app)
[![Dependency Status](https://david-dm.org/freezystem/redux-app.svg)](https://david-dm.org/freezystem/redux-app)
[![devDependency Status](https://david-dm.org/freezystem/redux-app/dev-status.svg)](https://david-dm.org/freezystem/redux-app#info=devDependencies)

> Just a simple app with routing, tests and stuff to learn Redux.

###Features

Here is the features I intend to have in this project
- [x] Configure a webpack development build
- [x] Create a simple redux app
- [x] Add some styles
- [x] Add routing and history
- [x] Add async calls to API
- [x] Use Reactive Functionnal Programming paradigm
- [x] Add unit tests on actions, reducers and components
- [x] Add automated continuous integration
- [x] Add Redux Dev Tools
- [x] Add Linter
- [x] Write and Generate Documentation
- [x] Add (fake) authentication
- [ ] Add and use complex forms
- [ ] Add e2e tests on application
- [ ] Mock/Stub calls to API
- [ ] Create production ready build in Yarn scripts
- [ ] Make some data persistent (LocalStorage / SessionStorage)

###What's in

Build 
- [Yarn](https://github.com/yarnpkg/yarn)
- [Babel](https://github.com/babel/babel)
- [Webpack](https://github.com/webpack/webpack)
- [Webpack-dev-server](https://github.com/webpack/webpack-dev-server)

Libraries
- [React](https://github.com/facebook/react)
- [React-redux](https://github.com/reactjs/react-redux)
- [React-router](https://github.com/reactjs/react-router)
- [React-router-redux](https://github.com/reactjs/react-router-redux)
- [Redux](https://github.com/reactjs/redux)
- [Redux-auth-wrapper](https://github.com/mjrussell/redux-auth-wrapper)
- [RxJS](https://github.com/ReactiveX/RxJS)
- [Redux-observable](https://github.com/redux-observable/redux-observable)
- [History](https://github.com/mjackson/history)

Style
- [Sass](https://github.com/sass/sass)
- [Classnames](https://github.com/JedWatson/classnames)

Tests
- [Mocha](https://github.com/mochajs/mocha)
- [Expect](https://github.com/mjackson/expect)
- [Enzyme](https://github.com/airbnb/enzyme)
- [DeepFreeze](https://github.com/substack/deep-freeze)
- [jsDOM](https://github.com/tmpvar/jsdom)

Documentation and quality

- [ESDoc](https://esdoc.org)
- [EsLint](http://eslint.org)

###Yarn scripts

####Setup the app
```
git clone https://github.com/Freezystem/redux-app.git
cd redux-app && yarn
```

####Run development app
First add this line to `/etc/hosts` on Unix systems or `C:\Windows\System32\drivers\etc` on Windows.
```
127.0.0.1           redux.app.io
```
Then just run
```
yarn run dev
```

####Build production app
```
yarn run build
```

or for a clean install
```
yarn run build:clean
```

####Run tests
```
yarn test
```
or with watch option
```
yarn run test:watch
```

####Generate Documentation
```
yarn run doc
```