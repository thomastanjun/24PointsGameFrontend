import { Client, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export class WebSocketService {
    private client: Client | null = null;
    private connected: boolean = false;
    private subscriptions: Map<string, {id: string, callback: (data:any) => void }> = new Map();
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    private onConnect(): void {
        this.connected = true;
        console.log(`WebSocket connected successfully at ${this.baseURL}`); 

        this.subscriptions.forEach((sub, topic) => {
            this.resubscribe(topic, sub.callback);
        });
    }

    private onStompError(error: any): void {
        this.connected = false;

        setTimeout(() => {
            if (!this.connected) {
                this.connect();
            }
        }, 5000);
    }

    public connect(): void {
        if (this.client && this.connected) {
            return;
        }

        const socket = new SockJS(`${this.baseURL}`)
        this.client = Stomp.over(socket);

        this.client.onConnect = this.onConnect.bind(this);
        this.client.onStompError = this.onStompError.bind(this);

        this.client.activate();
        console.log(`WebSocketService connection activare at ${this.baseURL}` );
        
    }

    public disconnect(): void {
        if (this.client && this.connected) {
            this.client.deactivate();
            this.connected = false;
        }
    }

    public subscribe(topic: string, callback: (data: any) => void): void {
        if (!this.client) {
            return;
        }

        if (this.connected) {
            const subscription = this.client.subscribe(topic, (message: { body: string }) => {
                try {
                    const data = JSON.parse(message.body);
                    console.log(`WebSocket message on ${topic}:`, data);
                    callback(data);
                } catch (e) {
                    console.error('Error parsing WebSocket message:', e);
                }
            });

            this.subscriptions.set(topic, { id: subscription.id, callback });
        } else {
            this.subscriptions.set(topic, { id: '', callback });
        }
    }

    public resubscribe(topic: string, callback: (data: any) => void): void {
        if (!this.client || !this.connected) {
            return;
        }

        const subscription = this.client.subscribe(topic, (message: { body: string}) => {
            try {
                const data = JSON.parse(message.body);
                callback(data);
            } catch (e) {
                console.error('Error parsing WebSocket message:', e);
            }
        });

        this.subscriptions.set(topic, { id: subscription.id, callback });
    }

    public unsubscribe(topic: string): void {
        if (!this.client) {
            return;
        }

        const subscription = this.subscriptions.get(topic);
        if (subscription && subscription.id) {
            this.client.unsubscribe(subscription.id);
            this.subscriptions.delete(topic);
        }
    }

    //public send(destination: string, body: any = {}): void {
    //    if (!this.client || !this.connected) {
    //        return;
    //    }

    //    this.client.publish({
    //        destination,
    //        body: JSON.stringify(body)
    //    });
    //    console.log(`WebSocket message sent to ${destination}:`, body);
    //}

    public isConnected(): boolean {
        return this.connected;
    }

}

export default WebSocketService;