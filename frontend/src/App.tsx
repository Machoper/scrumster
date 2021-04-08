import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import store from "./store";
import MurcsyHeader from "./common/header";
import { Home, Login, Register, Pointing, Retro } from "./pages";
import { ContentWrapper } from "./style";
import { BackTop, Layout, Spin } from "antd";
import { setAccessToken } from "./client";
const { Header, Footer, Content } = Layout;

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uri = process.env.REACT_APP_IS_DEV
      ? `${process.env.REACT_APP_API_ENDPOINT}/refresh_token`
      : "refresh_token";
    fetch(uri, {
      method: "POST",
      credentials: "include"
    }).then(
      async res => {
        const { accessToken } = await res.json();
        setAccessToken(accessToken);
        setLoading(false);
      },
      err => {
        setAccessToken("");
        setLoading(false);
        console.log(err);
      }
    );
  }, []);

  if (loading) {
    return (
      <div className="align-center-flex container">
        <Spin className="" size="large"></Spin>
      </div>
    );
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout style={{ overflow: "auto" }}>
          <Header
            style={{
              position: "fixed",
              zIndex: 1,
              width: "100%",
              background: "#000",
              boxShadow: "0px 3px 4px 1px #78797b"
            }}
          >
            <MurcsyHeader />
          </Header>
          <Layout style={{ marginTop: 64, minHeight: "calc(100vh - 64px)" }}>
            <Content>
              <ContentWrapper>
                <Route path="/" exact component={Home}></Route>
                <Route path="/register" exact component={Register}></Route>
                <Route path="/login" exact component={Login}></Route>
                <Route path="/pointing" exact component={Pointing}></Route>
                <Route path="/pointing/:roomId" component={Pointing}></Route>
                <Route path="/retro" exact component={Retro}></Route>
                <Route path="/retro/:roomId" component={Retro}></Route>
              </ContentWrapper>
            </Content>
            <Footer style={{ textAlign: "center", width: "100%" }}>
              ©2021 Created by Yixuan Qian
            </Footer>
          </Layout>
          <BackTop />
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
