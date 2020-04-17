import React from 'react';

import App from './App';
import Header from './Header'

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
