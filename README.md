##Redux App

[![Build Status](https://semaphoreci.com/api/v1/freezystem/redux-app/branches/master/badge.svg)](https://semaphoreci.com/freezystem/redux-app)

> Just a simple redux app with routing, tests and stuff to learn Redux.

###Features

Here is the features I inted to have on this project
- [x] Configure a full webpack build
- [x] Create a simple redux app
- [ ] Add some styles
- [ ] Add routing and history
- [ ] Add async calls to API
- [x] Add unit tests on actions, reducers and components
- [ ] Add e2e tests on components
- [x] Add automated continuous integration

###Libs

Compile 
- [Babel](https://github.com/babel/babel)

Build 
- [Webpack](https://github.com/webpack/webpack)
- [Webpack-dev-server](https://github.com/webpack/webpack-dev-server)

Framework
- [React](https://github.com/facebook/react)
- [React-redux](https://github.com/reactjs/react-redux)
- [React-router-redux](https://github.com/reactjs/react-router-redux)
- [Redux](https://github.com/reactjs/redux)
- [History](https://github.com/mjackson/history)

Style
- [Sass](https://github.com/sass/sass)

Tests
- [Mocha](https://github.com/mochajs/mocha)
- [Expect](https://github.com/mjackson/expect)
- [Enzyme](https://github.com/airbnb/enzyme)
- [DeepFreeze](https://github.com/substack/deep-freeze)
- [jsDOM](https://github.com/tmpvar/jsdom)

###NPM scripts

####Setup the app
```
git clone https://github.com/Freezystem/redux-app.git;
npm install
```

####Run development app
```
npm run dev
```

####Build production app
```
npm run build
```

or for a clean install
```
npm run build:clean
```

####Run tests
```
npm test
```
or with watch option
```
npm test:watch
```
