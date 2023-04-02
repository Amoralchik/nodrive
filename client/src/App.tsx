import { useEffect } from "react";
import Layout from "./Layout/Layout";
import { Archive } from "./page/Archive";
import { Landing } from "./page/Landing";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@store/slices/login";
import { RootState } from "./store";

function App() {
  axios.defaults.baseURL = "http://localhost:3001/";
  axios.defaults.withCredentials = true;

  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.loginReducer.isLogin);

  useEffect(() => {
    if (!isLogin) login(dispatch);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route index element={<Landing />} />

        <Route
          path="/archive"
          element={
            <Layout>
              <Archive />
            </Layout>
          }
        />

        <Route path="*" element={<div />} />
      </Routes>
    </div>
  );
}

export default App;
