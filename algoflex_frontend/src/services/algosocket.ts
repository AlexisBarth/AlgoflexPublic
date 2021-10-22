export default class AlgoSocket {

    private _socket!: WebSocket;

    constructor(link : string){
        this.connection(link);
    }

    public connection(link : string){
        this._socket = new WebSocket(link);

        this._socket.onclose = (event) => {
            console.log("Socket fermé. Reconnexion dans 1 seconde.", event.reason);
            setTimeout(() => this.connection(link), 1000);
        }

        this._socket.onerror = (event: Event) => {
            console.error("Server error");
        };
    }

    get socket(){
        return this._socket;
    }

}