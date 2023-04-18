import { useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@store/slices/login";
import { RootState } from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { Landing } from "./page/Landing";
import { NotFound } from "./page/404";
import { ArchiveLayout } from "./Layout/ArchiveLayout";

function App() {
  axios.defaults.baseURL = "http://localhost:3001/";
  axios.defaults.withCredentials = true;

  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.loginReducer.isLogin);

  useEffect(() => {
    if (!isLogin) login(dispatch);
  }, []);

  return (
    <div className="font-sans">
      <ToastContainer autoClose={1000} position="bottom-left" />

      <Routes>
        <Route index element={<Landing />} />

        {isLogin && <Route path="/archive" element={<ArchiveLayout />} />}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
