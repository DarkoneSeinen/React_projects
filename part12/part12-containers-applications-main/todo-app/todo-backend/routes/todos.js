const express = require('express');
const { Todo } = require('../mongo');
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  });
  res.send(todo);
});

const singleRouter = express.Router();

/* Middleware to find a todo by ID */
const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  try {
    req.todo = await Todo.findById(id);
    if (!req.todo) return res.sendStatus(404);
    next();
  } catch (error) {
    return res.sendStatus(400); // invalid ID format
  }
};

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo by ID. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT update todo. */
singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body;

  if (text !== undefined) req.todo.text = text;
  if (done !== undefined) req.todo.done = done;

  const updatedTodo = await req.todo.save();
  res.send(updatedTodo);
});

router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;
