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
  model: any = {
    rating: 50,
    progressNotes: '',
    goalsProgress: '',
    challenges: '',
    recommendations: '',
    planningDate: '',
    reassignedManager: '',
    fullName: ''
  };

  caseManagers = ['Alexa Brown', 'Jordan Smith', 'Priya Patel', 'Marcus Lee'];

  submitted = false;

  constructor(private readonly location: Location) {}

  get rating(): number {
    return this.model.rating;
  }

  set rating(value: number) {
    this.model.rating = value;
  }

  get sliderStyle(): string {
    return `background: linear-gradient(to right, var(--primary-color) ${this.rating}%, #e5e7eb ${this.rating}%)`;
  }

  goBack(): void {
    this.location.back();
  }

  submit(form: any): void {
    if (form.invalid) {
      // mark all fields as touched so errors show up
      Object.values(form.controls).forEach((c: any) => c.markAsTouched());
      return;
    }

    this.submitted = true;
    // simulate API call
    setTimeout(() => {
      alert('Progress check-in submitted successfully');
      this.submitted = false;
      this.goBack();
    }, 1200);
  }
}
