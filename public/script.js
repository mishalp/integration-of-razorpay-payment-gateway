function submitHandler(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    const amount = document.getElementById("amount").value;
    if (
      name.length < 1 ||
      email.length < 1 ||
      mobile.length < 1 ||
      amount.length < 1
    ) {
      window.alert("fill all the fields");
      return;
    }
    if (mobile.length < 10) {
      alert("mobile number length must be 10");
      return;
    }
    const data = { name, mobile, amount, email };
    fetch("/payment", {
      method: "POST",

      body: JSON.stringify({ ...data }),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(async (res) => {
      const { orderId, key } = await res.json();
      var options = {
        key: key, // Enter the Key ID generated from the Dashboard
        amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "mishal",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
        prefill: {
          name: name,
          email: email,
          contact: mobile,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
        handler: function (response) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
      };
      var rzp1 = new Razorpay(options);
      rzp1.open();
    });
  }
  document
    .getElementById("submit")
    .addEventListener("click", submitHandler);