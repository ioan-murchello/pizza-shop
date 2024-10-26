// Test ID: IIDSAT
import OrderItem from "./OrderItem";

import { useFetcher, useLoaderData } from "react-router-dom";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { getOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useEffect } from "react";

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

//   id: "ABCDEF",
//   customer: "Jonas",
//   phone: "123456789",
//   address: "Arroios, Lisbon , Portugal",
//   priority: true,
//   estimatedDelivery: "2027-04-25T10:00:00",
//   cart: [
//     {
//       pizzaId: 7,
//       name: "Napoli",
//       quantity: 3,
//       unitPrice: 16,
//       totalPrice: 48,
//     },
//     {
//       pizzaId: 5,
//       name: "Diavola",
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//     },
//     {
//       pizzaId: 3,
//       name: "Romana",
//       quantity: 1,
//       unitPrice: 15,
//       totalPrice: 15,
//     },
//   ],
//   position: "-9.000,38.000",
//   orderPrice: 95,
//   priorityPrice: 19,
// };

function Order() {
  const fetcher = useFetcher();

  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") {
      fetcher.load("/menu");
    }
  }, [fetcher]);
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-col gap-y-3">
        <h2 className="text-xl">Order # {id}</h2>

        {priority && <span className="self-start bg-yellow-400">Priority</span>}
        <div className="flex gap-x-5">
          <div className="border-b-2 border-green-400"> {status} order</div>
        </div>
      </div>

      <div className="flex justify-between bg-stone-400 p-3 text-white">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <div>
        <div className="mt-4 flex flex-col">
          {cart.map((el) => {
            return (
              <OrderItem
                item={el}
                className="mb-2 self-start border-b-2 border-yellow-400"
                key={el.pizzaId}
                isLoadingIngredients={fetcher.state === "loading"}
                ingredients={
                  fetcher?.data?.find((item) => item.id === el.pizzaId)
                    ?.ingredients ?? []
                }
              ></OrderItem>
            );
          })}
        </div>
        <div className="bg-yellow-400 p-3">
          <p>Price pizza: {formatCurrency(orderPrice)}</p>
          {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
          <p className="font-bold">
            To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
          </p>
        </div>
      </div>

      <Button to="/menu" type="primary">
        to menu
      </Button>
    </div>
  );
}

export default Order;
