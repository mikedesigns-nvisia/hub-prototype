type LoanData = {
  id: string;
  borrowerName: string;
  loanAmount: number;
  status: 'pending' | 'approved' | 'rejected';
};

export class WebSocketService {
  private static instance: WebSocketService;
  private ws: WebSocket | null = null;

  private constructor() {}

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  connect(url: string, onMessage: (data: LoanData[]) => void) {
    if (this.ws?.readyState === WebSocket.OPEN) return;

    this.ws = new WebSocket(url);
    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    };
  }

  disconnect() {
    this.ws?.close();
    this.ws = null;
  }
}
