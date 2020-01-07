import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AlumnosdetalleService } from '../../../../core/services/alumnosdetalle.service';
import { IAlumnosdetalle } from '../../../../core/interfaces/alumnos.interface';
import { IArticulo } from '../../../../core/interfaces/articulo.interface';
import { IUnidad } from '../../../../core/interfaces/unidad.interface';
import { ArticuloService } from '../../../../core/services/articulo.service';
import { UnidadService } from '../../../../core/services/unidad.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { IProveedores } from 'app/core/interfaces/proveedores.interface';


export interface Opcviaje {
    codigo: string;
    descripcion: string;
}

@Component({
    selector: 'app-editalumnosdetalle',
    templateUrl: './editalumnosdetalle.component.html',
    animations: fuseAnimations
})

export class EditalumnosdetalleComponent implements OnInit, OnDestroy, OnChanges {
    $unsubscribe = new Subject();
    private _id: number;
    get id(): number {
        return this._id;
    }

    @Input() set id(id: number) {
        this._id = id;
       
        if (id) {
            this.getAlumnos();
        } else {
            if (this.registerForm) {
                this.registerForm.reset();
                this.registerForm.get('codemp').setValue(this.codempMaster);
                this.registerForm.get('nombre').setValue(this.nombreMaster);
            }
        }
    }

    @Input() idMaster: number;
    @Input() codempMaster: string;
    @Input() nombreMaster: string;

    
    selectedopc = '0';
    filteredArticulos: Observable<Array<IArticulo>>;
    filteredUnidades: Observable<Array<IUnidad>>;

    opcviaje: Opcviaje[] = [
        { codigo: 'Solo ida', descripcion: 'Solo ida' },
        { codigo: 'Ida y vuelta', descripcion: 'Ida y vuelta' },
        { codigo: 'Full Day', descripcion: 'Full Day' },
    ];

    alumnos: IAlumnosdetalle;
    articulos: Array<IArticulo>;
    unidades: Array<IUnidad>;


    registerForm: FormGroup;

    @Output() back: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() update: EventEmitter<IAlumnosdetalle> = new EventEmitter<IAlumnosdetalle>();

    @ViewChild('inputCodigo', {static: false}) inputCodigo: ElementRef<HTMLInputElement>;

    constructor(private alumnosService: AlumnosdetalleService,
        private formBuilder: FormBuilder,
        private articuloService: ArticuloService,
        private unidadService: UnidadService,
        public snackBar: MatSnackBar) {
    }

    getArticulo(): void {
        this.articuloService.getArticulos()
            .subscribe(response => {
                this.articulos = response;
            });
    }


    getUnidad(): void {
        this.unidadService.getUnidades()
            .subscribe(response => {
                this.unidades = response;
            });
    }




    ngOnInit(): void {
        this.createForm();
        this.getArticulo();
        this.getUnidad();

    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('ngngOnChanges');
        if (changes.idMaster) {
            if (this.registerForm) {
                this.registerForm.get('codigo').setValue(this.idMaster);
                this.registerForm.get('codemp').setValue(this.codempMaster);
            }
        }

    }

    private _filter(value: string): IArticulo[] {
        if (value && this.articulos) {
            const filterValue = value.toLowerCase();
            return this.articulos.filter(option => option.descripcion.toLowerCase().indexOf(filterValue) === 0);

        }

        return [];
    }


    private _filter2(value: string): IUnidad[] {
        if (value && this.unidades) {
            const filterValue2 = value.toLowerCase();
            return this.unidades.filter(option => option.descripcion.toLowerCase().includes(filterValue2));
        }
        return [];
    }

    createForm(): void {
        
        this.registerForm = this.formBuilder.group({
            nombre: [this.nombreMaster],
            codemp: [this.codempMaster],
            codigo: [this.idMaster],
            cc: [null],
            descc: [null],
            fechaini: [null],
            fechafin: [null],
            turno: [null],
            importe: [null],
        });
       

        // const descripcionForm = this.registerForm.get('nombre');


        // this.filteredArticulos = descripcionForm.valueChanges.pipe(
        //     map(value => this._filter(value))
        // );

        // this.filteredUnidades = desunimedForm.valueChanges.pipe(
        //     map(value => this._filter2(value))
        // );

        // this.valueChanges();

    }

