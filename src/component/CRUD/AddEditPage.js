import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import Card1 from "../Common/Helper/designHelper";
import { StoreRecordResponce } from "../../reduxStore/Action/recordAction";
import {
  ImgURL,
  ToastError,
  ToastSuccess,
  generateUniqueIdUsingDate,
} from "../Common/Helper/functionHeleper";

const initialValues = {
  firstName: "",
  lastName: "",
  name: "",
  email: "",
  phoneNumber: "",
  discription: "",
};

const AddEditUserForm = ({ recordData }) => {
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    discription: "",
    profileImage: "",
  });
  const uniqId = generateUniqueIdUsingDate();
  const RecordState = useSelector((state) => state);
  const recordObj = RecordState?.recordData?.editRecordData;
  const allRecords = RecordState?.recordData?.userListResponse;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const Navigation = (data) => {
    navigate(data);
  };

  const validate = (values) => {
    const errors = {};
    const allowedChars = /^[a-zA-Z0-9&@<>\-_]+$/;
    if (!values.name) {
      errors.name = "Name Required ";
    }
    if (!/^[a-zA-Z0-9\s]+$/.test(values.name)) {
      errors.name = "Only alphabets, numbers, and spaces are allowed.";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone Number Required";
    }
    if (!/^\d{10}$/.test(values.phoneNumber)) {
      errors.phoneNumber = "Phone number must be a 10-digit number.";
    }
    if (!values.discription) {
      errors.discription = "Description Required";
    }
    if (!allowedChars.test(values.discription)) {
      errors.discription =
        "Only alphabets, numbers, &, @, <, >, and _ characters are allowed.";
    }

    if (!values.email) {
      errors.email = "Email Is Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    return errors;
  };
  const IsEdit = location.pathname.includes("edit");
  const onHandleChange = ({ target }) => {
    const { name, value, files } = target||{files:{}}
    console.log("onHandleChange profileImage21456", name, value);
    if (name !== "profileImage") {
      setUserFormData({ ...userFormData, [name]: value });
      formik.setFieldValue([name], value);
      console.log("!!profileImage21456",name, value);
    } else { 
      const ImageData = files[0];
      const imageType = ImageData?.type
      console.log("profileImage21456 imageType",imageType.includes("jpg" || "png" || "JPG" || "PNG"));
      console.log("profileImage21456 dize",ImageData.size >= 104);
      if (ImageData.size <= 1048576 ) {  
          setUserFormData({ ...userFormData, [name]: files[0] });
          console.log(name, files[0]);
          console.log("rightUrl", files[0]); 
      }else{
        alert("File size should be less then 1048576 bytes");
      }  
    }
  };

  useEffect(() => {
    if (IsEdit) {
      const editFormaData = { 
        name: recordObj?.name ?? "",
        email: recordObj?.email ?? "",
        phoneNumber: recordObj?.phoneNumber ?? 0,
        id: recordObj?.id ?? "",
        discription: recordObj?.discription ?? "",
        date: recordObj?.date ?? "", 
      };
      console.log("editFormaData", editFormaData);
      setUserFormData(editFormaData);
      Object.keys(editFormaData).forEach((i) => {
        formik.setFieldValue(i, editFormaData[i]);
      });
    }
  }, [recordObj]);

  const test = () => { 
    console.log("recordObj", recordObj);
    console.log("userFormData", userFormData);
    console.log("formik.errors", formik.errors);
  };

  const handleSubmit = () => {
    try {
      if (IsEdit) {
        allRecords.forEach((i, index) => {
          if (i.id == userFormData.id) {
            console.log("handleSubmit", i);
            const updatedItems = [...allRecords];
            // Update the element at the specified index with the new value
            updatedItems[index] = userFormData;
            dispatch(StoreRecordResponce(updatedItems));
            ToastSuccess("Update record successfully");
            Navigation("/");
          } else {
            console.log("no match", i);
          }
        });
      } else {
        const updatedItems = [{ id: uniqId, ...userFormData }, ...allRecords];
        console.log(updatedItems); 
        dispatch(StoreRecordResponce(updatedItems)); 
        ToastError("Add record successfully");
        Navigation("/");
       
      }
    } catch (error) {
      console.log("wrong", error);
      console.log("allRecords", allRecords);
    }
  };

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values) => {
      handleSubmit();
      console.log("okkk", formik.errors);
    },
  });

  const FildInfo = [
    {
      title: "Name",
      field: "name",
      type: "text",
      placeholder: "Enter Name",
    },
    {
      title: "Email",
      field: "email",
      type: "email",
      placeholder: "Enter  Email Id",
    },

    {
      title: "phone Number",
      field: "phoneNumber",
      type: "number",
      placeholder: "Enter Phone Number",
    },
    {
      title: "discription",
      field: "discription",
      type: "text",
      placeholder: "Enter Discription",
    },
    {
      title: "date",
      field: "date",
      type: "date",
      placeholder: "Enter Date",
    },
    {
      title: "Profile Image",
      field: "profileImage",
      type: "file",
      placeholder: "Enter Profile Image",
    },
  ];
  return (
    <div className="row"  >  
      <div className="col-lg-6 col-sm-12">
        {" "}
        <form onSubmit={formik.handleSubmit}>
          {FildInfo.map((i, index) => {
            return (
              <>
                <div key={index}>
                  <label for={i.field} class="form-label">
                    {i.title}
                  </label>
                  <input
                    class="form-control"
                    list="datalistOptions"
                    id={i.field}
                    name={i.field}
                    type={i.type}
                    onChange={onHandleChange}
                    value={
                      i == "profileImage"
                        ? userFormData[i.field]
                        : formik.values[i.field]
                    }
                    placeholder={i.placeholder}
                  ></input>

                  {formik.errors[i.field] && (
                    <div className="text-danger">{formik.errors[i.field]}</div>
                  )}
                </div>
                <br />
              </>
            );
          })}

          <button className="btn btn-success" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const AddEditComponent = () => {
  const location = useLocation();
  const IsEdit = location.pathname.includes("edit");
  return (
    <>
      <Card1
        children={<AddEditUserForm IsEdit={IsEdit} />}
        title={IsEdit ? "Edit Record" : "Add Record"}
      />
    </>
  );
};

export default AddEditComponent;


 
