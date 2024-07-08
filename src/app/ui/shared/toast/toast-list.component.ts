import { Component, OnInit } from '@angular/core';
import { SharedState } from '../../../state/shared/shared.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Toast } from './toast.model';
import { selectToasts } from '../../../state/shared/shared.selectors';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-toast-list',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './toast-list.component.html',
    styleUrl: './toast-list.component.scss'
})
export class ToastListComponent implements OnInit {

    toasts$?: Observable<Toast[]>

    constructor(private sharedStore: Store<SharedState>) { }

    ngOnInit(): void {
        this.toasts$ = this.sharedStore.select(selectToasts);
    }

}
