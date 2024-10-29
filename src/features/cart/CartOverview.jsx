import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getTotalPrice, getTotalQuantity } from "./cartSlice";

function CartOverview() {
  const { pathname } = useLocation();
  const totalQuantity = useSelector((store) => getTotalQuantity(store));
  const totalPrice = useSelector((store) => getTotalPrice(store));

  if (!totalQuantity) return;

  return (
    <div className="w-full bg-stone-600 p-8 text-center">
      <div className="flex max-w-[1550px] justify-between gap-y-4 text-white mx-auto">
        <p>
          <span>
            {totalQuantity} {totalQuantity > 1 ? "pizzas" : "pizza"}
          </span>
          <span> ${totalPrice}</span>
        </p>
        {pathname !== "/cart" && <Link to="/cart">Open cart &rarr;</Link>}
      </div>
    </div>
  );
}

export default CartOverview;
