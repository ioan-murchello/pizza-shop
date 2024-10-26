import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./cartSlice";
// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  const { userName } = useSelector((store) => store.user);
  const { cart } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <Link className="text-blue-500 hover:text-blue-600" to="/menu">
        &larr; Back to menu
      </Link>

      {cart.length > 0 && <h2>Your cart, {userName}</h2>}

      {cart.map((cart) => (
        <CartItem item={cart} key={cart.pizzaId} />
      ))}

      {cart.length > 0 ? (
        <div className="flex gap-3">
          <Button type="primary" to="/order/new">
            Order pizzas
          </Button>
          <Button type="secondary" onClick={() => dispatch(clearCart())}>
            Clear cart
          </Button>
        </div>
      ) : <p className="text-xl">Your cart is still empty. Start adding some pizzas 🍕</p>}
    </div>
  );
}

export default Cart;
