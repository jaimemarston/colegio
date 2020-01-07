import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../@fuse/animations';

@Component({
    selector: 'users',
    templateUrl: './profesores.component.html',
    styleUrls: ['./profesores.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProfesoresComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
