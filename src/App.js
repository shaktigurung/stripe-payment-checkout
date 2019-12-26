import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
require('dotenv').config();

function App() {
  const [product] = React.useState({
    name: "Sony TV",
    price: 500,
    description: "Cool car"
  });

  async function handleToken(token, addresses) {
    const response = await axios.post(
      "/checkout",
      { token, product }
    );
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
      toast.success("Success! Check email for details");
    } else {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="container">
      <div className="product">
        <h1>{product.name}</h1>
        <h3>On Sale · ${product.price}</h3>
      </div>
      <StripeCheckout
        stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
        token={handleToken}
        amount={product.price * 100}
        name={product.name}
        billingAddress
        shippingAddress
      />
    </div>
  );
}

export default App;

