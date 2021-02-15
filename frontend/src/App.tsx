import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';
import MurcsHeader from './common/header';
import { Home, Pointing, Retro } from './pages';
import { ContentWrapper } from './style'
import { BackTop, Layout } from 'antd'
const { Header, Footer, Content } = Layout;

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Layout style={{ overflow: 'auto' }}>
					<Header style={{ 
						position: 'fixed', 
						zIndex: 1, 
						width: '100%', 
						background: '#000', 
						boxShadow: '0px 3px 4px 1px #78797b' 
					}}>
						<MurcsHeader />
					</Header>
					<Layout style={{ marginTop: 64, minHeight: 'calc(100vh - 64px)' }}>
						<Content >
							<ContentWrapper>
								<Route path='/' exact component={Home}></Route>
								<Route path='/pointing' exact component={Pointing}></Route>
								<Route path='/retro' exact component={Retro}></Route>
							</ContentWrapper>
						</Content>
						<Footer 
							style={{ textAlign: 'center', width: '100%' }}
						>Murcs ©2021 Created by Yixuan Qian
						</Footer>
					</Layout>
					<BackTop />
				</Layout>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
