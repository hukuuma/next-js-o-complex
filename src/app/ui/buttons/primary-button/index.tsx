import React from 'react';
import styles from './styles.module.css';

type Props = {
    text: string;
    htmlType?: "submit" | "button" | "reset";
    onClick?: Function;
    customClassName?: string;
}
export default function PrimaryButton({ text, htmlType, onClick, customClassName }: Props) {
    return (
      <button className={`${styles.button} ${customClassName}`} type={htmlType} onClick={onClick as any}>
        <span className={styles.buttonText}>
            {text}
        </span>
      </button>
    )
}