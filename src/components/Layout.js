import React from 'react';

import App from './App';
import Header from './Header'

import '../styles/main.scss';

const Layout = () => {
  return (
    <>
      <Header></Header>
      <main>
        <App />
      </main>
    </>
  );
};

export default Layout;
