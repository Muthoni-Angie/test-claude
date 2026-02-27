import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface ClientItem {
  id: string;
  name: string;
  age: number;
  intakeDate: string;
  category: string;
  status: string;
  chipClass: string;
  chipLabel: string;
  isNew?: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  searchText = '';
  filter = '';
  activeTab = '';
  suggestions: ClientItem[] = [];
  showSuggestions = false;
  showStatusDropdown = false;
  currentPage = 1;
  readonly pageSize = 10;

  private readonly search$ = new Subject<string>();
  private searchSub?: Subscription;

  tabs = [
    { key: 'admission',  label: 'Admission',  count: 12, badgeClass: 'badge--blue',   chipClass: 'status-chip--blue' },
    { key: 'assessment', label: 'Assessment', count: 5,  badgeClass: 'badge--teal',   chipClass: 'status-chip--teal' },
    { key: 'planning',   label: 'Planning',   count: 12, badgeClass: 'badge--amber',  chipClass: 'status-chip--amber' },
    { key: 'monitoring', label: 'Monitoring', count: 12, badgeClass: 'badge--violet', chipClass: 'status-chip--violet' },
  ];

  allClients: ClientItem[] = [
    { id: '1',  name: 'Khadhiya Mweyawiru',               age: 12, intakeDate: '24 Feb 2026', category: 'Sex worker', status: 'admission',  chipClass: 'status-chip--blue',   chipLabel: 'Admission'  },
    { id: '2',  name: 'Reeha Ndunange Rukaja Mwanyuallo', age: 12, intakeDate: '24 Feb 2026', category: 'Sex worker', status: 'admission',  chipClass: 'status-chip--blue',   chipLabel: 'Admission'  },
    { id: '3',  name: 'Fadiamaina Kandikengo',            age: 12, intakeDate: '24 Feb 2026', category: 'Sex worker', status: 'admission',  chipClass: 'status-chip--blue',   chipLabel: 'Admission'  },
    { id: '4',  name: 'Jihawa Ndungatau',                 age: 12, intakeDate: '24 Feb 2026', category: 'Sex worker', status: 'admission',  chipClass: 'status-chip--blue',   chipLabel: 'Admission'  },
    { id: '5',  name: 'Nebuna Juguria',                   age: 12, intakeDate: '24 Feb 2026', category: 'Sex worker', status: 'admission',  chipClass: 'status-chip--blue',   chipLabel: 'Admission'  },
    { id: '6',  name: 'Fadiamaina Kandikengo Wamandu',    age: 12, intakeDate: '24 Feb 2026', category: 'Sex worker', status: 'admission',  chipClass: 'status-chip--blue',   chipLabel: 'Admission'  },
    { id: '7',  name: 'Safrayya Kandikengo Wamandu',      age: 12, intakeDate: '24 Feb 2026', category: 'Sex worker', status: 'admission',  chipClass: 'status-chip--blue',   chipLabel: 'Admission'  },
    { id: '8',  name: 'Emasiyama Kanyagate',              age: 12, intakeDate: '24 Feb 2026', category: 'Sex worker', status: 'admission',  chipClass: 'status-chip--blue',   chipLabel: 'Admission'  },
    { id: '9',  name: 'Khadhiya Mweyawiru',               age: 12, intakeDate: '24 Feb 2026', category: 'Sex worker', status: 'assessment', chipClass: 'status-chip--teal',   chipLabel: 'Assessment' },
    { id: '10', name: 'Reeha Ndunange',                   age: 12, intakeDate: '24 Feb 2026', category: 'Sex worker', status: 'assessment', chipClass: 'status-chip--teal',   chipLabel: 'Assessment' },
    { id: '11', name: 'Fadiamaina Kandikengo',            age: 12, intakeDate: '24 Feb 2026', category: 'Sex worker', status: 'planning',   chipClass: 'status-chip--amber',  chipLabel: 'Planning'   },
    { id: '12', name: 'Jihawa Ndungatau',                 age: 12, intakeDate: '24 Feb 2026', category: 'Sex worker', status: 'planning',   chipClass: 'status-chip--amber',  chipLabel: 'Planning'   },
    { id: '13', name: 'Lazzairaba Kalikimu',              age: 12, intakeDate: '24 Feb 2026', category: 'Sex worker', status: 'monitoring', chipClass: 'status-chip--violet', chipLabel: 'Monitoring' },
    { id: '14', name: 'Zahma Nyaranira',                  age: 12, intakeDate: '24 Feb 2026', category: 'Sex worker', status: 'monitoring', chipClass: 'status-chip--violet', chipLabel: 'Monitoring' },
  ];

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    // if we were navigated here with a new client, add it at top
    const nav = this.router.getCurrentNavigation();
    const newClient = nav?.extras.state?.newClient as ClientItem | undefined;
    if (newClient) {
      this.allClients.unshift(newClient);
      this.currentPage = 1;
    }

    this.searchSub = this.search$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        if (value.length >= 3) {
          this.filter = value;
          this.currentPage = 1;
          this.suggestions = this.allClients
            .filter(
              (c) =>
                (!this.activeTab || c.status === this.activeTab) &&
                c.name.toLowerCase().includes(value.toLowerCase())
            )
            .slice(0, 6);
          this.showSuggestions = this.suggestions.length > 0;
        } else {
          this.filter = '';
          this.suggestions = [];
          this.showSuggestions = false;
        }
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.searchSub?.unsubscribe();
  }

  onSearchInput(value: string): void {
    this.searchText = value;
    if (value.length === 0) {
      this.filter = '';
      this.suggestions = [];
      this.showSuggestions = false;
      this.cdr.markForCheck();
    }
    this.search$.next(value);
  }

  selectSuggestion(client: ClientItem): void {
    this.searchText = client.name;
    this.filter = client.name;
    this.suggestions = [];
    this.showSuggestions = false;
    this.cdr.markForCheck();
  }

  hideSuggestions(): void {
    setTimeout(() => {
      this.showSuggestions = false;
      this.cdr.markForCheck();
    }, 150);
  }

  setTab(key: string): void {
    this.activeTab = key;
    this.filter = '';
    this.searchText = '';
    this.suggestions = [];
    this.showSuggestions = false;
    this.showStatusDropdown = false;
    this.currentPage = 1;
    this.cdr.markForCheck();
  }

  prevPage(): void {
    if (this.currentPage > 1) { this.currentPage--; this.cdr.markForCheck(); }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) { this.currentPage++; this.cdr.markForCheck(); }
  }

  toggleStatusDropdown(): void {
    this.showStatusDropdown = !this.showStatusDropdown;
    this.cdr.markForCheck();
  }

  goToClient(id: string): void {
    this.router.navigate(['/clients', id]);
  }

  editClient(e: MouseEvent, id: string): void {
    e.stopPropagation();
    this.router.navigate(['/clients', id, 'edit']);
  }

  newClient(): void {
    this.router.navigate(['/clients', 'new']);
  }

  get activeTabLabel(): string {
    return this.tabs.find((t) => t.key === this.activeTab)?.label ?? '';
  }

  get filteredClients(): ClientItem[] {
    return this.allClients
      .filter((c) => !this.activeTab || c.status === this.activeTab)
      .filter(
        (c) =>
          !this.filter ||
          c.name.toLowerCase().includes(this.filter.toLowerCase())
      );
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredClients.length / this.pageSize));
  }

  get pagedClients(): ClientItem[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredClients.slice(start, start + this.pageSize);
  }
}
