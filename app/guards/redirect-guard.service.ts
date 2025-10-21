import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { firstPermissionRoute } from "../common/helpers";

@Injectable({
    providedIn: 'root'
})
export class RedirectGuard implements CanActivate {

    constructor(
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const routes = route.data['routes'] as Routes;
        if (!routes) {
            return false;
        }
        const location = firstPermissionRoute(routes);
        if (location === '') {
            return false;
        }
        this.router.navigate([location]);
        return true;
    }
}