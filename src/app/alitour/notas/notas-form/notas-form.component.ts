import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GuiaService } from '../../../core/services/guia.service';
import { BancoService } from '../../../core/services/banco.service';
import { MatSnackBar } from '@angular/material';
// import { IGuias } from '../../../core/interfaces/notass.interface';
import { Ibancos } from '../../../core/interfaces/varios.interface';


import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Ipost {
    id?: number;
    codigo: number;
    descripcion: string;
    capacidad: string;
    obs: string;
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
    selector: 'notas-form',
    templateUrl: './notas-form.component.html',
    styleUrls: ['./notas-form.component.scss']
})
export class NotasFormComponent implements OnInit {


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
            descripcion: [null, Validators.compose([
                Validators.required,
                Validators.minLength(1),
            ])],
            codigo: [null],
            capacidad: [null],
            obs: [null],

        });
    }

    back(): void {
        this.router.navigate(['notas']);
    }

    getBanco(): void {
        this.bancoService.getBancos()
            .subscribe(response => {
                this.bancos = response;
            });
    }

    getInfotab1(): void {
        const post$: Observable<Ipost> = this.http.get<Ipost>('/assets/notas.json');
        post$.subscribe( response => {
            this.infotab1 = response[this._id];
            this.setForm();
            console.log(response);
          });

    }


    setForm(): void {
        this.registerForm.get('descripcion').setValue(this.infotab1.descripcion);
        this.registerForm.get('codigo').setValue(this.infotab1.codigo);
        this.registerForm.get('capacidad').setValue(this.infotab1.capacidad);
        this.registerForm.get('obs').setValue(this.infotab1.obs);

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
        this.router.navigate(['notas']);
    }

    saveGuia(): void {
      
        this.id ? this.updateGuia() : this.addGuia();
    }



}
