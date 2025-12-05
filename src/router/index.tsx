import ErrorPage from "@/page/errorPage";
import Nav from "@/page/navbar";
import RootRedirect from "@/page/rootRedirect";
import { ROLE } from "@/constant";
import { decodeToken } from "@/utils";
import { createBrowserRouter, useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { HomePage } from "@/page/home-page";
import { BookingPage } from "@/page/booking-page";
import { ListBooking } from "@/page/booking-page/list-booking";
// import { ManagementLuckNumberScreen } from "@/page/management-lucky-number";
// import { UpdateWareLuckyNumberScreen } from "@/page/management-lucky-number/update-ware-luckynumber";
// import { ConfigFeeNumberScreen } from "@/page/config-fee-number";
// import { DetailLuckyNumberScreen } from "@/page/management-lucky-number/detail-luckynumber";
// import { EditConfigFee } from "@/page/config-fee-number/edit-config-fee";
// import { PromotionManagement } from "@/page/promotion";
// import { UpdatePromotionScreen } from "@/page/promotion/update-promotion";
// import { ServiceTrackingScreen } from "@/page/service-tracking";
// import { ReportCustomerScreen } from "@/page/report";
// import { DetailReportCustomerScreen } from "@/page/report/detail-report";
// import { ConfigScreen } from "@/page/config-feature";
// import { EditConfigScreen } from "@/page/config-feature/edit-config";
// import { ManageUser } from "@/page/user";
// import { EditUserScreen } from "@/page/user/edit-user";
// import { _requestDetailUser } from "@/api/user";

const ProtectedRoute = ({
  element,
  requiredRoles,
  titleId,
}: {
  element: any;
  requiredRoles?: string[];
  titleId: string;
}) => {
  // const [roles, setRoles] = useState<string[]>([]);
  // const navigate = useNavigate;

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (token) {
  //     const result = decodeToken(token!);

  //     const userRoles = result?.realm_access?.roles || [];

  //     setRoles(userRoles);
  //   }
  // }, []);

  const hasRequiredRole = true;
  // requiredRoles?.length
  //   ? requiredRoles.some((role: any) => roles.includes(role))
  //   : false;

  return hasRequiredRole ? element : <ErrorPage isLogout={false} />;
};

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Nav />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
          errorElement: <ErrorPage isLogout={false} />,
        },
        {
          path: "/booking-page",
          element: <BookingPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/booking-list",
          element: <ListBooking />,
          errorElement: <ErrorPage />,
        },
      ],
    },

    {
      path: "/error",
      element: <ErrorPage />,
    },
  ],
  {
    basename: "/",
  }
);
