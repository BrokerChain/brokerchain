type EventListener<T> = (args: T) => void;
type Filter<T> = (listener: EventListener<T>) => boolean;
export class EventSource<T> {
    private _listener: EventListener<T>[] = [];
    on(listener: EventListener<T>) {
        this._listener.push(listener);
        return {
            listener,
            remove: () => {
                this._listener = this._listener.filter((item) => item !== listener);
            }
        };
    }
    once(listener: EventListener<T>) {
        const { remove } = this.on((args: T) => {
            try {
                listener(args);
            } finally {
                remove();
            }
        });
    }
    _notify(args: T, filter?: Filter<T>) {
        let list = this._listener;
        if (filter) {
            list = list.filter(filter);
        }
        list.forEach((item) => {
            item(args);
        });
    }
    _notify_next_tick(args: T, filter?: Filter<T>) {
        setTimeout(() => {
            this._notify(args, filter);
        }, 0);
    }
}
