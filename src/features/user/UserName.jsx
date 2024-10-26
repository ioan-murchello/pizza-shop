import { useSelector } from "react-redux";

const UserName = () => {
  const { userName } = useSelector((state) => state.user);

  return (
    <div className="inline-block self-start border-b px-1 pb-1 text-sm font-semibold">
      Welcome {userName && userName}!
    </div>
  );
};
export default UserName;
