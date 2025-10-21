import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const permissionCodes = route.data['permissionCodes'] as string[] | string;
        if (permissionCodes && !this.authService.hasPermission(permissionCodes)) {
            alert("You do not have permission to access this page.");

            this.router.navigate(['/'], {replaceUrl: true});
            window.history.back();
            return false;
        }
        return true;
    }
}
