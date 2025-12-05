import React, { useEffect, useState } from "react";
import keycloakService from "./keycloak/KeycloakService";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import { LoadingProgress } from "@/page/loading";
import { LocalizationProvider } from "@mui/x-date-pickers";
import "react-toastify/dist/ReactToastify.css";
import { DialogView} from "./components/dialog";
import { ToastView } from "./components/toast";


let flagInitKeycloak = false;
const App: React.FC = () => {
  const [kcInitialized, setKcInitialized] = useState(false);

  // useEffect(() => {
  //   const getUserDetails = async () => {
  //     //other code
  //     if (!kcInitialized && !flagInitKeycloak) {
  //       flagInitKeycloak = true;
  //       await keycloakService
  //         .init()
  //         .then((kcInitialized) => {
  //           setKcInitialized(kcInitialized);
  //         })
  //         .catch((error) => {
  //           console.error("Authentication error", error);
  //         });
  //     }
  //   };
  //   getUserDetails();
  // }, []);

 
  // if (!kcInitialized) {
  //   return <></>;
  // }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={router} />
      <LoadingProgress />
      <DialogView />
      <ToastView />
    </LocalizationProvider>
  );
};

export default App;
