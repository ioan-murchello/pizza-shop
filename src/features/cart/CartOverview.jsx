import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getTotalPrice, getTotalQuantity } from "./cartSlice";

function CartOverview() {
  const {pathname} = useLocation()
  const totalQuantity = useSelector((store) => getTotalQuantity(store));
  const totalPrice = useSelector(store => getTotalPrice(store))

  if(!totalQuantity) return
  
  return (
    <div className="flex justify-between gap-y-4 bg-stone-600 p-8 text-white">
      <p>
        <span>{totalQuantity} {totalQuantity > 1 ? 'pizzas' : 'pizza'}</span>
        <span>{' '}${totalPrice}</span>
      </p>
      {pathname !== '/cart' && <Link to="/cart">Open cart &rarr;</Link>}
    </div>
  );
}

export default CartOverview;
