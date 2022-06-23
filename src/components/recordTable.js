import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import trash from "./../assets/trash-can-solid.svg";
import edit from "./../assets/pencil-solid.svg";
import Modal from "react-bootstrap/Modal";
import "./cruds.css";
const RecordTable = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [record, setRecord] = useState([]);
  const [itemForUpdate, setItemForUpdate] = useState([]);
  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const onChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const onSubmit = async () => {
    console.log(`Form submitted:`);
    console.log(`Todo name: ${name}`);
    console.log(`Todo address: ${address}`);
    console.log(`Todo phone: ${phone}`);
    let newRecord = {
      name: name,
      address: address,
      phone: phone,
    };
    await axios
      .post("http://localhost:8000/todo/add", newRecord)
      .then((res) => console.log("record added successfully"));
  };

  const deleteRecord = async (item) => {
    console.log("item", item);
    try {
      await axios.delete(`http://localhost:8000/todo/delete/${item}`);
      setModalDelete(false);
      toast.success("Record deleted Scuccessfully");
      getAllRecords();
    } catch (e) {
      toast.error("Deletion Failed");
    }
  };
  const openUpdateModal = (item) => {
    setItemForUpdate(item._id);
    setModalShow(true);
    setName(item.name);
    setAddress(item.address);
    setPhoneNumber(item.phone);
  };
  const openDeleteModal = (item) => {
    setItemForUpdate(item._id);
    setModalDelete(true);
    setName(item.name);
    setAddress(item.address);
    setPhoneNumber(item.phone);
  };

  const updateRecord = async (itemId) => {
    try {
      let newRecord = {
        name: name,
        address: address,
        phone: phone,
      };
      console.log("newRecord", newRecord);
      console.log("itemId", itemId);

      await axios
        .patch(`http://localhost:8000/todo/update/${itemId}`, newRecord)
        .then("record updated successfully");
      setModalShow(false);
      toast.success("Record Updated successfully");
      getAllRecords();
    } catch (e) {
      toast.error("Updation Failed");
    }
  };
  const getAllRecords = async () => {
    await axios.get("http://localhost:8000/todo/getAllTodos").then((res) => {
      console.log(res);
      setRecord(res.data);
    });
  };
  useEffect(() => {
    getAllRecords();
  }, []);
  return (
    <div className="container-fluid align-items-center justify-content-center formContainer">
      <div>
        <h3>Records</h3>
        <div className="tableContainer">
          <table className="table table-hover">
            <thead>
              <tr>
                {/* <th scope="col" className="p-5 pb-2">
                N
              </th> */}
                <th scope="col" className="">
                  Name
                </th>
                <th scope="col" className="">
                  Phone #
                </th>
                <th scope="col" className="">
                  Address
                </th>
                <th scope="col" className="">
                  Edit
                </th>
                <th scope="col" className="">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {record &&
                record.map((item) => {
                  return (
                    <tr>
                      {/* <th scope="row">{1}</th> */}
                      <td>{item.name}</td>
                      <td>{item.phone}</td>
                      <td>{item.address}</td>
                      <td style={{ textAlign: "center" }}>
                        <img
                          src={edit}
                          className="trashIcon"
                          onClick={() => openUpdateModal(item)}
                        />
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <img
                          src={trash}
                          className="trashIcon"
                          // onClick={() => deleteRecord(item)}
                          onClick={() => openDeleteModal(item)}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="divBtn">
          <a className="btn btn-primary formButton" type="button" href="/">
            Back To Home
          </a>
        </div>
      </div>
      {modalShow ? (
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body
            className="model-image"
            // style={{ border: "2px solid #FF5043" }}
          >
            <form onSubmit={onSubmit} className="form">
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
              <div className=" d-block mt-2 d-flex justify-content-center align-items-center">
                <button
                  className="btn btn-primary me-2 formButton"
                  type="button"
                  onClick={() => updateRecord(itemForUpdate)}
                >
                  Update
                </button>
                <button
                  className="btn btn-primary me-2 formButton"
                  type="button"
                  onClick={() => setModalShow(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      ) : (
        <></>
      )}

      {modalDelete ? (
        <Modal
          show={modalDelete}
          onHide={() => setModalDelete(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body
            className="model-image"
            // style={{ border: "2px solid #FF5043" }}
          >
            <form onSubmit={onSubmit} className="form">
              <div className="form-group">
                <label className="d-flex justify-content-start align-items-center mb-1">
                  Name:
                </label>
                <input className="form-control" value={name} disabled />
              </div>
              <div className="form-group">
                <label className="d-flex justify-content-start align-items-center mb-1">
                  Address:
                </label>
                <input className="form-control" value={address} disabled />
              </div>
              <div className="form-group">
                <label className="d-flex justify-content-start align-items-center mb-1">
                  Ph #:
                </label>
                <input className="form-control" value={phone} disabled />
              </div>
              <span>Are you sure to Delete?</span>
              <div className=" d-block mt-2 d-flex justify-content-center align-items-center">
                <button
                  className="btn btn-primary me-2 formButton"
                  type="button"
                  onClick={() => deleteRecord(itemForUpdate)}
                >
                  Yes
                </button>
                <button
                  className="btn btn-primary me-2 formButton"
                  type="button"
                  onClick={() => setModalDelete(false)}
                >
                  No
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
};
export default RecordTable;
