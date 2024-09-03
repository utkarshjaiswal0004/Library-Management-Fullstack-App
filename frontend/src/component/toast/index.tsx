import React from "react";

const ToastContent: React.FC<{ title: string; message: string }> = ({
  title,
  message,
}) => (
  <div>
    <strong>{title}</strong>
    <div>{message}</div>
  </div>
);

export default ToastContent;
