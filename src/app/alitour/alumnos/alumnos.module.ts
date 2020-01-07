import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlumnosComponent} from './alumnos.component';
import {RouterModule, Routes} from '@angular/router';
import {
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatListModule,
    MatSelectModule,
    MatAutocompleteModule,
    MAT_SNACK_BAR_DEFAULT_OPTIONS, MatMenuModule, MatRippleModule, MatOptionModule, MatDividerModule,
} from '@angular/material';
import {EditAlumnosComponent} from './alumnosmaestro/editalumnos/editalumnos.component';
import {AlumnosmaestroComponent} from './alumnosmaestro/alumnosmaestro.component';
import {AlumnosdetalleComponent} from './alumnosdetalle/alumnosdetalle.component';
import {EditalumnosdetalleComponent} from './alumnosdetalle/editalumnosdetalle/editalumnosdetalle.component';
import {FuseSharedModule} from '../../../@fuse/shared.module';
import {ToolbarTableModule} from '../../shared/components/toolbar-table/toolbar-table.module';
import {FuseConfirmDialogModule, FuseSidebarModule} from '../../../@fuse/components';
import {ActionIconsModule} from '../../shared/components/action-icons/action-icons.module';
import {EditalumnosdetalleModule} from './alumnosdetalle/editalumnosdetalle/editalumnosdetalle.module';

const routes: Routes = [
    {
        path: '',
        component: AlumnosComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTabsModule,
        MatTableModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatSnackBarModule,
        MatOptionModule,
        MatSelectModule,
        FuseSharedModule,
        ToolbarTableModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,
        MatDatepickerModule,
        MatNativeDateModule,         // <----- import(optional)
        MatChipsModule,
        MatSelectModule,
        MatAutocompleteModule,
        RouterModule.forChild(routes),
        ActionIconsModule,
        MatDividerModule,

        EditalumnosdetalleModule
    ],
    declarations: [AlumnosComponent, AlumnosmaestroComponent, AlumnosdetalleComponent, EditAlumnosComponent],
    providers: [{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000}}]
})
export class AlumnosModule {
}
