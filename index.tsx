// import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, RouteComponentProps, Redirect, Router } from 'react-router-dom';
import Nav from './src/components/Nav/nav';
import Footer from './src/components/Footer';
import Home from './src/scenes/Home';
import CategoryView from './src/scenes/CategoryView/categoryview';
import DetailView from './src/scenes/DetailView/detailview';
import Cart from './src/scenes/Cart/cartview';
import 'bootstrap/dist/css/bootstrap.min.css';
import './src/styles/styles.scss';
import configureStore from './src/store/store';

const store = configureStore()

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<div className="main-wrapper">
				<Nav/>
				<Switch>
					<Route exact={true} path="/" component={Home} />
					<Route path="/category/:category" component={CategoryView} />
					<Route path="/details/:name/:color" component={DetailView} />
					<Route path="/cart" component={Cart} />
				</Switch>
				<Footer/>
			</div>
		</BrowserRouter>
	</Provider>
	,document.getElementById('root'),
);


/**
 * TODO: ESLINT
 * REDUX
 * STORY-BOOK
 * UNIT TEST
 */
