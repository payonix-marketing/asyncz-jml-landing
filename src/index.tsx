import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { LanguageProvider } from "./context/LanguageContext";
import { HelmetProvider } from "react-helmet-async";

// Providers wrapper to avoid nesting issues
const AppWithProviders = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <LanguageProvider>
          <HelmetProvider>
            <App />
          </HelmetProvider>
          <Toaster />
        </LanguageProvider>
      </NotificationProvider>
    </AuthProvider>
  );
};

createRoot(document.getElementById("root")!).render(<AppWithProviders />);
