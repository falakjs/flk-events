const Is = require('flk-supportive-is');

class Events {
    /**
    * Constructor
    *
    */
    constructor() {
        this.events = new Map;
    }

    /**
    * Add new callback to the given event
    * This method is alias to addEventListener
    *
    */
    on(event, callback) {
        return this.addEventListener(event, callback);
    }

    /**
    * Add event listener
    *
    * @param string|array event
    */
    addEventListener(event, callback) {
        if (Is.object(event) && ! callback) {
            for (let eventName in event) {
                this.addEventListener(eventName, event[eventName]);
            }
            return;
        }

        let events = event.split(' ');

        for (let event of events) {
            if (! this.events.has(event)) {
                this.events.set(event, [callback]);
            } else {
                let callbacks = this.events.get(event);
                callbacks.push(callback);
                this.events.set(event, callbacks);
            }
        }

        return this;
    }

    /**
     * An alias to addEventListener
     */
    subscribe(...args) {
        return this.addEventListener(...args);
    }

    /**
    * Trigger the given event
    *
    */
    async trigger(event, ...args) {     
        if (! this.events.has(event)) return;

        for (let callback of this.events.get(event)) {
            let callbackReturn = callback.apply(this, args);
            
            if (callbackReturn === false) {
                return false;
            } else if (typeof callbackReturn != 'undefined') {
                if (callbackReturn.constructor.name == 'Promise') {
                    return await callbackReturn;                      
                } else {
                    return callbackReturn;
                }
            }
        }

        return this;
    }

    /**
     * An alias to trigger method 
     */
    emit(...args) {
        return this.trigger(...args);
    }

    /**
    * This method is used to clear event(s) or remove all events callbacks
    *
    */
    off(events) {
        if (! events) {
            this.events.clear();
        } else {
            events = events.split(' ');
            for (let event of events) {
                if (this.events.has(event)) {
                    this.events.delete(event);
                }
            }
        }

        return this;
    }
}

module.exports = new Events;