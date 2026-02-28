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

  model: any = {
    // Personal Information
    fullName: '',
    idCode: '',
    age: null as number | null,
    phone: '',

    // Admission Category
    educationalLevel: '',
    canReadWriteAmharic: '',
    familyBackground: '',
    placeOfBirth: '',
    subCity: '',
    woreda: '',
    specificArea: '',
    hasAddisResidencyId: '',
    addisResidencyId: '',
    hasFaydaId: '',
    faydaId: '',
    hasUnemploymentId: '',
    unemploymentId: '',

    // Emergency Contact
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyRelationship: '',

    // Religion
    religion: '',

    // Background & Referral
    heardAboutCenter: '',
    livingBeforeCenter: '',
    hasChildren: '',
    childrenCount: null as number | null,
    childrenLivedWith: '',
    childrenLivingWith: '',
    servicesExpected: [''],

    // Skills and Health
    hadVocationalTraining: '',
    trainingType: '',
    hasPhysicalDisability: '',
    physicalDisabilityType: '',
    hasHealthConditions: '',
    healthConditionType: '',

    // Legal and Observations
    hasLegalMatters: '',
    legalMatterType: '',

    // Social Worker's Observations
    summaryObservations: '',
    reassignedManager: ''
  };

  readonly phonePattern = String.raw`^[+]?[\d\s\-\(\)]{7,20}$`;

  caseManagers = ['Alexa Brown', 'John Doe', 'Jane Smith'];

  constructor(
    private readonly location: Location,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {}

  addServiceExpectation(): void {
    this.model.servicesExpected = [...this.model.servicesExpected, ''];
    this.cdr.markForCheck();
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 11);
  }

  submit(f: NgForm): void {
    if (f.invalid) {
      f.form.markAllAsTouched();
      this.cdr.markForCheck();
      return;
    }
    const newClient = {
      id: this.generateId(),
      name: this.model.fullName,
      age: this.model.age || 0,
      intakeDate: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      category: '',
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
