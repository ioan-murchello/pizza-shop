import { Link } from 'react-router-dom';

function EmptyCart() {
  return (
    <div>
      <Link className='text-blue-500 hover:text-blue-400' to="/menu">&larr; Back to menu</Link>

      <p>Your cart is still empty.It nothing to ordering. Start adding some pizzas 🍕</p>
    </div>
  );
}

export default EmptyCart;
