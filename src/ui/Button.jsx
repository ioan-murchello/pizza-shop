import { Link } from "react-router-dom";

const Button = ({ children, disabled, to, type, onClick }) => {
  const base =
    "inline-block bg-yellow-400 p-2 font-semibold uppercase tracking-wide transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";

    const styles = {
      primary: base + " px-4 py-3 md:px-6 md:py-4",
      small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
      secondary:
        "inline-block p-2 border-2 border-stone-300 font-semibold uppercase tracking-wide transition-colors duration-300 hover:bg-stone-500 hover:text-yellow-400 focus:outline-none focus:ring focus:ring-stone-500 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5",
    };
 
  if (to) {
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  }

  if(onClick){
    return (
    <button onClick={onClick} className={styles[type]} disabled={disabled}>
      {" "}
      {children}
    </button>
  );
  }

  return (
    <button className={styles[type]} disabled={disabled}>
      {" "}
      {children}
    </button>
  );
};
export default Button;
