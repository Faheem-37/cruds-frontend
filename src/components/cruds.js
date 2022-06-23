import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./cruds.css";
const CrudsOperation = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhoneNumber] = useState("");

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const onChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(`Form submitted:`);
    console.log(`Todo name: ${name}`);
    console.log(`Todo address: ${address}`);
    console.log(`Todo phone: ${phone}`);
    let newRecord = {
      name: name,
      address: address,
      phone: phone,
    };
    console.log(`Form submitted:`);
    console.log(`Todo name: ${name}`);
    console.log(`Todo address: ${address}`);
    console.log(`Todo phone: ${phone}`);
    try {
      await axios
        .post("https://cruds-by-faheem.herokuapp.com/add", newRecord)
        .then(() => toast.success("Record added successfully"));
      setName("");
      setAddress("");
      setPhoneNumber("");
    } catch (e) {
      toast.error("Failed to added Record");
    }
  };

  return (
    <div className="container-fluid align-items-center justify-content-center formContainer">
      <div>
        <h3>Create New Record</h3>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <label className="d-flex justify-content-start align-items-center mb-1">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={onChangeName}
              required
            />
          </div>
          <div className="form-group">
            <label className="d-flex justify-content-start align-items-center mb-1">
              Address:
            </label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={onChangeAddress}
              required
            />
          </div>
          <div className="form-group">
            <label className="d-flex justify-content-start align-items-center mb-1">
              Ph #:
            </label>
            <input
              type="number"
              className="form-control"
              value={phone}
              onChange={onChangePhoneNumber}
            />
          </div>
          {/* <div className=" d-block mt-2">
            <button
              className="btn btn-primary me-2 formButton"
              type="button"
              onClick={() => onSubmit()}
            >
              Add Record
            </button>
            <a
              className="btn btn-primary formButton"
              type="button"
              href="/record"
            >
              Go To List
            </a>
          </div> */}
          <div className="form-group">
            <input
              type="submit"
              value="Create Todo"
              className="btn btn-primary formButton mt-2 me-2"
            />
            <a
              className="btn btn-primary formButton mt-2"
              type="button"
              href="/record"
            >
              Go To List
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CrudsOperation;
