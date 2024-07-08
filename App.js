import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [form, setForm] = useState({
    orderId: "",
    deliveryDate: "",
    deliveryAddress: "",
    deliveryFee: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/deliveries")
      .then((response) => setDeliveries(response.data))
      .catch((error) =>
        console.error("There was an error fetching the deliveries!", error)
      );
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/deliveries", form)
      .then((response) => setDeliveries([...deliveries, response.data]))
      .catch((error) =>
        console.error("There was an error accepting the delivery!", error)
      );
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/deliveries/${id}`)
      .then(() =>
        setDeliveries(deliveries.filter((delivery) => delivery._id !== id))
      )
      .catch((error) =>
        console.error("There was an error rejecting the delivery!", error)
      );
  };

  return (
    <div>
      <h1>Delivery System</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="orderId"
          placeholder="Order ID"
          value={form.orderId}
          onChange={handleChange}
          required
        />
        <input
          name="deliveryDate"
          placeholder="Delivery Date"
          type="date"
          value={form.deliveryDate}
          onChange={handleChange}
          required
        />
        <input
          name="deliveryAddress"
          placeholder="Delivery Address"
          value={form.deliveryAddress}
          onChange={handleChange}
          required
        />
        <input
          name="deliveryFee"
          placeholder="Delivery Fee"
          type="number"
          value={form.deliveryFee}
          onChange={handleChange}
          required
        />
        <button type="submit">Accept Delivery</button>
      </form>
      <ul>
        {deliveries.map((delivery) => (
          <li key={delivery._id}>
            {delivery.orderId} - {delivery.deliveryDate} -{" "}
            {delivery.deliveryAddress} - ${delivery.deliveryFee}
            <button onClick={() => handleDelete(delivery._id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
