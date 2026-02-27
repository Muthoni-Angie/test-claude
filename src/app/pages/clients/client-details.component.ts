import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientDetailsComponent {
  readonly clientId = this.route.snapshot.paramMap.get('id') ?? '1';

  // simulate status retrieved from server/route data
  // possible values: 'admission', 'assessment', 'active', 'completed', etc.
  clientStatus: string = 'assessment';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router
  ) {}

  editClient(): void {
    this.router.navigate(['/clients', this.clientId, 'edit']);
  }

  goBack(): void {
    this.location.back();
  }
}
