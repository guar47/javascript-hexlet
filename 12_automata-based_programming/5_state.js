// BEGIN (write your solution here)
class AlarmClock {
  constructor() {
    this.clockTime = { minutes: 0, hours: 12 };
    this.alarmTime = { minutes: 0, hours: 6 };
    this.alarmOn = false;
    this.setState(ClockState);
  }
  clickMode() {
    this.state.nextState();
  }
  longClickMode() {
    this.alarmOn = !this.alarmOn;
  }
  clickH() {
    this.state.incrementH();
  }
  clickM() {
    this.state.incrementM();
  }
  tick() {
    this.incrementM('clockTime');
    if (this.clockTime.minutes === 0) {
      this.incrementH('clockTime');
    }
    this.state.tick();
  }
  isAlarmOn() {
    return this.alarmOn;
  }
  isAlarmTime() {
    return this.clockTime.minutes === this.alarmTime.minutes
      && this.clockTime.hours === this.alarmTime.hours;
  }
  minutes() {
    return this.clockTime.minutes;
  }
  hours() {
    return this.clockTime.hours;
  }
  alarmMinutes() {
    return this.alarmTime.minutes;
  }
  alarmHours() {
    return this.alarmTime.hours;
  }
  setState(Klass) {
    this.state = new Klass(this);
  }
  currentMode() {
    return this.state.modeName();
  }
  incrementH(timeType) {
    const data = this[timeType];
    data.hours = (data.hours + 1) % 24;
  }
  incrementM(timeType) {
    const data = this[timeType];
    data.minutes = (data.minutes + 1) % 60;
  }
}
// END

// BEGIN (write your solution here)
class State {
  constructor(clock) {
    this.clock = clock;
  }
  nextState(StateKlass) {
    this.clock.setState(StateKlass || this.NextStateClass);
  }
  modeName() {
    return this.mode;
  }
}
// END

// BEGIN (write your solution here)
class AlarmState extends State {
  constructor() {
    super();
    this.mode = 'alarm';
    this.timeType = 'alarmTime';
    this.NextStateClass = ClockState;
  }
  incrementH() {
    this.clock.incrementH(this.timeType);
  }
  incrementM() {
    this.clock.incrementM(this.timeType);
  }
  tick() {
    if (this.clock.isAlarmTime()) {
      this.nextState(BellState);
    }
  }
}
// END

// BEGIN (write your solution here)
class BellState extends State {
  constructor() {
    super();
    this.mode = 'bell';
    this.NextStateClass = ClockState;
  }
  tick() {
    this.nextState();
  }
  incrementH() {
    return false;
  }
  incrementM() {
    return false;
  }
}
// END

// BEGIN (write your solution here)
class ClockState extends State {
  constructor() {
    super();
    this.mode = 'clock';
    this.timeType = 'clockTime';
    this.NextStateClass = AlarmState;
  }
  incrementH() {
    this.clock.incrementH(this.timeType);
  }
  incrementM() {
    this.clock.incrementM(this.timeType);
  }
  tick() {
    if (this.clock.isAlarmOn() && this.clock.isAlarmTime()) {
      this.nextState(BellState);
    }
  }
}
// END


const clock = new AlarmClock();
console.log(clock);
