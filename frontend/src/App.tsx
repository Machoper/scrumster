import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import store from "./store";
import MyHeader from "./common/header";
import { Home, Login, Register, Pointing, Retro } from "./pages";
import { MyContent } from "./style";
import { Affix, BackTop, Layout, Space, Spin } from "antd";
import { setAccessToken } from "./client";
import MyFooter from "./common/footer";
import Title from "antd/lib/typography/Title";
const { Header, Footer, Content } = Layout;

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uri = process.env.REACT_APP_IS_DEV
      ? `${process.env.REACT_APP_API_ENDPOINT}/refresh_token`
      : "/refresh_token";
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
      <div className="align-center-flex" style={{ minHeight: "100vh" }}>
        <Space>
          <Title>Loading...</Title>
          <Spin size="large" />
        </Space>
      </div>
    );
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout style={{ overflow: "auto", minHeight: "100vh" }}>
          <Header
            style={{
              position: "fixed",
              zIndex: 1,
              width: "100%",
              background: "#000",
              boxShadow: "0px 3px 4px 1px #78797b"
            }}
          >
            <MyHeader />
          </Header>
          <Layout style={{ marginTop: 64 }}>
            <MyContent>
              <Route path="/" exact component={Home}></Route>
              <Route path="/register" exact component={Register}></Route>
              <Route path="/login" exact component={Login}></Route>
              <Route path="/pointing" exact component={Pointing}></Route>
              <Route path="/pointing/:roomId" component={Pointing}></Route>
              <Route path="/retro" exact component={Retro}></Route>
              <Route path="/retro/:roomId" component={Retro}></Route>
            </MyContent>
            <Footer style={{ textAlign: "center", zIndex: 1 }}>
              <MyFooter />
            </Footer>
          </Layout>
          <BackTop />
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
