import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GuiaService } from '../../../core/services/guia.service';
import { BancoService } from '../../../core/services/banco.service';
import { MatSnackBar } from '@angular/material';
// import { IGuias } from '../../../core/interfaces/profesoress.interface';
import { Ibancos } from '../../../core/interfaces/varios.interface';


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

export interface Idiomaprov {
    codigo: string;
    descripcion: string;
}

export interface Categoprov {
    codigo: string;
    descripcion: string;
}

export interface Tipoprov {
    codigo: string;
    descripcion: string;
}

export interface Monedas {
    codigo: string;
    descripcion: string;
}

@Component({
    selector: 'profesores-form',
    templateUrl: './profesores-form.component.html',
    styleUrls: ['./profesores-form.component.scss']
})
export class ProfesoresFormComponent implements OnInit {

    @ViewChild('imgAvatar1', {static: false}) imgAvatar1: ElementRef<HTMLImageElement>;
    @ViewChild('imgAvatar2', {static: false}) imgAvatar2: ElementRef<HTMLImageElement>;
    @ViewChild('imgAvatar3', {static: false}) imgAvatar3: ElementRef<HTMLImageElement>;
    
    userPhoto1: File;
    userPhoto2: File;
    userPhoto3: File;
    


    selectedmon = '0';
    /* moneda por defecto */
    selectedmon2 = '0';
    selectedmon3 = '0';
    /* moneda por defecto */
    selectedban = '';
    selectedban2 = '';
    selectedban3 = '';
    selectedtip = '';
    selectedCat: string[] = [];
    selectedIdi: string[] = [];
    selectedGru: string[] = [];

    private _id: number;
    get id(): number {
        return this._id;
    }

    @Input() set id(id: number) {
        this._id = id;
        if (id) {
            this.getInfotab1();
        } else {
            if (this.registerForm) {
                this.registerForm.reset();
            }
        }
    }

    Idiomaprov: Idiomaprov[] = [
        {codigo: 'Ingles-Basico', descripcion: 'Ingles-Basico'},
        {codigo: 'Ingles-Intermedio', descripcion: 'Ingles-Intermedio'},
        {codigo: 'Ingles-Avanzado', descripcion: 'Ingles-Avanzado'},
        {codigo: 'Chino', descripcion: 'Chino'},
        {codigo: 'Portugues', descripcion: 'Portugues'},
        {codigo: 'Frances', descripcion: 'Frances'},
        {codigo: 'Mandarin', descripcion: 'Mandarin'},
        {codigo: 'Italiano', descripcion: 'Italiano'},
        {codigo: 'Ruso', descripcion: 'Ruso'},
    ];

    monedas: Monedas[] = [
        {codigo: 'Soles', descripcion: 'Soles'},
        {codigo: 'Dolares', descripcion: 'Dolares'},
    ];

    tipoprov: Tipoprov[] = [
        {codigo: 'SEDAN-AUTO', descripcion: 'SEDAN-AUTO'},
        {codigo: '4x4', descripcion: '4x4'},
        {codigo: 'SUV', descripcion: 'SUV'},
        {codigo: 'VAN', descripcion: 'VAN'},
        {codigo: 'SPRINTER', descripcion: 'SPRINTER'},
        {codigo: 'MINIBUS', descripcion: 'MINIBUS'},
        {codigo: 'BUS', descripcion: 'BUS'},
        {codigo: 'OTROS', descripcion: 'OTROS'},
    ];

    categoprov: Categoprov[] = [
        {codigo: 'CHOFER', descripcion: 'CHOFER'},
        {codigo: 'GUIA', descripcion: 'GUIA'},
        {codigo: 'TRADUCTOR', descripcion: 'TRADUCTOR'},
        {codigo: 'OTROS', descripcion: 'OTROS'},
    ];


    infotab1: Ipost;
    registerForm: FormGroup;
    bancos: Array<Ibancos>;
    bancos2: Array<Ibancos>;

    @Output() update: EventEmitter<Ipost> = new EventEmitter<Ipost>();

    @ViewChild('inputNombre' , {static: false}) inputNombre: ElementRef<HTMLInputElement>;

    form: FormGroup;

