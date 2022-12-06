let express = require('express');
let dummy = require('mongoose-dummy');
let connection = require('./utility/connection');
const app = express();

// dummy(User, {
//     ignore: ["_id", "_v"],
// })

connection.connect();
app.listen(8080, () => {
    console.log("Server started on port 8080");
});