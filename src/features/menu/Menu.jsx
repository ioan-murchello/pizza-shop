import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from './MenuItem'

export async function loader() {
  const menu = await getMenu()
  return menu
}

function Menu() {
  const menu = useLoaderData()  
  return (
    <ul className="divide-y divide-stone-300">
      {menu.map((pizza) => {
        return <MenuItem pizza={pizza} key={pizza.id} />;
      })}
    </ul>
  );
}

export default Menu;
