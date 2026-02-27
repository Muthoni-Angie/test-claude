import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-service-delivery-plan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './service-delivery-plan.component.html',
  styleUrls: ['./service-delivery-plan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceDeliveryPlanComponent {
  interventions = [
    'Counseling/Psychotherapy',
    'Medical Support',
    'Vocational Training',
    'Life Skills Training',
    'Educational Support',
    'Legal Aid',
    'Family Mediation',
    'Substance Abuse Treatment',
    'Nutritional Support',
    'Housing Assistance',
    'Financial Literacy',
    'Community Reintegration'
  ];

  selectedInterventions: Record<string, boolean> = {};

  goals: string[] = [''];
  steps: string[] = [''];
  model: any = {
    expectedTimeline: '',
    additionalNotes: '',
    reassignedManager: '',
    fullName: 'Rimadhiya Makiptono'
  };

  caseManagers = ['Alexa Brown', 'Jordan Smith', 'Priya Patel', 'Marcus Lee'];

  submitted = false;

  constructor(private readonly location: Location) {}

  toggleIntervention(item: string) {
    this.selectedInterventions[item] = !this.selectedInterventions[item];
  }

  addGoal() {
    this.goals.push('');
  }

  removeGoal(i: number) {
    this.goals.splice(i, 1);
  }

  addStep() {
    this.steps.push('');
  }

  removeStep(i: number) {
    this.steps.splice(i, 1);
  }

  goBack() {
    this.location.back();
  }

  clearSignature() {
    // stubbed - integrate signature canvas lib if needed
    console.log('clear signature');
  }

  confirmSignature() {
    // stubbed - capture signature data
    console.log('confirm signature');
  }

  submit(form: any) {
    if (form.invalid) {
      Object.values(form.controls).forEach((c: any) => c.markAsTouched());
      return;
    }

    this.submitted = true;
    setTimeout(() => {
      alert('Service delivery plan saved');
      this.submitted = false;
      this.goBack();
    }, 800);
  }
}
