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
    hasChildren: '',
    physicalDisabilities: '',
    healthIssues: '',
    uniqueTalents: '',
    familyBackground: '',
    expectationsAfterProgram: '',
    planningDate: '',
    reassignedManager: '',
    cohort: '',
    dormNumber: '',
    tikoCardNumber: ''
  };

  readonly phonePattern = '^[+]?[\\d\\s\\-\\(\\)]{7,20}$';

  // sample case managers list
  caseManagers = [
    'Alexa Brown',
    'John Doe',
    'Jane Smith'
  ];

  constructor(
    private readonly location: Location,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {}

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  submit(f: NgForm): void {
    if (f.invalid) {
      f.form.markAllAsTouched();
      this.cdr.markForCheck();
      return;
    }
    // create a client record to send back
    const newClient = {
      id: this.generateId(),
      name: this.model.fullName,
      age: this.model.age || 0,
      intakeDate: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      category: this.model.admissionCategory || '',
      status: 'admission',
      chipClass: 'status-chip--blue',
      chipLabel: 'Admission',
      isNew: true,
    };

    this.submitted = true;
    this.cdr.markForCheck();
    setTimeout(() => {
      this.router.navigate(['/dashboard'], { state: { newClient } });
    }, 900);
  }

  goBack(): void {
    this.location.back();
  }
}
