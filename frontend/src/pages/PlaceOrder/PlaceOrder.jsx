import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceOrder = () => {

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems } = useContext(StoreContext);

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (e) => {
    e.preventDefault()
    if (!token) {
      alert("Please login to place an order.");
      navigate('/login');
      return;
    }
    if (!data.firstName.trim() || !data.lastName.trim() || !data.email.trim() || !data.street.trim() || !data.city.trim() || !data.state.trim() || !data.zipcode.trim() || !data.country.trim() || !data.phone.trim()) {
      alert("Please fill in all the delivery information.");
      return;
    }
    let orderItems = [];
    food_list.map((item) => {
        if (cartItems[item._id] > 0) {
            let itemInfo = item;
            itemInfo["quantity"] = cartItems[item._id];
            orderItems.push(itemInfo);
        }
    });
    try {

      //  payment :
      // 1) Create razorpay order from backend
      const paymentRes = await axios.post("http://localhost:4000/api/payment/create", {
        amount: getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5
      });

      const order = paymentRes.data.order;
      // 2) Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Slice",
        description: "Order Payment",
        order_id: order.id,

          handler: async function (response) {
          // 3) verify payment
          const verify = await axios.post("http://localhost:4000/api/payment/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

            if (verify.data.success) {
            console.log("PAYMENT VERIFIED ✔");

            const orderData = {
                items: orderItems,
                amount: getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5,
                  address: data,
                payment: true
            };

            const res = await axios.post(url + "/api/order/place", orderData, { headers: { token } });

            if (res.data.success) {
                setCartItems({});
                navigate("/");
            } else {
                alert(res.data.message || "Order placement failed");
            }
          } else {
            alert("Payment verification failed!");
          }
        },

        theme: { color: "#0f172a" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.log(err.message)
    }


   
  }


  return (
    <form onSubmit={(e)=>{placeOrder(e)}} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-field">
          <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' required />
          <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' required />
        </div>
        <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' required />
        <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' required />
        <div className="multi-field">
          <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' required />
          <input type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' required />
        </div>
        <div className="multi-field">
          <input type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' required />
          <input type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' required />
        </div>
        <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' required />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details"><p>Subtotal</p><p>₹{getTotalCartAmount()}</p></div>
            <hr />
            <div className="cart-total-details"><p>Delivery Fee</p><p>₹{getTotalCartAmount() === 0 ? 0 : 5}</p></div>
            <hr />
            <div className="cart-total-details"><b>Total</b><b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}</b></div>
          </div>
        </div>
        <button className='place-order-submit' type='submit'>Proceed To Payment</button>
      </div>
    </form>
  )
}

export default PlaceOrder
