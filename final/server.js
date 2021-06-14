const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const memberController = require('./controllers').member;
const employController = require('./controllers').employ;
const bookController = require('./controllers').book;
const bestsellerController = require('./controllers').best_seller;
const salerecordController = require('./controllers').sale_record;

var corsOptions = {
  origin: "http://127.0.0.1:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.get('/api/member', memberController.list);
app.post('/api/member', memberController.add);
app.get('/api/member/memcount', memberController.count);
app.get('/api/member/:mem_id', memberController.getById);
app.get('/api/member/:method/:value', memberController.search);
app.put('/api/member/:mem_id', memberController.update);
app.delete('/api/member/:method/:value', memberController.delete);


app.get('/api/employ', employController.list);
app.post('/api/employ', employController.add);
app.get('/api/employ/:emp_id', employController.getById);
app.get('/api/employ/:method/:value', employController.search);
app.put('/api/employ/:emp_id', employController.update);
app.delete('/api/employ/:method/:value', employController.delete);

app.get('/api/book', bookController.list);
app.post('/api/book', bookController.add);
app.get('/api/book/bookcount', bookController.count);
app.get('/api/book/sum', bookController.sum);
app.get('/api/book/maxprice', bookController.max);
app.get('/api/book/minprice', bookController.min);
app.get('/api/book/avgcount', bookController.avg);
app.get('/api/book/:book_id', bookController.getById);
app.get('/api/book/:method/:value', bookController.search);
app.put('/api/book/:book_id', bookController.update);
app.delete('/api/book/:method/:value', bookController.delete);

app.get('/api/bestseller', bestsellerController.list);
app.post('/api/bestseller', bestsellerController.add);
app.get('/api/bestseller/:book_id', bestsellerController.getById);
app.get('/api/bestseller/:method/:value', bestsellerController.search);
app.put('/api/bestseller/:book_id', bestsellerController.update);
app.delete('/api/bestseller/:method/:value', bestsellerController.delete);

app.get('/api/salerecord', salerecordController.list);
app.post('/api/salerecord', salerecordController.add);
app.get('/api/salerecord/salerecordcount', salerecordController.count);
app.get('/api/salerecord/sum', salerecordController.sum);
app.get('/api/salerecord/maxprice/:book_id', salerecordController.max);
app.post('/api/salerecord/raw', salerecordController.raw);
app.get('/api/salerecord/minprice/:book_id', salerecordController.min);
app.get('/api/salerecord/avgprice', salerecordController.avg);
app.get('/api/salerecord/having', salerecordController.having);
app.get('/api/salerecord/:record_id', salerecordController.getById);
app.get('/api/salerecord/:method/:value', salerecordController.search);
app.put('/api/salerecord/:record_id', salerecordController.update);
app.delete('/api/salerecord/:method/:value', salerecordController.delete);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
