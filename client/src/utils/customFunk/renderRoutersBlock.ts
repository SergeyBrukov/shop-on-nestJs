import {RouterInterface} from "../interface/routerInterface";

const userRouters: RouterInterface[] = [
  {path: "/:lng?", element: "HomePage"}
];

const guestRouters: RouterInterface[] = [
  {path: "/:lng?/login", element: "LoginPage"},
  {path: "/:lng?/register", element: "RegisterPage"}
];

export const renderRoutersBlock = (authorized: boolean): RouterInterface[] => {
  return authorized ? userRouters : guestRouters;
};