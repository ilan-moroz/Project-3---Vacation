import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import MainLayout from "./Components/Layout/MainLayout/MainLayout";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { vacation, persistor } from "./Redux/VacationStore";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={vacation}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

reportWebVitals();
