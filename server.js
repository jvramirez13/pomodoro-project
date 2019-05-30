const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

app.get("/", (req, res) => {
  axios.get("http://api.kanye.rest/").then(response => {
    const quote = response.data.quote;
    console.log(quote);
    res.send({ quote: quote });
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));