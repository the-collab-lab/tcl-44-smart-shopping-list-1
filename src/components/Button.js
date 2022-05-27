const Button = ({ text, disabled, createToken, width }) => {
  return (
    <button
      className={`${width} bg-yellow-400 text-black text-md font-semibold uppercase px-4 py-2.5 rounded-full font-button hover:bg-transparent outline outline-yellow-400 hover:outline-yellow-400 focus:outline-4 disabled:opacity-30`}
      disabled={disabled}
      onClick={() => (createToken ? createToken() : null)}
    >
      {text}
    </button>
  );
};

export default Button;
