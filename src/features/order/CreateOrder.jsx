import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../cart/EmptyCart";
import { clearCart, getTotalPrice } from "../cart/cartSlice";
import store from "../../store";
import { useState } from "react";
import { fetchAdress } from "../user/userSlice";

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

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your corecct phone number. We might need it to contact you.";
  if (Object.keys(errors).length > 0) return errors;

  const createNewOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${createNewOrder.id}`);
}

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const formErrors = useActionData();
  const dispatch = useDispatch();

  const isSubmitting = navigation.state === "submitting";

  const {
    userName,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((store) => store.user);
  const isLoadingAddress = addressStatus === "loading";
  const { cart } = useSelector((store) => store.cart);
  const totalCartPrice = useSelector((store) => getTotalPrice(store));
  const priorityPrice = withPriority ? Math.floor(totalCartPrice * 0.2) : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="flex flex-col items-center justify-center gap-x-4 gap-y-4">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      <Form className="flex w-full flex-col gap-x-3 gap-y-4 p-5" method="POST">
        <div className="mb-5 flex flex-col items-center gap-2 sm:flex-row">
          <label className="min-w-32">First name</label>
          <input
            className="w-full rounded-md border-2 p-2"
            type="text"
            name="customer"
            defaultValue={userName ? userName : ""}
            required
          />
        </div>

        <div className="mb-5 flex flex-col items-center gap-2 sm:flex-row">
          <label className="min-w-32">Phone number</label>
          <input
            className="w-full rounded-md border-2 p-2"
            type="tel"
            name="phone"
            required
          />
        </div>

        <div className="relative mb-5 flex w-full flex-col items-center gap-2 sm:flex-row">
          <label className="min-w-32">Address</label>
          <div className="flex sm:flex-row flex-col items-center w-full relative">
            <input
              className="sm:grow w-full rounded-md border-2 p-2"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {!address && (
              <span className=" ">
                <Button
                  disabled={isLoadingAddress}
                  type="small"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAdress());
                  }}
                >
                  My Position
                </Button>
              </span>
            )}
          </div>
        </div>
        {errorAddress && (
          <span className="relative right-0 top-[-25px] inline-block self-end bg-rose-200 px-2 text-right">
            {errorAddress}
          </span>
        )}
        {formErrors?.phone && (
          <p className="mt-2 rounded-full bg-red-100 p-2 text-xs text-red-600">
            {formErrors.phone}
          </p>
        )}

        <div className="mb-4 flex items-center gap-x-2">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="w- h-6 cursor-pointer accent-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="cursor-pointer" htmlFor="priority">
            Want to yo give your order priority? {withPriority && totalPrice}
          </label>
        </div>
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
          <Button type="small" disabled={isSubmitting}>
            {isSubmitting ? "Placing order..." : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
