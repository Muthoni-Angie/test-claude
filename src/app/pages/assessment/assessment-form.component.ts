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
    fullName: 'Rimadhiya Makiptono',

    // Living Conditions
    earningMethod: '',
    livingWith: '',

    // Children's Status
    hasChildren: '',
    childrenCount: null,
    childrenAges: new Array(10).fill(''),
    childrenLivedWith: '',
    childrenLivingWith: '',
    childrenGoToSchool: '',

    // Family Status
    familyRelationship: '',
    familyHelps: '',
    helpsFamily: '',
    trustFamily: '',

    // Social Connections/Skills
    hasCloseFriend: '',
    trustFriend: '',
    essentialPeople: '',
    essentialPeopleWho: '',
    goodCommunication: '',

    // Physical Health
    hasHealthIssues: '',
    healthIssueType: '',
    takesMedication: '',
    medicationType: '',
    whenIll: '',
    sleepingStatus: '',
    personalHygiene: '',

    // Emotional and Mental Health
    hasMentalHealthIssues: '',
    feelsLonely: '',
    thoughtsOfSelfHarm: '',
    attemptedSuicide: '',
    suicideWhen: '',
    suicideHow: '',

    // Substance Use
    usesDrugsAlcohol: '',
    substanceReason: '',

    // Personal Strengths and Coping Mechanisms
    solveDailyProblems: '',
    controlEmotionalDistress: '',

    // Spirituality
    religion: '',
    spiritualLifeHelped: '',
    spiritualHelp: '',

    // Summary
    summaryObservations: '',
    reassignedManager: ''
  };

  caseManagers = ['Alexa Brown', 'John Doe', 'Jane Smith'];

  constructor(private readonly location: Location) {}

  get ageInputs(): number[] {
    const n = Number.parseInt(this.model.childrenCount, 10) || 0;
    return Array.from({ length: Math.min(n, 10) }, (_, i) => i);
  }

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
