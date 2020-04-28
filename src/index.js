import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { Layout } from './components';
import reducer from './store/reducer';
import './index.css';

const store = createStore(reducer);

const App = () => {
  return <Layout />;
};

const rootElement = document.getElementById('root');
ReactDOM.render(<Provider store={store}><App /></Provider>, rootElement);
