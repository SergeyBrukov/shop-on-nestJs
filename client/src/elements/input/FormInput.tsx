import React, {FC} from "react";
import styles from "./input.module.scss"


type TFormErrors = {
    [name: string]: string
}

interface IFormInput extends React.InputHTMLAttributes<HTMLInputElement> {
    register: any,
    errors?: TFormErrors | any
    name: string
}

const FormInput: FC<IFormInput> = ({register, errors, name, ...props}) => {
    return (
        <div className={styles.inputBlock}>
            <input {...props} defaultValue={props.defaultValue} type={props.type} {...register(name)} placeholder={props.placeholder} />
            {errors?.[name] && <span className={styles.errorMessage}>{errors[name].message}</span>}
        </div>
    )
}

export default FormInput