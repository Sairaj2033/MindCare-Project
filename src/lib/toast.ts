import React from "react";
import { toast as sonnerToast, ExternalToast } from "sonner";
import { notificationStore } from "./notifications";

export const toast = Object.assign(
  (msg: string | React.ReactNode, data?: ExternalToast) => {
    const textMsg = typeof msg === "string" ? msg : "Notification";
    notificationStore.add({ title: textMsg, description: data?.description as string, type: "default" });
    return sonnerToast(msg, data);
  },
  {
    success: (msg: string | React.ReactNode, data?: ExternalToast) => {
      const textMsg = typeof msg === "string" ? msg : "Success";
      notificationStore.add({ title: textMsg, description: data?.description as string, type: "success" });
      return sonnerToast.success(msg, data);
    },
    error: (msg: string | React.ReactNode, data?: ExternalToast) => {
      const textMsg = typeof msg === "string" ? msg : "Error";
      notificationStore.add({ title: textMsg, description: data?.description as string, type: "error" });
      return sonnerToast.error(msg, data);
    },
    info: (msg: string | React.ReactNode, data?: ExternalToast) => {
      const textMsg = typeof msg === "string" ? msg : "Info";
      notificationStore.add({ title: textMsg, description: data?.description as string, type: "info" });
      return sonnerToast.info(msg, data);
    },
    custom: (jsx: any, data?: ExternalToast) => {
      notificationStore.add({ title: "New Alert", description: "Interactive Action Notice", type: "default" });
      return sonnerToast.custom(jsx, data);
    },
    dismiss: (id?: string | number) => sonnerToast.dismiss(id)
  }
);
