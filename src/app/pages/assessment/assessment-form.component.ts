import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assessment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assessment-form.component.html',
  styleUrls: ['./assessment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssessmentFormComponent {
  model: Record<string, unknown> = {};

  constructor(private readonly location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
