const EventEmitter = require('events');

class Clock extends EventEmitter {
  start() {
    let tic = true;
    this.interval = setInterval(() => {
      const event = tic ? 'tic' : 'tac';
      this.emit(event, Date.now());
      tic = !tic;
    }, 1000);
  }
  stop() {
    clearInterval(this.interval);
  }
}

const clock = new Clock();
clock.on('tic', t => console.log('tic: %d', t));
clock.on('tac', t => console.log('tac: %d', t));
clock.start();
setTimeout(() => {
  clock.stop();
}, 400000);
