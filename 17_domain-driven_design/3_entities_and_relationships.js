// solution.js

import { Film, CinemaHall, FilmScreening } from './entities';


export default (filmName, duration, cinemaHallName, rows, cols, time) => {
  // BEGIN (write your solution here)
  const film = new Film(filmName, duration);
  const hall = new CinemaHall(cinemaHallName, rows, cols);
  const screening = new FilmScreening(film, hall, time);
  return screening;
  // END
};

// FilmScreening.js

import uuid from 'uuid-js';

// BEGIN (write your solution here)
export default class{
  constructor(film, cinemaHall, time) {
    this.id = uuid.create().hex;
    this.film = film;
    this.cinemaHall = cinemaHall;
    this.time = time;
    this.createdAt = new Date();
    this.cinemaHall.addFilmScreening(this);
  }
}
// END

// Film.js

import uuid from 'uuid-js';

// BEGIN (write your solution here)
export default class {
  constructor(name, duration) {
    this.id = uuid.create().hex;
    this.name = name;
    this.duration = duration;
    this.createdAt = new Date();
  }
}
// END

// CinemaHall.js

import uuid from 'uuid-js';

// BEGIN (write your solution here)
export default class {
  constructor(name, rows, cols) {
    this.id = uuid.create().hex;
    this.name = name;
    this.rows = rows;
    this.cols = cols;
    this.filmScreening = this.filmScreenings;
    this.createdAt = new Date();
    this.filmScreenings = [];
  }
  addFilmScreening(filmScreening) {
    this.filmScreenings.push(filmScreening);
  }
}
// END
