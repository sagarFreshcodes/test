import { toast } from "react-toastify";
import * as ReactIcons from "react-icons/ai";

export const ToastError = (error) => {
  error?.response?.data?.message?.query || error?.response?.data?.message?.level
    ? toast.error(error?.message)
    : error?.response?.data?.message
    ? toast.error(error?.response?.data?.message)
    : error?.message
    ? toast.error(error?.message)
    : error
    ? toast.error(error)
    : toast.error("Server Error");
  return null;
};

export const ToastSuccess = (response) => {
  response?.data?.data?.message
    ? toast.success(response?.data?.message)
    : response?.data?.message
    ? toast.success(response?.data?.message)
    : response?.message
    ? toast.success(response?.message)
    : response?.message
    ? toast.success(response?.message)
    : toast.success("Api call successfuly");

  return null;
};

export const ToastWarning = (warning) => {
  warning?.response?.data?.message.query ||
  warning?.response?.data?.message?.level
    ? toast.warning(warning?.message)
    : warning?.response?.data?.message
    ? toast.warning(warning?.response?.data?.message)
    : warning?.message
    ? toast.warning(warning?.message)
    : warning
    ? toast.warning(warning)
    : toast.warning("Something going wrong");
  return null;
};

export function IsAlphabetOrNumber(character) {
  return /[a-zA-Z0-9]/.test(character);
}

export function CollectValuesByKey(array) {
  let result = [];

  // Iterate over each object in the array
  array.forEach((obj) => {
    // Iterate over each key in the object
    Object.keys(obj).forEach((key) => {
      // Check if the title already exists in the result array
      let existingTitleIndex = result.findIndex((item) => item.title === key);
      if (existingTitleIndex === -1) {
        // If the title doesn't exist, add it with the current value as an array
        result.push({ title: key, valueList: [obj[key]] });
      } else {
        // If the title already exists, push the current value to its array
        result[existingTitleIndex].valueList.push(obj[key]);
      }
    });
  });

  return result;
}
export function RemoveDuplicates(array) {
  return Array.from(new Set(array));
}

export function ConvertAndRemoveDuplicates(array) {
  let convertedArray = array.map((value) =>
    value ? "Available" : "Unavailable"
  );
  return Array.from(new Set(convertedArray));
}

 

export const CheckValidValue = (value, defaultValue, notCheck) => {
  if (["null", null, undefined, "undefined", ""].includes(value)) {
    return defaultValue ? defaultValue : false;
  } else {
    return notCheck ? value : true;
  }
};

 

export const ReactIcon = ({ iconName, attr }) => {
  const Icon = iconName ? ReactIcons[iconName] : ReactIcons[`AiOutlineSmile`];
  return <Icon {...attr} />;
};
 
export const TableData = [
  {
    id: "id125",
    name: "sagar",
    phoneNumber: "7698458855",
    discription: "discription",
    date: "-",
    email: "email@fd.com",
    image: "",
  },
  {
    id: "id125",
    name: "ewevxvxd",
    phoneNumber: "33333333333",
    discription: "discrigfdgdfption",
    date: "-",
    email: "email@fdggdf.com", 
    image: "",
  },
  {
    id: "id12335",
    name: "ewevxd",
    phoneNumber: "336333333",
    discription: "dffdfds",
    date: "-",
    email: "email@fdggdf2.com", 
    image: "",
  },
  {
    id: "id1222335",
    name: "ewevxd",
    phoneNumber: "333333",
    discription: "dffdwefds",
    date: "-",
    email: "email@fdggdf2.com", 
    image: "",
  },
  {
    id: "id1263435",
    name: "ewevxd",
    phoneNumber: "3333",
    discription: "d3dfds",
    date: "-",
    email: "email@fdggdf2.com", 
    image: "",
  },
  {
    id: "id12335",
    name: "ewevxd",
    phoneNumber: "336333333",
    discription: "dffdfds",
    date: "-",
    email: "email@fdggdf2.com", 
    image: "",
  },
];

export function generateUniqueIdUsingDate() {
  return Date.now().toString();
}
export const ImgURL = (file) => {
  try {
    const imageUrl = URL.createObjectURL(file);
    return imageUrl;
  } catch (error) {
    return false;
  }
};
