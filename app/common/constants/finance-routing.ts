import { Routes } from "@angular/router";

export const FinanceRoutes: Routes = [
    {
      path: '/accounting-period',
      data: {
        permissionCodes: ['REACCPERIOD']
      }
    },
    {
      path: '/countysurtax',
      data: {
        permissionCodes: ['RECOUNTYTAX']
      }
    },
    {
      path: '/lumber-inventory-code',
      data: {
        permissionCodes: ['RELUMBERINVENTORYCODE']
      }
    }
  ]