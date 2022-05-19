const Button = ({ text, disabled, createToken, width }) => {
  return (
    <button
      className={`${width} bg-yellow-400 text-black text-sm font-semibold uppercase px-4 py-4 rounded-full font-button hover:bg-transparent outline outline-yellow-400 hover:outline-yellow-400 focus:outline-4`}
      disabled={disabled}
      onClick={() => createToken()}
    >
      {text}
    </button>
  );
};

export default Button;
