import { toast } from "react-toastify";

export const notify  = (message) => {
      toast.success(message, {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  
  }