exports.addNumbers = (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  if (!isNaN(num1) && !isNaN(num2)) {
    const result = num1 + num2;
    res.send(`The result is ${result}`);
  } else {
    res.status(400).send("Invalid numbers provided.");
  }
};
