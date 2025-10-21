import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { FeatureFlagService } from "../modules/shared/services/featureflags.service";

@Injectable({
    providedIn: 'root'
})

export class FeatureFlagGuardService implements CanActivate {
 
    constructor(private featureFlagService: FeatureFlagService,private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {
        return this.checkFeatureFlag(route);
    }

    private checkFeatureFlag(route: ActivatedRouteSnapshot | null): boolean {
        if(route != null)
        {
            const featureFlag = route.data['featureFlag'];
            if (featureFlag != null && featureFlag != '') {                
                if (featureFlag) {
                    return this.featureFlagService.featureOn(featureFlag);
                }
                return true;
            } else {                
                return true;
            }
        }
        else return true;
    }
}
