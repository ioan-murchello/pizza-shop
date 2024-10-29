import { useEffect, useState } from "react";
import { getLocalStorage } from "../../utils/helpers";

const UserName = () => {
  const [name, setName] = useState(null);
  useEffect(() => {
    const getLocalName = getLocalStorage("user");
    if (getLocalName) {
      setName(getLocalName);
    }
  }, [name]);
  return (
    <div className="p-2 text-center text-sm font-semibold">
      {" "}
      Welcome{" "}
      <span className="border-b px-1 pb-1 text-sm font-semibold">
        {/* {userName && `${userName}!`} */}
        {name && `${name}!`}
      </span>
    </div>
  );
};
export default UserName;
