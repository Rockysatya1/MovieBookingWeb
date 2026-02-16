import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './shared/login/login';
import { Register } from './shared/register/register';
import { CustomerAuthGuard } from './core/auth-guards/customer-auth.guard';
import { LoggedInGuard } from './core/auth-guards/logged-in.guard';
import { AdminAuthGuard } from './core/auth-guards/admin-auth.guard';

export const routes: Routes = [
    { path: '', component: Home },
    {
        path: 'login',
        loadComponent: () => import('./shared/login/login').then(m => m.Login),
        canActivate: [LoggedInGuard]
    },
    {
        path: 'register',
        loadComponent: () => import('./shared/register/register').then(m => m.Register),
        canActivate: [LoggedInGuard]
    },
    {
        path: 'view-tickets',
        loadComponent: () => import('./mytickets/mytickets').then(m => m.Mytickets),
        canActivate: [CustomerAuthGuard]
    },
    {
        path: 'seat-matrix/:id',
        loadComponent: () => import('./bookmyshow/bookmyshow').then(m => m.Bookmyshow),
        canActivate: [CustomerAuthGuard]
    },
    {
        path: 'admin-dashboard',
        loadComponent: () => import('./admin-dashboard/admin-dashboard').then(m => m.AdminDashboard),
        canActivate: [AdminAuthGuard]
    }
];




