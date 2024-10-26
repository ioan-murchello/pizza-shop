import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, ingredients, isLoadingIngredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="list-none py-3">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-bold">
            {quantity}&times; {name}
          </span>
          <span>
            {isLoadingIngredients ? "loading..." : ingredients.join(", ")}
          </span>
        </div>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
