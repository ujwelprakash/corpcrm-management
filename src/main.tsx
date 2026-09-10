import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { router } from "./routes/AppRoutes";
import "./lib/i18n"; // ← add this line
import "./styles/globals.css";
import { Provider } from "react-redux";
import { store } from "./app/store";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
  <Provider store={store}>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
</Provider>
  </StrictMode>
);