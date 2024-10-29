import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchOrder = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  };

  return (
    <form className="w-full text-center sm:w-96" onSubmit={handleSubmit}>
      <input
        className="rounded-full bg-stone-200 px-4 py-2 text-sm outline-yellow-500 transition-all duration-300 placeholder:text-stone-500"
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};
export default SearchOrder;