    // valueChanges(): void {
    //     const precioControl = this.registerForm.get('precio');
    //     const cantidadControl = this.registerForm.get('cantidad');


    //     precioControl.valueChanges
    //         .pipe(takeUntil(this.$unsubscribe))
    //         .subscribe(value => {
    //             this.setImporteTotal(precioControl.value, cantidadControl.value);
    //         });

    //     cantidadControl.valueChanges
    //         .pipe(takeUntil(this.$unsubscribe))
    //         .subscribe(value => {
    //             this.setImporteTotal(precioControl.value, cantidadControl.value);
    //         });
    // }

    // setImporteTotal(a, b): void {
    //     this.registerForm.get('imptotal').setValue((a * b).toFixed(2));
    // }

    // setdesunimed(a): void {
    //     this.registerForm.get('desunimed').setValue(a);
    // }


    getcodigo(a): void {
        
        // this.registerForm.get('codigo').setValue(a.codigo);
        // this.registerForm.get('nombre').setValue(this.alumnos.nombre);
        // this.registerForm.get('codemp').setValue(this.alumnos.codemp);
        this.registerForm.get('cc').setValue(this.alumnos.cc);
        this.registerForm.get('descc').setValue(this.alumnos.descc);
        this.registerForm.get('fechaini').setValue(this.alumnos.fechaini);
        this.registerForm.get('fechafin').setValue(this.alumnos.fechafin);
        this.registerForm.get('turno').setValue(this.alumnos.turno);
        this.registerForm.get('importe').setValue(this.alumnos.importe);

    }


    getAlumnos(): void {

        this.alumnosService.getAlumno(this.id)
            .subscribe(response => {
                this.alumnos = response;
                this.setForm();
            });
    }

    setForm(): void {
        
        // this.registerForm.get('codigo').setValue(this.alumnos.codigo);
        // this.registerForm.get('nombre').setValue(this.alumnos.nombre);
        // this.registerForm.get('codemp').setValue(this.alumnos.codemp);
        this.registerForm.get('cc').setValue(this.alumnos.cc);
        this.registerForm.get('descc').setValue(this.alumnos.descc);
        this.registerForm.get('fechaini').setValue(this.alumnos.fechaini);
        this.registerForm.get('fechafin').setValue(this.alumnos.fechafin);
        this.registerForm.get('turno').setValue(this.alumnos.turno);
        this.registerForm.get('importe').setValue(this.alumnos.importe);
    }

    onBack(): void {
        this.back.emit(true);
    }

    saveForm(clear?: boolean): void {

        if (this.registerForm.valid) {
            this.saveAlumnos();
            if (clear) {
                this.registerForm.reset();
                this.inputCodigo.nativeElement.focus();
            }
        } else {
            alert('FORMUARLIO INVALIDO');
        }
    }

    prepareData(): any {
        /** rest spread, paso de parametros REST, este método sirve para clonar objetos. destructuración de datos
         * http://www.etnassoft.com/2016/07/04/desestructuracion-en-javascript-parte-1/ */
        console.log('prepareData', this.nombreMaster);
        this.registerForm.get('codigo').setValue(this.idMaster);
        this.registerForm.get('codemp').setValue(this.codempMaster);
        this.registerForm.get('nombre').setValue(this.nombreMaster);
        const data: IAlumnosdetalle = { ...this.registerForm.getRawValue() };
        data.master = this.idMaster;
        data.codemp = this.codempMaster;
        data.nombre = this.nombreMaster;
        return data;
    }

    updateAlumnos(): void {
        const data = this.prepareData();

        this.alumnosService.updateAlumnos(this.id, data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
            });
    }

    addAlumnos(): void {
        const data = this.prepareData();
        console.log('addAlumnos' + this.idMaster);
        this.alumnosService.addAlumnos(data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
            });
    }

    saveAlumnos(): void {
        this.id ? this.updateAlumnos() : this.addAlumnos();
    }

    ngOnDestroy(): void {
        this.$unsubscribe.next();
        this.$unsubscribe.complete();
    }


}
