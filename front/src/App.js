import React from 'react';
import { Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Home from './components/Home';
import Create from './components/Create';
import Post from './components/Post';
import Update from './components/Update';

const GlobalStyle = createGlobalStyle`
* {padding: 0; margin: 0;}

a {text-decoration: none; color: black;}

ul,ol,li {list-style: none;}

.ql-size-small {
  font-size: 0.75em;
}

.ql-size-large {
  font-size: 1.5em;
}

.ql-size-huge {
  font-size: 2.5em;
}
`

function App() {
  return (
    <>
    <GlobalStyle />
    <Header />
    <Route path='/' exact component={Home} />
    <Route path='/create' exact component={Create} />
    <Route path='/post/:id' exact component={Post} />
    <Route path='/update/:id' exact component={Update} />
    </>
  );
}

export default App;
