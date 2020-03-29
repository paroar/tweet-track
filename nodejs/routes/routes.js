module.exports = app => {
  app.get("/changeTopic", (req, res) => {
    app.locals.stream.stop();
    console.log(req.query);
  });
};
