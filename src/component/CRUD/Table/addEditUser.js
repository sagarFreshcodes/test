import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Card1 from "../../Common/Helper/designHelper";

function AddEditUserForm({ recordData, toogle, LoadData }) {
  const FildInfo = [
    {
      title: "_id",
      field: "_id",
      type: "text",
      placeholder: "Enter _id",
    },
    {
      title: "Name",
      field: "Name",
      type: "text",
      placeholder: "Enter Name",
    },
    {
      title: "phone Number",
      field: "phone Number",
      type: "text",
      placeholder: "Enter phone Number",
    },
    {
      title: "discription",
      field: "discription",
      type: "text",
      placeholder: "Enter discription",
    },
    {
      title: "date",
      field: "date",
      type: "text",
      placeholder: "Enter date",
    },
    {
      title: "Profile Image",
      field: "Profile Image",
      type: "text",
      placeholder: "Enter Profile Image",
    },
    {
      title: "selected_id",
      field: "selected_id",
      type: "text",
      placeholder: "Enter selected_id",
    },
  ];
  const [loader, setLoader] = useState(false);
  const [userFormData, setUserFormData] = useState({
    userName: "",
    name: "",
    email: "",
    contact: "",
  });
  const { recordObj, action, message } = recordData || {
    recordObj: {},
  };
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Navigation = (data) => {
    navigate(data);
  };

  const onHandleChange = ({ target }) => {
    const { name, value } = target;
    setUserFormData({ ...userFormData, [name]: value });
    console.log(name, value);
  };

  // const LoadData = () => {
  //   dispatch(StoreUserApiResponce());
  // };
  const handleSubmit = () => {
    setLoader(true);
    let submitData = {
      userName: userFormData?.userName ?? "",
      name: userFormData?.name ?? "",
      email: userFormData?.email ?? "",
      contact: userFormData?.contact ?? 0,
    };
    console.log(userFormData);
  };

  useEffect(() => {
    if (action == "edit") {
      const editFormaData = {
        userName: recordObj?.userName ?? "",
        name: recordObj?.name ?? "",
        email: recordObj?.email ?? "",
        contact: recordObj?.contact ?? 0,
      };

      recordObj?.currentAvailability
        ? setStatus("Available")
        : setStatus("Unavailable");
      setUserFormData(editFormaData);
    }
  }, [recordObj]);

  const test = () => {
    // LoadData();
  };
  return <></>;
}

const AddEditComponent = () => {
  return (
    <>
      {/* Card1({ children={<><AddEditUserForm/></>}, title:"Edit Record" }) */}
      <Card1 children={<AddEditUserForm />} title={"Edit Record"} />

      {/* {Card1({ children:<AddEditUserForm />, title={"Edit Record"}})} */}
    </>
  );
};

export default AddEditComponent;
