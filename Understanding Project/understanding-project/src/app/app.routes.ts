import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        pathMatch: 'full' // Good practice for the empty path
    },
    {
        path: 'home',
        component: Home,
    },
    {
        path: 'about',
        component: About,
    },
    // Optional: Add a 'Page Not Found' fallback at the bottom
    {
        path: '**',
        redirectTo: ''
    }
];
