import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../@fuse/animations';

@Component({
    selector: 'users',
    templateUrl: './cursos.component.html',
    styleUrls: ['./cursos.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CursosComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
