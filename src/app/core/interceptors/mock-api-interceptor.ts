import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { Position } from '../../features/positions/positions.model';
import { delay, of } from 'rxjs';

const MOCK_POSITIONS: Position[] = [
  {
    id: 1,
    symbol: 'AAPL',
    instrument: 'Apple Inc.',
    assetType: 'Equity',
    quantity: 500,
    marketValue: 105000,
    unrealizedPnl: 5200,
  },
  {
    id: 2,
    symbol: 'MSFT',
    instrument: 'Microsoft Corporation',
    assetType: 'Equity',
    quantity: 300,
    marketValue: 126000,
    unrealizedPnl: 3400,
  },
  {
    id: 3,
    symbol: 'NVDA',
    instrument: 'Nvidia Call Option',
    assetType: 'Option',
    quantity: 20,
    marketValue: 48000,
    unrealizedPnl: -1200,
  },
  {
    id: 4,
    symbol: 'SPY',
    instrument: 'SPDR S&P 500 ETF',
    assetType: 'Equity',
    quantity: 200,
    marketValue: 112000,
    unrealizedPnl: 2800,
  },
  {
    id: 5,
    symbol: 'TSLA',
    instrument: 'Tesla Future',
    assetType: 'Future',
    quantity: 15,
    marketValue: 75000,
    unrealizedPnl: -850,
  },
];

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url === '/api/positions' && req.method === 'GET') {
    const searchTerm = (req.params.get('search') ?? '').toLowerCase();

    const filteredPositions = MOCK_POSITIONS.filter(
      (position) =>
        position.symbol.toLowerCase().includes(searchTerm) ||
        position.instrument.toLowerCase().includes(searchTerm) ||
        position.assetType.toLocaleLowerCase().includes(searchTerm),
    );

    return of(
      new HttpResponse({
        status: 200,
        body: filteredPositions,
      }),
    ).pipe(delay(300));
  }

  return next(req);
};