    constructor(private bancoService: BancoService,
                private formBuilder: FormBuilder,
                public snackBar: MatSnackBar,
                public http: HttpClient,
                private router: Router,
                private route: ActivatedRoute) {
        this.id = this.route.snapshot.params['id'];
    }

    ngOnInit(): void {
        this.createForm();
        this.getBanco();
    }

    createForm(): void {
        this.registerForm = this.formBuilder.group({
            nombre: [null, Validators.compose([
                Validators.required,
                Validators.minLength(1),
            ])],
            ruc: [null],
            telefono1: [null],
            telefono2: [null],
            telefono3: [null],
            contacto: [null],
            telcontacto: [null],
            direccion: [null],
            correo: [null],
            paginaweb: [null],
            tipocc: [null],
            destipocc: [null],
            condcompvent: [null],
            banco_nombre1: [null],
            banco_cuenta1: [null],
            banco_moneda1: [null],
            banco_nombre2: [null],
            banco_cuenta2: [null],
            banco_moneda2: [null],
            banco_nombre3: [null],
            banco_cuenta3: [null],
            banco_moneda3: [null],
            fechanac: [null],
            fechaini: [null],
            fechafin: [null],
            grupo: [null],
            contacto2: [null],
            telcontacto2: [null],
            correo2: [null],
            contacto3: [null],
            telcontacto3: [null],
            correo3: [null],
            banco_nomdest1: [null],
            banco_nomdest2: [null],
            banco_nomdest3: [null],
            idioma: [null],
            categprov: [null],
            foto1: [null],
            foto2: [null],
            foto3: [null],
            tipocontrato: [null],
        });
    }

    back(): void {
        this.router.navigate(['profesores']);
    }

    getBanco(): void {
        this.bancoService.getBancos()
            .subscribe(response => {
                this.bancos = response;
            });
    }

    getInfotab1(): void {
        const post$: Observable<Ipost> = this.http.get<Ipost>('/assets/data.json');
        post$.subscribe( response => {
            this.infotab1 = response[this._id];
            this.setForm();
            console.log(response);
          });

    }


    setForm(): void {
        this.registerForm.get('nombre').setValue(this.infotab1.nombre);
        this.registerForm.get('ruc').setValue(this.infotab1.ruc);
        this.registerForm.get('telefono1').setValue(this.infotab1.telefono1);

       


        // let array = this.guia && this.guia.idioma ? this.guia.idioma.split(',') : [];
        // this.selectedIdi = array;
        // this.registerForm.get('idioma').setValue(array);

        // // Categoria 
        // let array1 = this.guia && this.guia.categprov ? this.guia.categprov.split(',') : [];

        // this.selectedCat = array1;
        // this.registerForm.get('categprov').setValue(array1);
    }

    onBack(): void {
        // this.back.emit(true);
    }

    saveForm(clear?: boolean): void {
        
        if (this.registerForm.valid) {
            this.saveGuia();
            if (clear) {
                this.registerForm.reset();
                this.inputNombre.nativeElement.focus();
            }
        } else {
            alert('FORMUARLIO INVALIDO');
        }
    }

    prepareData(): any {
        const data: Ipost = this.registerForm.getRawValue();
        delete data.id;
        const formData = new FormData();
        for (const k in data) {
            if (data[k]) {
                formData.append(k, data[k]);
            }
        }
        if (this.userPhoto1) {
            formData.append('foto1', this.userPhoto1);
        }
        if (this.userPhoto2) {
            formData.append('foto2', this.userPhoto2);
        }
        if (this.userPhoto3) {
            formData.append('foto3', this.userPhoto3);
        }
        return formData;
    }

    updateGuia(): void {     
        
        
        const data = this.prepareData();
        
        
   
        this.snackBar.open('Registro agregado satisfactoriamente...!');
        this.goList();
    
    }

    addGuia(): void {
        const data: Ipost = this.registerForm.getRawValue();
        this.snackBar.open('Registro agregado satisfactoriamente...!');
        this.registerForm.reset();
       // this.inputNombre.nativeElement.focus();
    }

    goList(): void {
        this.router.navigate(['profesores']);
    }

    saveGuia(): void {
      
        this.id ? this.updateGuia() : this.addGuia();
    }



}
