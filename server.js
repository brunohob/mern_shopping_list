const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const items = require('./routes/api/items');
 
const app = express();
app.use(express.json());

// DB Config
const db = require('./config/keys').mongoURL;
// connnet to mongoDB
mongoose
  .connect(db, { 
  	useNewUrlParser: true,
    useCreateIndex: true }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/items', items);

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	// set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));