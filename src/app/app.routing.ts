import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AlitourGuard } from './core/guards/alitour.guard';
import { CafeGuard } from './core/guards/cafe.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: './alitour/authentication/login/login.module#LoginModule'
    },
    {
        path: 'cafe',
        canActivate: [AuthGuard, CafeGuard],
        redirectTo: 'auth/login'
    },
    {
        path: '',
        canActivate: [AuthGuard, AlitourGuard],
        children: [
            {
                path: 'users',
                loadChildren: './alitour/users/users.module#UsersModule'
            },
            {
                path: 'calendario',
                loadChildren: './alitour/calendar/calendar.module#CalendarModule'
            },
            {
                path: 'alumnos',
                loadChildren: './alitour/alumnos/alumnos.module#AlumnosModule'
            },
            {
                path: 'proveedores',
                loadChildren: './alitour/proveedores/proveedores.module#ProveedoresModule'
            },
            {
                path: 'cotizacion',
                loadChildren: './alitour/cotizacion/cotizacion.module#CotizacionModule'
            },
            {
                path: 'liquidacion',
                loadChildren: './alitour/liquidacion/liquidacion.module#LiquidacionModule'
            },
            {
                path: 'unidades',
                loadChildren: './alitour/unidades/unidades.module#UnidadesModule'
            },
            {
                path: 'choferes',
                loadChildren: './alitour/choferes/choferes.module#ChoferesModule'
            },
            {
                path: 'guias',
                loadChildren: './alitour/guias/guias.module#GuiasModule'
            },
            {
                path: 'profesores',
                loadChildren: './alitour/profesores/profesores.module#ProfesoresModule'
            },
            {
                path: 'alumnos',
                loadChildren: './alitour/alumnos/alumnos.module#AlumnosModule'
            },
            {
                path: 'aulas',
                loadChildren: './alitour/aulas/aulas.module#AulasModule'
            },
            {
                path: 'notas',
                loadChildren: './alitour/notas/notas.module#NotasModule'
            },
            {
                path: 'cursos',
                loadChildren: './alitour/cursos/cursos.module#CursosModule'
            },
            {
                path: 'dashboards/analytics',
                loadChildren: './alitour/dashboards/analytics/analytics.module#AnalyticsDashboardModule'
            },
            {
                path: 'dashboards/projects',
                loadChildren: './alitour/dashboards/project/project.module#ProjectDashboardModule'
            },
        ]
    },
];
