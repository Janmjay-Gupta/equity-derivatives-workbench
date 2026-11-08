import { Component, computed, inject, signal } from '@angular/core';
import { PositionsData } from './positions-data';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { Position } from './positions.model';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-positions',
  styleUrl: './positions.scss',
  templateUrl: './positions.html',
})
export class Positions {
  private readonly positionsData = inject(PositionsData);

  protected readonly searchTerm = signal('');

  protected readonly isLoading = signal(false);

  protected readonly errorMessage = signal<string | null>(null);

  private readonly searchResults$ = toObservable(this.searchTerm).pipe(
    debounceTime(300),
    distinctUntilChanged(),

    switchMap((query) => {
      this.isLoading.set(true);
      this.errorMessage.set(null);

      return this.positionsData.searchPositions(query).pipe(
        catchError((error: unknown) => {
          console.error('Failed to load positions:', error);

          this.errorMessage.set('Unable to load positions. Please try agian.');

          return of<Position[]>([]);
        }),
        finalize(() => this.isLoading.set(false)),
      );
    }),

    startWith([]),
  );

  protected readonly positions = toSignal(this.searchResults$, {
    initialValue: [],
  });

  protected readonly positionCount = computed(() => this.positions().length);

  protected readonly totalMarketValue = computed(() =>
    this.positions().reduce((total, position) => total + position.marketValue, 0),
  );

  protected readonly totalUnrealizedPnl = computed(() =>
    this.positions().reduce((total, position) => total + position.unrealizedPnl, 0),
  );

  protected onSearchChange(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.searchTerm.set(event.target.value);
    }
  }
}
