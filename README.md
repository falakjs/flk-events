# Events

A simple lightweight event handler package for Falak JS.


> Note this package could be used as a standalone package

# Installation

> This package is automatically installed on each new application so you don't have to install it.

For standalone usage
`npm i -s flk-events`

# Package info

**Alias:** `events`

The `Events` class is used to move between all components and packages with events without any conflict;


# Usage

If you want to use `events` in any component class, just inject it into the constructor with `events` parameter

`home-page.component.js`

```js
class HomePage {
    constructor(events) {
        this.events = events;
    }
}
```

For outer usage use the [DI.resolve('events')](https://github.com/falakjs/Falak/wiki/Dependency-Injection#resolving-class).

# Event listeners
To add event listener to any event use the `on` method, for example in the `main.js` file:

`main.js`
```js
let events = DI.resolve('events');
events.on('app.ready', function () {
    // do something when app is ready
});
```

> `addEventListener` and `subscribe` are alias methods to `on` method.

You may use the `subscribe` if you're more familiar with it than the `on` method

`main.js`
```js
let events = DI.resolve('events');
events.subscribe('app.ready', function () {
    // do something when app is ready
});
```

# Triggering event
To trigger event use the `trigger` method or `emit` as an alias.

```js
// listen to the user waking up
let events = DI.resolve('events');

events.on('user.wake-up', user => {
    console.log(user.id); // 12
});

setTimeout(() => {
    events.trigger('user.wake-up', {
        id: 12
    });
}, 4000);
```

You can pass any number of arguments to the `trigger` method as it will be passed to the `callback` function in the `on` method.