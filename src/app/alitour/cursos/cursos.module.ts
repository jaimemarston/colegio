import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './cursos.component';
import { CursosListComponent } from './cursos-list/cursos-list.component';

import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule, MatOptionModule, MatPaginatorModule,
    MatRippleModule, MatSelectModule, MatSnackBarModule,
    MatTableModule, MatToolbarModule
} from '@angular/material';
import { FuseSharedModule } from '../../../@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '../../../@fuse/components';
import { ToolbarTableModule } from '../../shared/components/toolbar-table/toolbar-table.module';
import { CursosFormComponent } from './cursos-form/cursos-form.component';
import {ActionIconsModule} from '../../shared/components/action-icons/action-icons.module';

const routes: Routes = [
    {
        path: '',
        component: CursosComponent,
        children: [
            {
                path: '',
                component: CursosListComponent
            },
            {
                path: 'edit/:id',
                component: CursosFormComponent
            },
            {
                path: 'add',
                component: CursosFormComponent
            }
        ]
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,
        MatCardModule,
        MatPaginatorModule,
        MatSnackBarModule,
        MatOptionModule,
        MatSelectModule,
        FuseSharedModule,
        ToolbarTableModule,
        FuseConfirmDialogModule,
        ActionIconsModule,
        FuseSidebarModule
    ],
    declarations: [CursosComponent, CursosListComponent, CursosFormComponent],

})
export class CursosModule {
}
