import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Unit } from '../unit/unit.model';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SquareComponent {
  @Input() selectedLocation?: string | null;
  @Input() state!: {
    location: string,
    colorClass: string,
    unit: Unit | null
  }
}
