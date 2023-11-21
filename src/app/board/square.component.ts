import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Unit } from '../unit/unit.model';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SquareComponent {
  @Input() location!: string;
  @Input() colorClass!: string;
  @Input() unit?: Unit | null;
}
