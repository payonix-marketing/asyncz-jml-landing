import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  timestamp: Date;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  setActiveNotification: (notification: Notification | null) => void;
  activeNotification: Notification | null;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeNotification, setActiveNotification] = useState<Notification | null>(null);

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  // For demo purposes, add a sample notification when the app loads
  useEffect(() => {
    const timer = setTimeout(() => {
      addNotification({
        title: "Booking Confirmed!",
        message: "Your surprise dinner at La Petite has been confirmed for tonight at 8:00 PM.",
        type: "success",
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
    setActiveNotification(newNotification);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setActiveNotification(null);
    }, 5000);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    if (activeNotification?.id === id) {
      setActiveNotification(null);
    }
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setActiveNotification(null);
  };

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
    activeNotification,
    setActiveNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}
