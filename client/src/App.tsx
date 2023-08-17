import RoutersBlock from "./components/routers/RoutersBlock";
import axios from "axios";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {handleProfileApi} from "./features/user/userSlice";
import {useNavigate} from "react-router-dom";
import {operationWithLocalStorage} from "./utils/customFunk/operationWithLocalStorage";
import {ETypeOperationWithLocalStorage} from "./utils/enums/enums";

axios.defaults.baseURL = import.meta.env.VITE_MAIN_AXIOS_URL;

const App = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(store => store.userSlice.token);

  useEffect(() => {
    if (!!token) {
      dispatch(handleProfileApi()).then((response: any) => {
        if (response.payload.response?.status === 401) {
          navigate("/");
          operationWithLocalStorage("token", ETypeOperationWithLocalStorage.remove);
        }
      });
    }
  }, [token]);

  return <RoutersBlock />;
};

export default App;
