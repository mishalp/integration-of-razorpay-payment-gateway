var express = require("express");
var path = require("path");
const cors = require("cors");
const port = 3000;
const Razorpay = require('razorpay')

var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

var instance = new Razorpay({ key_id: 'rzp_test_et0oVAWbGeqweY', key_secret: 'q4V33FtJ0tBrGcwexQF4xnOf' })

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.post("/payment", (req, res) => {
  console.log(req.body);
    console.log(req.body.amount);
  instance.orders.create({
    amount: req.body.amount*100,
    currency: "INR",
    receipt: "receipt#1",
    notes: {
      key1: "value3",
      key2: "value2",
    },
  }, (err, order)=>{
    if(err) console.log(err);
    console.log(order);
    res.status(201).json({orderId: order.id, key:'rzp_test_et0oVAWbGeqweY'})
  });
});

app.listen(port, () => {
  console.log("listening");
});
