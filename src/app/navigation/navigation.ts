import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Opciones',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
           
            {
                id: 'amaestros',
                title: 'Maestros',
                type: 'collapsable',
                icon: 'email',
                children: [
                    {
                        id: 'alumnos',
                        title: 'Registro de Alumnos',
                        type: 'item',
                        icon: 'email',
                        url: '/alumnos',
                    },
                    {
                        id: 'profe',
                        title: 'Registro de Docentes/Horarios',
                        type: 'item',
                        icon: 'email',
                        url: '/profesores',
                    },
                    {
                        id: 'aulas',
                        title: 'Aulas',
                        type: 'item',
                        icon: 'email',
                        url: '/aulas',
                    },
                    {
                        id: 'cursos',
                        title: 'Cursos',
                        type: 'item',
                        icon: 'email',
                        url: '/cursos',
                    },
                    {
                        id: 'notas',
                        title: 'Notas',
                        type: 'item',
                        icon: 'local_taxi',
                        url: '/notas',
                    },
  
                ]
            },
            {
                id: 'clientes',
                title: 'Malla Curricular',
                type: 'item',
                icon: 'local_shipping',
                url: '/alumnos',
            },
            {
                id: 'proveedores',
                title: 'Calendario de Examenes',
                type: 'item',
                icon: 'local_shipping',
                url: '/proveedores',
            },
            {
                id: 'cotizacion',
                title: 'Cronograma Escolar',
                type: 'item',
                icon: 'email',
                url: '/cotizacion',
            },
            {
                id: 'liquidacion',
                title: 'Registro de Calificaciones',
                type: 'item',
                icon: 'email',
                url: '/liquidacion',
            },
            {
                id: 'liquidacion',
                title: 'Reportes',
                type: 'item',
                icon: 'email',
                url: '/liquidacion',
            },
            {
                id: 'articulos',
                title: 'Facturacion',
                type: 'item',
                icon: 'print',
                url: '/articulos',
            },
            {
                id: 'pagos',
                title: 'Control de Pagos',
                type: 'item',
                icon: 'print',
                url: '/articulos',
            },
            {
                id: 'asistencia',
                title: 'Asistencia',
                type: 'item',
                icon: 'print',
                url: '/articulos',
            },
            {
                id: 'dashboard',
                title: 'Dashboard',
                type: 'collapsable',
                icon: 'email',
                children: [
                    {
                        id: 'dashboard_analytics',
                        title: 'Analitica',
                        type: 'item',
                        icon: 'email',
                        url: '/dashboards/analytics',
                    },
                    {
                        id: 'dashboard_projects',
                        title: 'Proyectos',
                        type: 'item',
                        icon: 'email',
                        url: '/dashboards/projects',
                    }
                ]
            },
        ]
    }
];
