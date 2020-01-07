import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../@fuse/animations';

@Component({
    selector: 'users',
    templateUrl: './notas.component.html',
    styleUrls: ['./notas.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class NotasComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
