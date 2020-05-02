// const bodyParser = require("body-parser");

// module.exports = (app, stream, tStream) => {

//   app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
//   app.use(bodyParser.urlencoded({ extended: false }))
//   app.use(bodyParser.json())


//   app.post("/changeTopic", (req, res) => {
//     tStream && tStream.stop();
//     app.topic = req.body.topic;
//     console.log(app.topic);
//     res.status(200).send({
//       status: "success",
//       action: "changeTopic",
//       topic: app.topic
//     });
//   });

//   app.post("/play", (req, res) => {
//     res.status(200).send({
//       status: "success",
//       action: "play"
//     });
//     stream();
//   });

//   app.post("/pause", (req, res) => {
//     tStream && tStream.stop();
//     res.status(200).send({
//       status: "success",
//       action: "paused"
//     });
//   });

//   app.post("/stop", (req, res) => {
//     tStream && tStream.stop();
//     resetLocalCount();
//     res.status(200).send({
//       status: "success",
//       action: "stoped"
//     });
//   });

// };
