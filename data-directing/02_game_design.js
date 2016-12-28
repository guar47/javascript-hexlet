import { cons, car, cdr } from 'hexlet-pairs';
import { cons as consList, l, random, head, reverse, length } from 'hexlet-pairs-data';

const run = (player1, player2, cards) => {
  const iter = (health1, name1, health2, name2, order, log) => {
    // BEGIN (write your solution here)
    if (health1 <= 0 || health2 <= 0) {
      log = consList(cons(cons(health1, health2), 'Game over!'), log);
      return log;
    }
    const card = random(cards);
    const damage = cdr(card); //function
    const cardName = car(card);

    let message = '';
    if (order === 1) {
      health2 = health2 - damage();
      message = `Игрок '${name1}' применил '${cardName}' против '${name2}' и нанес урон '${damage}'`;
    } if (order === 2) {
      health1 = health1 - damage();
      message = `Игрок '${name2}' применил '${cardName}' против '${name1}' и нанес урон '${damage}'`;
    }
    log = consList(cons(cons(health1, health2), message), log);

    return iter(health1, name1, health2, name2, order === 2 ? 1 : 2, log);
    // END
  };

  const startHealth = 10;
  const logItem = cons(cons(startHealth, startHealth), 'Начинаем бой!');
  return reverse(iter(startHealth, player1, startHealth, player2, 1, l(logItem)));
};

export default cards =>
  (name1, name2) =>
    run(name1, name2, cards);
