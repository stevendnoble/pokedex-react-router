import classNames from "classnames";
import styles from "./Button.module.css";
export function Button({ onClick, disabled, small, buttonText }) {
  const btnClass = classNames({
    [styles.btn]: true,
    [styles.disabled]: disabled,
    [styles.small]: small,
  });

  return (
    <button onClick={onClick} disabled={disabled} className={btnClass}>
      {buttonText}
    </button>
  );
}
