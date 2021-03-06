import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
// import { IGuias } from '../../../core/interfaces/guias.interface';
// import { GuiaService } from '../../../core/services/guia.service';
import { fuseAnimations } from '../../../../@fuse/animations';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
export interface Ipost {
    id?: number;
    codigo: number;
    ruc: string;
    nombre: string;
    correo: string;
    telefono1: string;
} 

@Component({
    selector: 'profesores-list',
    templateUrl: './profesores-list.component.html',
    styleUrls: ['./profesores-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ProfesoresListComponent implements OnInit {

    /* displayedColumns: string[] = ['select', 'id', 'codigo', 'ruc' ,'nombre', 'telefono1', 'correo', 'options'];*/
    displayedColumns: string[] = ['select', 'ruc', 'nombre', 'telefono1', 'correo', 'options'];
    @ViewChild(MatPaginator , {static: false}) paginator: MatPaginator;

    infotab1: Array<Ipost>;
    dataSource = new MatTableDataSource<Ipost>();
    selectedId: number;
    edit: boolean;
    post: any;
    
    /** checkbox datatable */
    selection = new SelectionModel<Ipost>(true, []);

    constructor(
        private router: Router,
        public dialog: MatDialog,
        public http: HttpClient,
        private snackBar: MatSnackBar
    ) {
    }
    
    ngOnInit(): void {
        this.getInfotab1();
        const post$: Observable<Ipost> = this.http.get<Ipost>('/assets/data.json');
        post$.subscribe( post => {
            this.post = post;
            // console.log(post);
          });
    }

    getInfotab1(): void {
        const post$: Observable<Array<Ipost>> = this.http.get<Array<Ipost>>('/assets/data.json');
        post$.subscribe( response => {
            this.infotab1 = response;
            this.dataSource.data = this.infotab1;
            this.dataSource.paginator = this.paginator;
            this.paginator._intl.itemsPerPageLabel = 'Item por Pagina:';
            console.log(response);
          });

    }

    delete(id: number): void {
        this.selectedId = id;

        this.deleteGuia();

    }

    deleteGuia(): void {
        // this.guiaService.deleteGuia(this.selectedId)
        //     .subscribe(response => {
        //         /* console.log(response); */
        //         this.getProfesores();
        //     });
    }

    public editRecord(id: number): void {
        this.selectedId = id;
        // this.edit = true;
        this.router.navigate([`profesores/edit/${id}`]);
    }

    public addRecord(): void {
        // this.edit = true;
        this.selectedId = null;
    }

    showDataTable(): void {
        this.edit = false;
    }

    updateDataTable(data: Ipost): void {
        this.getInfotab1();
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
        // window.print();
        const prtContent = document.getElementById('div_print');
        const getTbody = () => {
            const tbody = this.infotab1.map(c => `<tr><td>${c.codigo}</td><td>${c.ruc}</td><td>${c.nombre}</td></tr>`).join('');
            return tbody;
        };
        prtContent.innerHTML = `
                         <h1>Relacion </h1>
                        <table border="1">
                          <thead><th>ruc</th><th>Ruc</th><th>Nombre</th></thead>
                          <tbody> ${getTbody()} </tbody>
                        </table>
                        <tfoot><button  onclick='window.print();'>Imprimir</button><button (click)="">Descargar PDF</button></tfoot>`;
        const WinPrint = window.open();
        WinPrint.document.write(prtContent.innerHTML);
        /*  WinPrint.document.close();
         WinPrint.focus();
         WinPrint.print();
         WinPrint.close(); */
    }

    /**
     * async await sirve para esperar que una promesa sea cumplida
     * */
    async deleteAllSelecteds(): Promise<void> {
        const selecteds = this.selection.selected;
        // for (let index = 0; index < selecteds.length; index++) {
        //     await this.guiaService.deleteGuia(selecteds[index].id).toPromise();
        //     if (index === selecteds.length - 1) {
        //         this.snackBar.open('ELMINADOS TODOS');
        //         this.getProfesores();
        //     }
        // }
    }

    addGuia(): void {
        this.router.navigate(['profesores/add']);
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    
}
