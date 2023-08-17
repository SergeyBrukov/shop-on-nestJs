import styles from "./buttons.module.scss";
import React, {FC} from "react";
import BtnLoader from "../loaders/buttonLoader/BtnLoader";

interface ISubmitBtn extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string,
  loading?: boolean
}

const SubmitBtn: FC<ISubmitBtn> = ({text, loading, ...props}) => {


  if (loading) {
    return <BtnLoader />;
  }

  return (
    <div className={styles.submitBtn}>
      <button {...props}>
        <span className="circle1"></span>
        <span className="circle2"></span>
        <span className="circle3"></span>
        <span className="circle4"></span>
        <span className="circle5"></span>
        <span className="text">{text}</span>
      </button>
    </div>
  );
};

export default SubmitBtn;