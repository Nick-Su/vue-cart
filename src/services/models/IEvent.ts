export interface IEvent {
    id: number; 
    productCount: number;
    productName: string; 
    sessionId: string;
    timestamp: number; 
    trackId?: number; 
    type: string; 
}