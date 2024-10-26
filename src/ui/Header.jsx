import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

const Header = () => {
  return (
    <header className="border-b border-stone-200 bg-yellow-400 p-4 uppercase">
      <div className="flex gap-y-3 justify-between">
        <Link className="tracking-widest" to="/">
          Fast React Pizza Co.
        </Link>
        <SearchOrder />
        <UserName />
      </div>
    </header>
  );
};
export default Header;
