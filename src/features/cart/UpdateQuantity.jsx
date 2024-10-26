import { useDispatch } from "react-redux"
import Button from "../../ui/Button"
import { decreaseItem, increaseItem } from "./cartSlice"

const UpdateQuantity = ({pizzaId, curQuantity}) => {
 
    const dispatch = useDispatch()
  return (
    <div className="flex items-center gap-x-2">
      <Button type="small" onClick={() => dispatch(decreaseItem(pizzaId))}>
        -
      </Button> 
      <span>{curQuantity}</span>
      <Button type="small" onClick={() => dispatch(increaseItem(pizzaId))}>
        +
      </Button>
    </div>
  );
}
export default UpdateQuantity