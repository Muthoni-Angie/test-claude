import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-progress-checkin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './progress-checkin.component.html',
  styleUrls: ['./progress-checkin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressCheckinComponent {
  rating = 50;

  constructor(private readonly location: Location) {}

  get sliderStyle(): string {
    return `background: linear-gradient(to right, var(--primary-color) ${this.rating}%, #e5e7eb ${this.rating}%)`;
  }

  goBack(): void {
    this.location.back();
  }
}
