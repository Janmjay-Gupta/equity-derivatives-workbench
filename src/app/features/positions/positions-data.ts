import { inject, Service } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import type { Position } from './positions.model';
import { HttpClient } from '@angular/common/http';

@Service()
export class PositionsData {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = '/api/positions';

  getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(this.apiUrl);
  }

  searchPositions(query: string): Observable<Position[]> {
    return this.http.get<Position[]>(this.apiUrl, {
      params: { search: query },
    });
  }
}
