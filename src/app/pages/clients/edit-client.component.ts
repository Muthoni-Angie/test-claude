import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditClientComponent {
  readonly clientId = this.route.snapshot.paramMap.get('id') ?? '1';
  saved = false;

  model = {
    fullName: 'Rimadhiya Makiptono',
    age: 24,
    sex: 'Female',
    phone: '32132132131',
    emergencyContact: '',
    nationality: 'Kenyan',
    maritalStatus: 'Single',
    religion: 'Christian',
    origin: 'Nairobi',
    category: 'Sex Worker',
    cohort: 'March 2026',
    dorm: '21',
    children: 'Yes (1)',
    caseManager: 'Alexa Brown',
  };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    private readonly cdr: ChangeDetectorRef
  ) {}

  submit(f: NgForm): void {
    if (f.invalid) {
      f.form.markAllAsTouched();
      this.cdr.markForCheck();
      return;
    }
    this.saved = true;
    this.cdr.markForCheck();
    setTimeout(() => this.location.back(), 800);
  }

  goBack(): void {
    this.location.back();
  }
}
