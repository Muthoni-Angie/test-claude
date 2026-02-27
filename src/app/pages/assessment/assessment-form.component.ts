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
  submitted = false;

  model: any = {
    fullName: '',

    currentSymptoms: '',
    copingMechanisms: '',
    supportNetwork: '',
    livingConditions: '',
    legalIssues: '',
    physicalHealth: '',
    nutritionStatus: '',
    traumaHistory: '',
    futureGoals: '',
    childhoodExperience: '',
    familyRelationships: '',
    educationHistory: '',
    employmentHistory: '',
    substanceUseHistory: '',
    mentalHealthHistory: '',
    previousTreatment: '',
    summaryObservations: '',
    reassignedManager: ''
  };


  // sample case managers
  caseManagers = ['Alexa Brown', 'John Doe', 'Jane Smith'];

  constructor(private readonly location: Location) {}

  submit(form: any): void {
    if (form.invalid) {
      form.form.markAllAsTouched();
      return;
    }
    this.submitted = true;
    setTimeout(() => this.location.back(), 500);
  }

  goBack(): void {
    this.location.back();
  }
}
