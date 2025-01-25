import s from "./ErrorMessage.module.css";

const ErrorMessage = (message) => {
  return (
    <div className={s.ErrorMessage}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
