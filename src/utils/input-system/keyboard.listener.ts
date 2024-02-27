export class KeyboardEvents {

    static arrowUpSubscribers: { 'instance': any, 'callback': (...args: any[]) => void; }[] = []
    static arrowDownSubscribers: { 'instance': any, 'callback': (...args: any[]) => void; }[] = []
    static arrowLeftSubscribers: { 'instance': any, 'callback': (...args: any[]) => void; }[] = []
    static arrowRightSubscribers: { 'instance': any, 'callback': (...args: any[]) => void; }[] = []

    static SubscribeToUpKey(obj: { 'instance': any, 'callback': (...args: any[]) => void; }) {

        let idx = this.arrowUpSubscribers.findIndex(x => x.instance === obj.instance);
        if (idx > -1)
            this.arrowUpSubscribers[idx] = obj;

        else
            this.arrowUpSubscribers.push(obj);

    }

    static SubscribeToDownKey(obj: { 'instance': any, 'callback': (...args: any[]) => void; }) {

        let idx = this.arrowDownSubscribers.findIndex(x => x.instance === obj.instance);
        if (idx > -1)
            this.arrowDownSubscribers[idx] = obj;

        else
            this.arrowDownSubscribers.push(obj);
    }

    static SubscribeToLeftKey(obj: { 'instance': any, 'callback': (...args: any[]) => void; }) {

        let idx = this.arrowLeftSubscribers.findIndex(x => x.instance === obj.instance);
        if (idx > -1)
            this.arrowLeftSubscribers[idx] = obj;

        else
            this.arrowLeftSubscribers.push(obj);
    }


    static SubscribeToRightKey(obj: { 'instance': any, 'callback': (...args: any[]) => void; }) {

        let idx = this.arrowRightSubscribers.findIndex(x => x.instance === obj.instance);
        if (idx > -1)
            this.arrowRightSubscribers[idx] = obj;

        else
            this.arrowRightSubscribers.push(obj);

    }

    static ListenKeyboardEvents() {
        document.body.addEventListener('keydown', function (event) {
            const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"

            switch (key) {
                case "ArrowLeft":
                    KeyboardEvents.arrowLeftSubscribers.forEach(x => {
                        x.callback.call(null);
                    });
                    break;
                case "ArrowRight":
                    KeyboardEvents.arrowRightSubscribers.forEach(x => {
                        x.callback.call(null);
                    });
                    break;
                case "ArrowUp":
                    KeyboardEvents.arrowUpSubscribers.forEach(x => {
                        x.callback.call(null);
                    });
                    break;
                case "ArrowDown":
                    KeyboardEvents.arrowDownSubscribers.forEach(x => {
                        x.callback.call(null);
                    });
                    break;
            }
        });
    }
}