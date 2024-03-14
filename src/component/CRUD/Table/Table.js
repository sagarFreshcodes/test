import React, { useEffect, useState } from "react";
import AutoComplatete from "./autoComplatete";
import CommonModel from "../../Common/CommanModel/CommonModel";
import { Link, useNavigate } from "react-router-dom";
import AddEditUserForm from "./addEditUser";
import {
  ImgURL,
  ReactIcon,
  ToastError,
} from "../../Common/Helper/functionHeleper";
import { useDispatch, useSelector } from "react-redux";
import {
  StoreEditRecordData,
  StoreRecordResponce,
} from "../../../reduxStore/Action/recordAction";
import { CommonButtom } from "../../Common/Helper/designHelper";

const ColumnHeader = [
  { title: "Id", key: "id" },
  { title: "Name", key: "name" },
  { title: "Phone Number", key: "phoneNumber" },
  { title: "Discription", key: "discription" },
  { title: "Date", key: "date" },
  { title: "Profile Image", key: "image" },
  { title: "Action", key: "action" },
];

const IconArray = [
  //   {
  //     icon: "AiFillEye",
  //     href: "/doctors/book-details",
  //     type: "view",
  //   },
  {
    icon: "AiFillEdit",
    href: "/doctors/book-edit",
    type: "edit",
  },
  {
    icon: "AiFillDelete",
    href: "/about",
    type: "delete",
  },
];

