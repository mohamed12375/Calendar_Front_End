import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('accessToken');
    const path = route.routeConfig?.path;
    console.log(path)

    if ((path === 'login' || path === 'signup') && !token) {
      return true; // Allow access to login and signup paths
    }
    if((path === 'login' || path === 'signup') && token){
      this.router.navigate(['/']);
      return false; // Redirect to / if token
    } else
    if (token) {
      return true; // Allow access if token exists
    } else {
      this.router.navigate(['/login']);
      return false; // Redirect to login if no token
    }
  }
}
