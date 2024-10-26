import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { deleteItem, getCurrentQuantityById } from "./cartSlice";
import UpdateQuantity from "./UpdateQuantity";

function CartItem({ item }) {
  const dispatch = useDispatch();

  const { pizzaId, name, quantity, unitPrice, totalPrice } = item;

  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className="flex grow list-none items-center justify-between py-5">
      <p className="text-xl font-bold">
        {quantity}&times; {name}
      </p>
      <p className="bg-yellow-200 px-2"> ${unitPrice}</p>
      <div className="flex items-center justify-between gap-x-20 self-end">
        <p>{formatCurrency(totalPrice)}</p>
        <UpdateQuantity pizzaId={pizzaId} curQuantity={currentQuantity} />
        <Button
          type="small"
          className="ml-auto"
          onClick={() => dispatch(deleteItem(pizzaId))}
        >
          Delete
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
