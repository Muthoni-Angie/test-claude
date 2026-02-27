import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface ClientListItem {
  id: string;
  name: string;
  age: number;
  intakeDate: string;
  category: string;
  status: string;
  chipClass: string;
}

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsListComponent implements OnInit, OnDestroy {
  searchText = '';
  filter = '';
  activeTab = 'admission';
  suggestions: ClientListItem[] = [];
  showSuggestions = false;
  currentPage = 1;
  readonly pageSize = 10;

  private readonly search$ = new Subject<string>();
  private searchSub?: Subscription;

  tabs = [
    { key: 'admission', label: 'Admission', count: 12 },
    { key: 'assessment', label: 'Assessment', count: 5 },
    { key: 'planning', label: 'Planning', count: 12 },
    { key: 'monitoring', label: 'Monitoring', count: 12 },
  ];

  allClients: ClientListItem[] = [
    { id: '1', name: 'Khadhiya Mweyawiru', age: 12, intakeDate: '24 Feb 2026', category: 'Sex worker', status: 'admission', chipClass: 'status-chip--blue' },
    { id: '2', name: 'Reeha Ndunange Rukaja Mwanyuallo', age: 12, intakeDate: '24 Feb 2026', category: 'Sex worker', status: 'admission', chipClass: 'status-chip--blue' },
    { id: '3', name: 'Fadiamaina Kandikengo', age: 12, intakeDate: '24 Feb 2026', category: 'Sex worker', status: 'admission', chipClass: 'status-chip--blue' },
    { id: '4', name: 'Jihawa Ndungatau', age: 12, intakeDate: '24 Feb 2026', category: 'Sex worker', status: 'admission', chipClass: 'status-chip--blue' },
    { id: '5', name: 'Nebuna Juguria', age: 12, intakeDate: '24 Feb 2026', category: 'Sex worker', status: 'admission', chipClass: 'status-chip--blue' },
    { id: '6', name: 'Fadiamaina Kandikengo Wamandu', age: 12, intakeDate: '24 Feb 2026', category: 'Sex worker', status: 'admission', chipClass: 'status-chip--blue' },
    { id: '7', name: 'Safrayya Kandikengo Wamandu', age: 12, intakeDate: '24 Feb 2026', category: 'Sex worker', status: 'admission', chipClass: 'status-chip--blue' },
    { id: '8', name: 'Emasiyama Kanyagate', age: 12, intakeDate: '24 Feb 2026', category: 'Sex worker', status: 'admission', chipClass: 'status-chip--blue' },
    { id: '9', name: 'Khadhiya Mweyawiru', age: 12, intakeDate: '24 Feb 2026', category: 'Sex worker', status: 'assessment', chipClass: 'status-chip--teal' },
    { id: '10', name: 'Reeha Ndunange', age: 12, intakeDate: '24 Feb 2026', category: 'Sex worker', status: 'assessment', chipClass: 'status-chip--teal' },
    { id: '11', name: 'Fadiamaina Kandikengo', age: 12, intakeDate: '24 Feb 2026', category: 'Sex worker', status: 'planning', chipClass: 'status-chip--amber' },
    { id: '12', name: 'Jihawa Ndungatau', age: 12, intakeDate: '24 Feb 2026', category: 'Sex worker', status: 'planning', chipClass: 'status-chip--amber' },
    { id: '13', name: 'Lazzairaba Kalikimu', age: 12, intakeDate: '24 Feb 2026', category: 'Sex worker', status: 'monitoring', chipClass: 'status-chip--violet' },
    { id: '14', name: 'Zahma Nyaranira', age: 12, intakeDate: '24 Feb 2026', category: 'Sex worker', status: 'monitoring', chipClass: 'status-chip--violet' },
  ];

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.searchSub = this.search$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        if (value.length >= 3) {
          this.filter = value;
          this.currentPage = 1;
          this.suggestions = this.allClients
            .filter(
              (c) =>
                c.status === this.activeTab &&
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

  selectSuggestion(client: ClientListItem): void {
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
    this.currentPage = 1;
    this.cdr.markForCheck();
  }

  prevPage(): void {
    if (this.currentPage > 1) { this.currentPage--; this.cdr.markForCheck(); }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) { this.currentPage++; this.cdr.markForCheck(); }
  }

  newClient(): void {
    this.router.navigate(['/clients', 'new']);
  }

  get filteredClients(): ClientListItem[] {
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

  get pagedClients(): ClientListItem[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredClients.slice(start, start + this.pageSize);
  }

  get activeTabLabel(): string {
    return this.tabs.find((t) => t.key === this.activeTab)?.label ?? '';
  }
}
