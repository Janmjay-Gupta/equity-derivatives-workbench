export interface Position {
    id: number;
    symbol: string;
    instrument: string;
    assetType: 'Equity' | 'Option' | 'Future';
    quantity: number;
    marketValue: number;
    unrealizedPnl: number;
}
