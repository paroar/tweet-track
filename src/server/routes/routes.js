module.exports = app => {
  app.post("/changeTopic", (req, res) => {
    console.log(req.body);
  });
};
