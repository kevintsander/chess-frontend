import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-meta',
  standalone: true,
  imports: [],
  templateUrl: './meta.component.html',
  styleUrl: './meta.component.scss'
})
export class MetaComponent {
  @Input({ required: true }) key: string | undefined;
  @Input({ required: true }) value: any;
}
