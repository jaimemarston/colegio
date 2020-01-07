import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfesoresComponent } from './profesores.component';
import { ProfesoresListComponent } from './profesores-list/profesores-list.component';

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
import { ProfesoresFormComponent } from './profesores-form/profesores-form.component';
import {ActionIconsModule} from '../../shared/components/action-icons/action-icons.module';

const routes: Routes = [
    {
        path: '',
        component: ProfesoresComponent,
        children: [
            {
                path: '',
                component: ProfesoresListComponent
            },
            {
                path: 'edit/:id',
                component: ProfesoresFormComponent
            },
            {
                path: 'add',
                component: ProfesoresFormComponent
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
    declarations: [ProfesoresComponent, ProfesoresListComponent, ProfesoresFormComponent],

})
export class ProfesoresModule {
}
