import { RouterDirection } from "@ionic/react";
import { RoleType } from "../types";

export interface IMenuItem {
  name: string;
  route: string;
  icon: string;
  isWebLink: boolean;
  routerDirection: RouterDirection;
  roleTypes: RoleType[];
}
