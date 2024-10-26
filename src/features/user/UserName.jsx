import { useSelector } from "react-redux";

const UserName = () => {
  const { userName } = useSelector((state) => state.user);

  return (
    <div className="p-2 font-semibold text-sm text-center"> Welcome {' '}
      <span className="border-b px-1 pb-1 text-sm font-semibold">
          {userName && userName}!
      </span>
    </div>
  );
};
export default UserName;
