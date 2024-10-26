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
    <li className="flex grow list-none gap-y-4  items-center sm:justify-between justify-center md:flex-row flex-col py-5">
      <p className="text-xl font-bold">
        {quantity}&times; {name}
      </p>
      <p className="bg-yellow-200 px-2"> ${unitPrice}</p>
      <div className="flex flex-row items-center justify-between sm:gap-x-20 gap-x-4 md:self-end self-center gap-y-4">
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
