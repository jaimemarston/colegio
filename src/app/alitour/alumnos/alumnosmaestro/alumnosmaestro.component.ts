import {Component, OnInit, ViewChild, EventEmitter, Output, OnDestroy} from '@angular/core';
import {MatDialog, MatSnackBar, MatTabChangeEvent, MatTableDataSource, MatPaginator} from '@angular/material';
import {Router} from '@angular/router';
import {Alumnos} from '../../../dataservice/alumnos';
import {DataService} from '../../../dataservice/data.service';
import {Alumnoservice} from '../../../core/services/alumnos.service';
import {IAlumnos, IAlumnosdetalle} from '../../../core/interfaces/alumnos.interface';
import {SelectionModel} from '@angular/cdk/collections';
import {AlumnosdetalleService} from '../../../core/services/alumnosdetalle.service';
import {AlumnosdetalleComponent} from '../alumnosdetalle/alumnosdetalle.component';
import {IProveedores} from 'app/core/interfaces/proveedores.interface';
import {MonthService} from '../../../shared/components/footer/month.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector: 'app-alumnosmaestro',
    templateUrl: './alumnosmaestro.component.html',
})

export class AlumnosmaestroComponent implements OnInit, OnDestroy {

    displayedColumns: string[] = ['select', 'codigo', 'nombre' , 'telefono1', 'direccion', 'options'];
    @ViewChild(MatPaginator , {static: false}) paginator: MatPaginator;

    alumnos: Array<IAlumnos>;
    alumnosdetalle: Array<IAlumnosdetalle>;
    alumnosSelected: IAlumnos;
    dataSource = new MatTableDataSource<IAlumnos>();
    dataSourceDetalle = new MatTableDataSource<IAlumnosdetalle>();
    errorMessage: String;
    selectedId: number;
    edit: boolean;
    @Output() shower: EventEmitter<any> = new EventEmitter();
    @Output() detalle: EventEmitter<Array<IAlumnosdetalle>> = new EventEmitter();


    /** checkbox datatable */
    selection = new SelectionModel<IAlumnos>(true, []);

    monthSelected: number;

    unsubscribe = new Subject();

    constructor(
        private alumnosService: Alumnoservice,
        private router: Router,
        public http: HttpClient,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
        private alumnosServicedetalle: AlumnosdetalleService,
        private monthService: MonthService
    ) {
        this.monthService.monthSelected
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(month => {
                this.monthSelected = month;
                this.getAlumno();
            });
    }

    ngOnInit(): void {
        this.getAlumno();
    }


    getAlumno(): void {
        

        // const post$: Observable<Array<IAlumnos>> = this.http.get<Array<IAlumnos>>('/assets/malumnos.json');
        // post$.subscribe( response => {
        //     this.alumnos = response;
        //     this.alumnosSelected = this.alumnos[0];
        //     this.dataSource.data = this.alumnos;
        //     this.dataSource.paginator = this.paginator;
        //     this.paginator._intl.itemsPerPageLabel = 'Item por Pagina:';
        //     console.log(response);
        //   });

        this.alumnosService.getAlumnos()
            .subscribe(response => {
                this.alumnos = response;
                
                // this.alumnosSelected = this.alumnos[0];
                this.dataSource.data = this.alumnos;
                this.dataSource.paginator = this.paginator;
                this.paginator._intl.itemsPerPageLabel = 'Item por Pagina:';
                // this.detalle.emit(this.alumnos[0].alumnoses);
                this.updateAlumnoselected(true);
            });
    }


    updateAlumnoselected(emit?: boolean): void {
       
        if (this.alumnosSelected) {
            this.alumnosSelected = this.alumnos.find((v, i) => v.id === this.alumnosSelected.id);
        } else {
            this.alumnosSelected = this.alumnos[0];
        }
        if (emit) {
           
            this.detalle.emit(this.alumnosSelected ? this.alumnosSelected.movpersonal : []);
        }
    }

    viewRecorddetail(alumnos: IAlumnos): void {
        this.selectedId = alumnos.id;
        // console.log('viewRecorddetail', this.selectedId, alumnos);
        this.alumnosSelected = alumnos;
        this.detalle.emit(this.alumnosSelected.movpersonal);
    }

    delete(id: number): void {
        this.selectedId = id;
        this.deleteAlumno();
    }

    deleteAlumno(): void {
        if (confirm('Esta seguro que desea borrar este registro?')) {
            this.alumnosService.deleteAlumno(this.selectedId)
                .subscribe(response => {
                    /* console.log(response); */
                    this.getAlumno();
                });
        }
    }

    public editRecord(row: any): void {
        this.selectedId = row.id;
        this.edit = true;
    }

    public addRecord(): void {
        this.edit = true;
        this.selectedId = null;
    }

    showDataTable(): void {
        this.edit = false;
    }

    updateDataTable(data: IAlumnos): void {
        this.getAlumno();
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }


    openPrint() {
        window.print();
    }

    /**
     * async await sirve para esperar que una promesa sea cumplida
     * */
    async deleteAllSelecteds() {
        const selecteds = this.selection.selected;
        for (let index = 0; index < selecteds.length; index++) {
            await this.alumnosService.deleteAlumno(selecteds[index].id).toPromise();
            if (index === selecteds.length - 1) {
                this.snackBar.open('ELMINADOS TODOS');
                this.getAlumno();
            }
        }
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
    
}
