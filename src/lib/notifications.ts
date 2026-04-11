import { useSyncExternalStore } from "react";

export type NotificationItem = {
  id: string;
  title: string;
  description?: string;
  type?: "success" | "error" | "info" | "default";
  timestamp: Date;
};

let notifications: NotificationItem[] = [];
let listeners: Array<() => void> = [];

const emitChange = () => {
  for (let listener of listeners) {
    listener();
  }
};

export const notificationStore = {
  getSnapshot: () => notifications,
  subscribe: (listener: () => void) => {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  add: (item: Omit<NotificationItem, "id" | "timestamp">) => {
    const newNotif = {
      ...item,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date(),
    };
    notifications = [newNotif, ...notifications];
    emitChange();
  },
  remove: (id: string) => {
    notifications = notifications.filter((n) => n.id !== id);
    emitChange();
  },
  clear: () => {
    notifications = [];
    emitChange();
  },
};

export function useNotifications() {
  const store = useSyncExternalStore(
    notificationStore.subscribe,
    notificationStore.getSnapshot
  );
  return {
    notifications: store,
    add: notificationStore.add,
    remove: notificationStore.remove,
    clear: notificationStore.clear,
  };
}
