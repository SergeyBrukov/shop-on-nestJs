 import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import styles from "./login.module.scss";
import {SubmitHandler, useForm} from "react-hook-form";
import {LoginInterface} from "../../utils/interface/loginInterface";
import {useState} from "react";
import SubmitBtn from "../../elements/buttons/SubmitBtn";
import BtnAsNavLink from "../../elements/buttons/BtnAsNavLink";
import ThemeBtn from "../../elements/themeBtn/ThemeBtn";
import FormInput from "../../elements/input/FormInput";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {handleGoogleAuth, handleLoginApi} from "../../features/user/userSlice";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import LanguageSelect from "../header/languagerSelect/LanguageSelect";
import {CredentialResponse, GoogleLogin} from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import axios from "axios";

const Login = () => {

  const {t} = useTranslation("login");

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const {loading} = useAppSelector(store => store.userSlice);

  const examinationLoginFields = yup.object({
    email: yup.string().required("This field ca not be empty").email("This field must be email"),
    password: yup.string().required("This field ca not be empty")
  });

  const [changeInputTypePassword, setChangeInputTypePassword] = useState(true);

  const {register, handleSubmit, formState: {errors, isValid}, reset} = useForm<LoginInterface>({
    mode: "all",
    resolver: yupResolver(examinationLoginFields)
  });

  const handleLogin: SubmitHandler<LoginInterface> = async (data) => {
    const response: any = await dispatch(handleLoginApi(data));
    if (response.payload.status === 200) {
      navigate("/");
    }
  };


  const onSuccess = async (credentialResponse:CredentialResponse) => {
    const decode:{email: string, name: string} = jwtDecode(credentialResponse.credential as string);

    const response: any = await dispatch(handleGoogleAuth({email: decode.email, name: decode.name}));
    if (response.payload.status === 200) {
      navigate("/");
    }

  }

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.toggleTheme}>
        <LanguageSelect />
        <ThemeBtn />
      </div>
      <div className={styles.loginFormBlock}>
        <form onSubmit={handleSubmit(handleLogin)} className={styles.loginForm}>
          <div className={styles.googleBtn}>
            <GoogleLogin
              type="icon"
              onSuccess={onSuccess}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>
          <h3>{t("title")}</h3>
          <FormInput disabled={loading} defaultValue="" register={register} errors={errors} name="email" placeholder="E-mail" />
          <FormInput disabled={loading} defaultValue="" type={changeInputTypePassword ? "password" : "text"} register={register} errors={errors} name="password" placeholder="Password" />
          <SubmitBtn disabled={loading} text={t("loginBtn")} />
        </form>
      </div>
      <div className={styles.registerBlock}>
        <div className={styles.infoBlock}>
          <h3>
            {t("hello")}
          </h3>
          <p>
            {t("description")}
          </p>
          <BtnAsNavLink name={t("registerBtn")} path="/register" />
        </div>
      </div>
    </div>
  );
};

export default Login;