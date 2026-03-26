var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function(req, res) {
  let input = req.params.date;

  if (!input) {
  const now = Date.now();
  return res.json({ unix: now, utc: new Date(now).toUTCString() });
  }

  let date;
  if (/^\d+$/.test(input)) {
    date = new Date(parseInt(input));
  } else {
    date = new Date(input);
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});