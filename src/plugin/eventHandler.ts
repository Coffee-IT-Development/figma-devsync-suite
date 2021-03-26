class EventHandler {
  _listeners = [];
  _listenerId = 0;

  constructor() {}

  fireEvent = (e) => {
    const matchedListeners = this._listeners.filter((l) => l.event === e.type);
    for (let i = matchedListeners.length; i > 0; i--) {
      if (matchedListeners[i - 1]?.listener(e) === true) break;
    }
  };

  addEventListener = (event: string, cb) => {
    if (typeof cb === "function") {
      const listenerId = this._listenerId;
      this._listenerId++;
      this._listeners.push({
        event,
        listener: cb,
        id: listenerId,
      });
      return {
        id: listenerId,
        remove: () => {
          this._listeners = this._listeners.filter((l) => l.id !== listenerId);
        },
      };
    }
  };
}

export default new EventHandler();
