import React from 'react';
import ReactDOM from 'react-dom';
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducers from './reducers'
import { BrowserRouter as Router } from 'react-router-dom'
import routers from './router.js.js'
import Navigation from './components/navigation'

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(logger, thunk)))

ReactDOM.render(
    <Provider store={store}>
      <Router routes={routers}>
        <Navigation/>
         {routers}
      </Router>
    </Provider>
  ,
  document.getElementById('root')
);

