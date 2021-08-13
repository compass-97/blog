import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Home from './components/Home';
import Create from './components/Create';
import Post from './components/Post';
import Update from './components/Update';
import Admin from './secure/Admin';
import Adminhome from './secure/Adminhome';
import Notfound from './components/Notfound';

const GlobalStyle = createGlobalStyle`
* {padding: 0; margin: 0;}

a {text-decoration: none; color: black;}

ul,ol,li {list-style: none;}
.ql-align-justify {
  text-align: justify;
}
.ql-align-right {
  text-align: right;
}
.ql-align-center {
  text-align: center;
}
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
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/post/:id' component={Post} />
      <Route exact path='/alsemdj' component={Admin} />
      <Route path='/alsemdj/home' component={Adminhome} />
      <Route path='/alsemdj/create' component={Create} />
      <Route path='/alsemdj/update/:id' component={Update} />
      <Route component={Notfound} />
    </Switch>
    </>
  );
}

export default App;
