import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import LoginPage from './components/Login/LoginPage';
import HomePage from './containers/HomePage';
import RegisterPage from './components/Login/RegisterPage';
import { Router } from 'react-router-dom';
import PostModal from './containers/PostModal';
import ProfilePage from './containers/ProfilePage';

class App extends Component {
  render() {
    return (
        <div>
          <Layout>
            <HomePage/>
          </Layout>
        </div>
    );
  }
}

export default App;
