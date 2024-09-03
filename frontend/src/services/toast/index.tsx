import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastContent from "../../component/toast";

// Default toast options
const defaultOptions: ToastOptions = {
  position: "bottom-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// Success toast
export const showSuccessToast = (title: string, message: string) => {
  toast.success(
    <ToastContent title={title} message={message} />,
    defaultOptions,
  );
};

// Error toast
export const showErrorToast = (title: string, message: string) => {
  toast.error(<ToastContent title={title} message={message} />, defaultOptions);
};

// Warning toast
export const showWarningToast = (title: string, message: string) => {
  toast.warn(<ToastContent title={title} message={message} />, defaultOptions);
};
