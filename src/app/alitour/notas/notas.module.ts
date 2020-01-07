import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotasComponent } from './notas.component';
import { NotasListComponent } from './notas-list/notas-list.component';

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
import { NotasFormComponent } from './notas-form/notas-form.component';
import {ActionIconsModule} from '../../shared/components/action-icons/action-icons.module';

const routes: Routes = [
    {
        path: '',
        component: NotasComponent,
        children: [
            {
                path: '',
                component: NotasListComponent
            },
            {
                path: 'edit/:id',
                component: NotasFormComponent
            },
            {
                path: 'add',
                component: NotasFormComponent
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
    declarations: [NotasComponent, NotasListComponent, NotasFormComponent],

})
export class NotasModule {
}
