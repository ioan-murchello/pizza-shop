import { useState } from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "../../utils/helpers";

function CreateUser() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if(!username) return 
    dispatch(updateName(username))
    setLocalStorage('name', username)
    navigate('/menu')
  }

  return (
    <form className="flex flex-col justify-center items-center gap-y-4" onSubmit={handleSubmit}>
      <p>👋 Welcome! Please start by telling us your name:</p>

      <input
        className="input"
        type="text"
        placeholder="Your full name"
        defaultValue={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== "" && (
        <div>
          <Button type='primary'>Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
