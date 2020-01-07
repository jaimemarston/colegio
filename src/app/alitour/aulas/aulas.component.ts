import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../@fuse/animations';

@Component({
    selector: 'users',
    templateUrl: './aulas.component.html',
    styleUrls: ['./aulas.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AulasComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
