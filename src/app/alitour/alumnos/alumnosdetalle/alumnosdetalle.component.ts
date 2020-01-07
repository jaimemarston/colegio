import {Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {MatDialog, MatSnackBar, MatTabChangeEvent, MatTableDataSource, MatPaginator} from '@angular/material';
import {Router} from '@angular/router';
import {Alumnos} from '../../../dataservice/alumnos';
import {DataService} from '../../../dataservice/data.service';
import {AlumnosdetalleService} from '../../../core/services/alumnosdetalle.service';
import {IAlumnosdetalle} from '../../../core/interfaces/alumnos.interface';
import {SelectionModel} from '@angular/cdk/collections';
import {fuseAnimations} from '../../../../@fuse/animations';
import {map} from 'rxjs/operators';

/**
 * @title Basic use of `<table mat-table>`
 */


@Component({
    selector: 'app-alumnosdetalle',
    templateUrl: './alumnosdetalle.component.html',
    animations: fuseAnimations
})

export class AlumnosdetalleComponent implements OnInit {
    _alumnosDetalle: Array<IAlumnosdetalle>;
    alumnosTotales = {
        subtotal: 0,
        descuento: 0,
        igv: 0,
        total_general: 0
    };

    get alumnosDetalle(): Array<IAlumnosdetalle> {
        return this._alumnosDetalle;
    }

    @Input() set alumnosDetalle(data: Array<IAlumnosdetalle>) {
        this._alumnosDetalle = data;
        this.dataSource.data = this.alumnosDetalle;
        if (this.alumnosDetalle) {
            this.dataSource.paginator = this.paginatordet;
        }
    }

    @Input() detail: any;

    @Input() idMaster: number;
    @Input() codempMaster: string;
    @Input() nombreMaster: string;
    
    @Output() updated: EventEmitter<any> = new EventEmitter();

    displayedColumns: string[] = ['select', 'codigo', 'codemp', 'nombre', 'fechaini', 'fechafin', 'importe', 'options'];
    @ViewChild(MatPaginator  , {static: false}) paginatordet: MatPaginator;

    alumnos: Array<IAlumnosdetalle>;
    dataSource = new MatTableDataSource<IAlumnosdetalle>();
    errorMessage: String;
    selectedId: number;
    edit: boolean;

    /** checkbox datatable */
    selection = new SelectionModel<IAlumnosdetalle>(true, []);

    constructor(
        private alumnosService: AlumnosdetalleService,
        private router: Router,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
        this.dataSource.data = this.alumnosDetalle;
    }

    getAlumnos(): void {
        this.alumnosService.getAlumnos()
            .pipe(map(alumnos => {
                alumnos = alumnos.map(c => {
                    return c;
                });
                return alumnos;
            }))
            .subscribe(response => {
                this.alumnos = response;
                this.dataSource.data = this.alumnos;
                this.dataSource.paginator = this.paginatordet;
                this.paginatordet._intl.itemsPerPageLabel = 'Item por Pagina:';
            });
    }

    delete(id: number): void {
        this.selectedId = id;
        this.deleteAlumnos();
    }

    deleteAlumnos(): void {
        this.alumnosService.deleteAlumnos(this.selectedId)
            .subscribe(response => {
                this.updated.emit(true);
            });
    }

    public editRecord(id: number): void {
        this.selectedId = id;
        this.edit = true;
    }

    public addRecord(): void {
        console.log('addRecord', this.idMaster, this.nombreMaster);
        this.edit = true;
        this.selectedId = null;
    }

    showDataTable(): void {
        this.edit = false;
    }

    updateDataTable(data: IAlumnosdetalle): void {
        this.updated.emit(data);
        this.paginatordet.lastPage();
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle(): void {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }


    openPrint(): void {
        window.print();
    }

    /**
     * async await sirve para esperar que una promesa sea cumplida
     * */
    async deleteAllSelecteds(): Promise<void> {
        const selecteds = this.selection.selected;
        for (let index = 0; index < selecteds.length; index++) {
            await this.alumnosService.deleteAlumnos(selecteds[index].id).toPromise();
            if (index === selecteds.length - 1) {
                this.snackBar.open('ELIMINADOS TODOS');
                this.updated.emit(true);
            }
        }
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    // calculateTotales(descuento = 0): void {
    //     this.alumnosTotales.descuento = descuento;
    //     /*this.alumnosTotales.subtotal = this.alumnosDetalle.reduce((a, b) => (b.imptotal * b.cantidad) + a, 0);*/
    //     this.alumnosTotales.subtotal = this.alumnosDetalle.reduce((a, b) => (b.imptotal), 0);
    //     this.alumnosTotales.total_general = (this.alumnosTotales.subtotal - this.alumnosTotales.descuento) + this.alumnosTotales.igv;
    //     this.alumnosTotales.igv = (this.alumnosTotales.subtotal - this.alumnosTotales.descuento) * 0.18;
    // }

    // onChangeDscto(event): void {
    //     this.calculateTotales(+(event.target.value ? event.target.value !== '' : 0));
    // }
}
