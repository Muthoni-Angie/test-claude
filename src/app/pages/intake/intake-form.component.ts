import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intake-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './intake-form.component.html',
  styleUrls: ['./intake-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntakeFormComponent {
  submitted = false;

  model = {
    fullName: '',
    age: null as number | null,
    sex: '',
    phone: '',
    emergencyContact: '',
    nationality: '',
    maritalStatus: '',
    religion: '',
    admissionCategory: '',
    targetGroup: '',
    placeOfOrigin: '',
    educationLevel: '',
  };

  readonly phonePattern = '^[+]?[\\d\\s\\-\\(\\)]{7,20}$';

  constructor(
    private readonly location: Location,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {}

  submit(f: NgForm): void {
    if (f.invalid) {
      f.form.markAllAsTouched();
      this.cdr.markForCheck();
      return;
    }
    this.submitted = true;
    this.cdr.markForCheck();
    setTimeout(() => this.router.navigateByUrl('/dashboard'), 900);
  }

  goBack(): void {
    this.location.back();
  }
}
