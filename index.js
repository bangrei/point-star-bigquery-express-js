var formValidator = require("./validator");
var { validationResult } = require("express-validator");
var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
var helmet = require("helmet");
var path = require("path");
var dbConfig = require('./dbConfig');

var app = express();
var server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./public")));
app.use(helmet());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/form.html"));
});

app.post("/register", formValidator, async (req, res) => {
  const errors = validationResult(req);
	if (errors.isEmpty()) {
    var data = {
      ...req.body,
      ...{ subscribe: req.body.subscribe == "on" },
    };
    const rows = [data];
    const tbl = await dbConfig(rows);
    const payload = tbl.payload ? tbl.payload[0] : null;
    const html = [];
    if (payload) {
      for (var k in payload) {
        const item = `<div class="form-group">
					<label>${k}:</label>
					<span>${payload[k]}</span>
				</div>`;
        html.push(item);
      }
		}
		var text = `<h1>Account registration success!!</h1><div>${html.join(
      ""
    )}</div>`;

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
		res.end(text);
		return;
  }
  res.status(422).json({ errors: errors.array() });
});

server.listen(3000, () => {
	console.log("server running on port: 3000");
});
