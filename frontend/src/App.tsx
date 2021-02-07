import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';
import MurcsHeader from './common/header';
import { Home, Pointing, Retro } from './pages';
import { ContentWrapper } from './style'
import { Layout } from 'antd'
const { Header, Footer, Content } = Layout;

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Layout style={{ overflow: 'auto' }}>
					<Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: '#000' }}>
						<MurcsHeader />
					</Header>
					<Layout>
						<Content style={{ marginTop: 64 }}>
							<ContentWrapper>
								<Route path='/' exact component={Home}></Route>
								<Route path='/pointing' exact component={Pointing}></Route>
								<Route path='/retro' exact component={Retro}></Route>
							</ContentWrapper>
						</Content>
						<Footer style={{ textAlign: 'center', paddingTop: 64 }}>Murcs ©2021 Created by Yixuan Qian</Footer>
					</Layout>
				</Layout>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
