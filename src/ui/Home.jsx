import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const {userName} = useSelector(store => store.user)
  return (
    <div className="text-center">
      <h1 className="mb-8 text-center text-xl font-semibold">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {!userName ? <CreateUser /> : <Button type='primary' to='/menu'>to menu</Button>}
    </div>
  );
}

export default Home;
