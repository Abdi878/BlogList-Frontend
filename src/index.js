import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { NotificationProvider } from "./NotificationContext";
import { UserProvider } from "./UserContext";
import { BrowserRouter } from "react-router-dom";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
  <UserProvider>
    <NotificationProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </NotificationProvider>
  </UserProvider>
  </BrowserRouter>
);
