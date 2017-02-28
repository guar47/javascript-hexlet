import Express from 'express';

export default () => {
  // BEGIN (write your solution here)
  const app = new Express();
  const counter = { value: 0 };
  app.get('/', (req, res) => {
    res.json(counter);
  });
  app.post('/increment', (req, res) => {
    counter.value += 1;
    res.status(204).send();
  });
  app.post('/decrement', (req, res) => {
    counter.value -= 1;
    res.status(204).send();
  });
  app.delete('/reset', (req, res) => {
    counter.value = 0;
    res.status(204).send();
  });
  app.put('/set', (req, res) => {
    const query = req.query;
    counter.value = Number(query.value);
    res.status(204).send();
  });
  // END

  return app;
};
