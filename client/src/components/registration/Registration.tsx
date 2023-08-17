import styles from "./registration.module.scss";
import * as yup from "yup";
import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import ThemeBtn from "../../elements/themeBtn/ThemeBtn";
import FormInput from "../../elements/input/FormInput";
import SubmitBtn from "../../elements/buttons/SubmitBtn";
import BtnAsNavLink from "../../elements/buttons/BtnAsNavLink";
import {RegisterInterface} from "../../utils/interface/registerInterface";
import {useAppDispatch} from "../../app/hooks";
import {handleGoogleAuth, handleLoginApi, handleRegisterApi} from "../../features/user/userSlice";
import LanguageSelect from "../header/languagerSelect/LanguageSelect";
import {useNavigate} from "react-router-dom";
import {CredentialResponse, GoogleLogin} from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import {useTranslation} from "react-i18next";

const Registration = () => {
  const {t} = useTranslation("register")

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const examinationLoginFields = yup.object({
    name: yup.string().required("This field ca not be empty"),
    email: yup.string().required("This field ca not be empty").email("This field must be email"),
    password: yup.string().required("This field ca not be empty")
  });

  const [changeInputTypePassword, setChangeInputTypePassword] = useState(true);

  const {register, handleSubmit, formState: {errors, isValid}, reset} = useForm<RegisterInterface>({
    mode: "all",
    resolver: yupResolver(examinationLoginFields)
  });

  const handleRegister: SubmitHandler<RegisterInterface> = async (data) => {

    const response: any = await dispatch(handleRegisterApi(data));
    if (response.payload.status === 201) {
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
    <div className={styles.registerWrapper}>
      <div className={styles.toggleTheme}>
        <LanguageSelect />
        <ThemeBtn />
      </div>
      <div className={styles.registerBlock}>
        <div className={styles.infoBlock}>
          <h3>
            {t("welcome")}
          </h3>
          <p>
            {t("loginDesc")}
          </p>
          <BtnAsNavLink name={t("loginBtn")} path="/login" />
        </div>
      </div>
      <div className={styles.registerFormBlock}>
        <form onSubmit={handleSubmit(handleRegister)} className={styles.registerForm}>
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
          <FormInput defaultValue="" register={register} errors={errors} name="name" placeholder="Name" />
          <FormInput defaultValue="" register={register} errors={errors} name="email" placeholder="E-mail" />
          <FormInput defaultValue="" type={changeInputTypePassword ? "password" : "text"} register={register} errors={errors} name="password" placeholder="Password" />
          <SubmitBtn text={t("registerBtn")} />
        </form>
      </div>
    </div>
  );
};

export default Registration;