const Table = ({ AllPropes }) => {
  const navigate = useNavigate();
  const Navigation = (data) => {
    navigate(data);
  };

  const RecordState = useSelector((state) => state);
  const TableData = RecordState?.recordData?.userListResponse;
  const [tableData, setTableData] = useState(TableData);
  const [recordData, setRecordData] = useState({});
  const [modelOpen, setModelOpen] = useState(false);
  const [filters, setFilters] = useState({
    id: "",
    name: "",
    phoneNumber: "",
    discription: "",
    date: "",
  });

  const dispatch = useDispatch();
  const autoComplateFunction = (value, columnID, e) => {
    console.log("go11 autoComplateFunctionvalue1", value, columnID, e);
    setFilters({ ...filters, [columnID]: value });
  };
  const IsAllChacked = tableData.every((i, index) => i?.isChacked === true);

  const OnhandleCheckBox = ({ target }) => {
    const { checked, id } = target;
    if (id == "#") {
      if (IsAllChacked) {
        const tempData = tableData.map((i, index) => {
          return { ...i, isChacked: false };
        });
        setTableData(tempData);
      } else {
        const tempData = tableData.map((i, index) => {
          return { ...i, isChacked: true };
        });
        setTableData(tempData);
      }
    } else {
      const tempData = tableData.map((i, index) => {
        return index + 1 == id ? { ...i, isChacked: checked } : { ...i };
      });
      setTableData(tempData);
    }
  };

  useEffect(() => {
    setTableData([]);

    let filterKeyWords = [
      { id: filters?.id || "" },
      { name: filters?.name || "" },
      { phoneNumber: filters?.phoneNumber || "" },
      { discription: filters?.discription || "" },
      { date: filters?.date || "" },
    ];

    function filterObjectsByKeywords(objectArray, filterKeywords) {
      console.log(objectArray, filterKeywords);
      return objectArray.filter((object) => {
        for (let filterObj of filterKeywords) {
          const field = Object.keys(filterObj)[0];
          const keyword = filterObj[field];

          if (
            !String(object[field]).toLowerCase().includes(keyword.toLowerCase())
          ) {
            return false;
          }
        }
        return true;
      });
    }

    // Filter objects based on keywords
    const filteredObjects = filterObjectsByKeywords(TableData, filterKeyWords);

    // Output the filtered objects
    setTableData(filteredObjects);
  }, [filters]);

  const Toogle = (value) => {
    value ? setModelOpen(value) : setModelOpen(!modelOpen);
  };
  const onSubmit = () => {};
  useEffect(() => {
    setTableData(TableData);
  }, [TableData]);

  const OnButtonClick = (recorData, actionData) => {
    console.log("actionData", actionData);

    switch (actionData.type) {
      case "edit":
        dispatch(StoreEditRecordData(recorData));
        Navigation("/edit");
        break;
      case "delete":
        setModelOpen(true);
        setRecordData({
          action: "delete",
          modelTitle: "Delete User Details",
          message: `Are you want to delete record of ${
            recorData?.userName ?? "User"
          }`,
          recordObj: recorData,
        });
        break;
      case "add":
        setRecordData({
          action: "add",
          modelTitle: "Add New User",
        });
        Navigation("/add");
        break;
      default:
        break;
    }
  };

  const test = () => {
    console.log("RecordState", RecordState);
  };

  const ModelBody = ({ data }) => {
    const onClick = () => {
      const selectedId = recordData?.recordObj?.id;
      if (selectedId) {
        const updatedItems = TableData.filter(
          (item, index) => item.id !== selectedId
        );
        dispatch(StoreRecordResponce(updatedItems));
        ToastError("Record delete successfully");
        setModelOpen(false);
      } else {
        ToastError("Record not exist");
      }

      console.log("ooooooooooo", recordData?.recordObj?.id);
    };
    return (
      <>
        <div>Are you sure to delete record</div>
        <br />
        <button className="btn btn-danger" onClick={onClick}>
          Submit
        </button>
      </>
    );
  };
  return (
    <>
      <div class="UserDataTable" onClick={test}>
        <div className="w-100 d-flex justify-content-start p-3">
          <CommonButtom
            attr={{
              onClick: () => {
                OnButtonClick({}, { type: "add" });
              },
            }}
            lable={"Add Record"}
          />
        </div>
        <table class="table">
          <thead>
            <tr>
             
              {ColumnHeader.map((i, index) => {
                return (
                  <>
                    <th scope="col">
                      <div>
                        <div>{i.title}</div>
                        <div className="headerFunctionComponent">
                          {!["action", "image"].includes(i.key) ? (
                            <>
                              <AutoComplatete
                                autoComplateFunction={autoComplateFunction}
                                options={extractKeyFromArray(tableData, [
                                  i.key,
                                ])}
                                columnID={i.key}
                                lable={i.title}
                              />
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </th>
                  </>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {tableData.map((i, index) => {
              return (
                <>
                  <tr key={index + 1}>
                    
                    <td>{i.id}</td>
                    <td>{i.name}</td>
                    <td>{i.phoneNumber}</td>
                    <td>{i.discription}</td>
                    <td onClick={() => console.log(i?.profileImage)}>
                      {i.date}
                    </td>
                    <td>
                      <div>
                        <img
                          src={
                            i?.profileImage?.name
                              ? URL.createObjectURL(i?.profileImage)
                              : ""
                          }
                          alt=""
                        />
                      </div>
                    </td>

                    <td>
                      <div>
                        <div className="cs_team cs_style_1 cs_type_2 text-center boxShadowNone cs_radius_20 overflow-hidden transperentBg">
                          <div className="cs_team_meta  transperentBg">
                            <div className="cs_social_links">
                              {IconArray?.map((item, index) => (
                                // item.type == "delete" ? (
                                <>
                                  <span
                                    key={index}
                                    onClick={() => {
                                      OnButtonClick(i, item);
                                    }}
                                  >
                                    {/* <Icon icon={item.icon} /> */}
                                    {ReactIcon({ iconName: item.icon })}
                                    <div class="i-material-symbols:add-shopping-cart w-1em h-1em"></div>
                                  </span>
                                </>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <CommonModel
        title={recordData?.modelTitle ?? "Action on user"}
        BodyComponent={<ModelBody data={`Are sure to delete ${`name`} Book`} />}
        show={modelOpen}
        onSubmit={onSubmit}
        toogle={() => Toogle()}
        noFooter={true}
      />
    </>
  );
};

export default Table;

function extractKeyFromArray(arr, key) {
  return arr.map((item) => item[key]);
}
