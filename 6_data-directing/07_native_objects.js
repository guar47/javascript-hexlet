const run = (player1, player2, cards, customRandom) => {
  // BEGIN (write your solution here)
  const iter = (health1, name1, health2, name2, order, log) => {
    if (health1 < 0) {
      const logItemEnd = head(log);
      logItemEnd.message = `${name1} был убит`;
      return cons(logItemEnd, log);
    }
    const card = customRandom(cards);
    const cardName = card.name;
    const damage = card.damage(health2);
    const newHealth = health2 - damage;
    const stats = {
      message: `Игрок '${name1}' применил '${cardName}'
      против '${name2}' и нанес урон '${damage}'`,
    };
    if (order === 1) {
      stats.health1 = health1;
      stats.health2 = newHealth;
    } else if (order === 2) {
      stats.health1 = newHealth;
      stats.health2 = health1;
    }
    const newLog = cons(stats, log);
    return iter(newHealth, name2, health1, name1, order === 1 ? 2 : 1, newLog);
  };
  // END

  const startHealth = 10;
  const logItem = {
    health1: startHealth,
    health2: startHealth,
    message: 'Начинаем бой!',
  };
  return reverse(iter(startHealth, player1, startHealth, player2, 1, l(logItem)));
};

export default (cards, customRandom = random) =>
(name1, name2) =>
run(name1, name2, cards, customRandom);
