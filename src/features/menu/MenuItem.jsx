import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, deleteItem, getCurrentQuantityById } from "../cart/cartSlice"; 
import UpdateQuantity from "../cart/UpdateQuantity";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id:pizzaId, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));
  const isInCart = currentQuantity > 0;

  const handleAddcart = () => {
    const newItem = {
      pizzaId,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem)); 
  };

  return (
    <li className="flex grow gap-4 py-5">
      <img
        className={`h-24 -rotate-3 rounded-md border shadow-lg shadow-slate-800 ${soldOut ? "opacity-75 grayscale" : ""}`}
        src={imageUrl}
        alt={name}
      />
      <div className="flex grow flex-col">
        <h2 className="inline-block self-start border-b-4 border-yellow-400 px-1 text-2xl text-slate-900">
          {name}
        </h2>
        <p className="italic">{ingredients.join(", ")}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {isInCart && (
            <div className="flex items-center gap-x-6">
              <UpdateQuantity pizzaId={pizzaId} curQuantity={currentQuantity} />

              <Button
                type="small"
                onClick={() => dispatch(deleteItem(pizzaId))}
              >
                Delete
              </Button>
            </div>
          )}
          {!soldOut && !isInCart && (
            <Button onClick={handleAddcart} type="small">
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
