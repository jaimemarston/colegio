import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AlumnosmaestroComponent } from './alumnosmaestro/alumnosmaestro.component';
import { fuseAnimations } from '../../../@fuse/animations';
import { IAlumnosdetalle } from '../../core/interfaces/alumnos.interface';


/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector: 'app-alumnos',
    templateUrl: './alumnos.component.html',
    styleUrls: ['./alumnos.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AlumnosComponent implements OnInit {
    detail: Array<IAlumnosdetalle>;
    idMaster: number;
    codempMaster: string;
    nombreMaster: string;
    @ViewChild(AlumnosmaestroComponent, {static: false}) alumnosMaestro: AlumnosmaestroComponent;

    constructor() {
    }

    ngOnInit(): void {
    }

    setDetail(detail: Array<IAlumnosdetalle>): any {
        
        this.detail = detail;
        this.idMaster = this.alumnosMaestro.selectedId;
        
       
    }

    getAlumnos(): void {
        
        this.alumnosMaestro.getAlumno();
    }
}
