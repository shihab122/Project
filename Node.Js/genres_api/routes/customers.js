const auth = require('../middleware/auth');
const { Customer, validate } = require('../models/customer');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.status(200).send(customers);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    isGold: req.body.isGold
  });
  customer = await customer.save();

  res.status(201).send(customer);
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(req.params.id, {
    new: true
  });
  if (!customer)
    return res
      .status(404)
      .send('The customer with this given id is not found!');

  res.status(200).send(customer);
});

router.delete('/:id', auth, async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send('The customer with this given id is not found!');

  res.status(204).send(customer);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send('The customer with this given id is not found!');
  res.status(200).send(customer);
});

module.exports = router;
