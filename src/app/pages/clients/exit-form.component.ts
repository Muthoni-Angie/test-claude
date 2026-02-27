import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exit-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exit-form.component.html',
  styleUrls: ['./exit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExitFormComponent {
  model: any = {
    exitType: '',
    reason: '',
    transitionPlan: '',
    referrals: '',
    finalNotes: ''
  };

  submitted = false;

  constructor(private readonly location: Location) {}

  goBack(): void {
    this.location.back();
  }

  submit(form: any): void {
    if (form.invalid) {
      Object.values(form.controls).forEach((c: any) => c.markAsTouched());
      return;
    }

    this.submitted = true;
    setTimeout(() => {
      alert('Exit form submitted successfully');
      this.submitted = false;
      this.goBack();
    }, 1200);
  }
}
