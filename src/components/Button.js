const Button = ({ text, disabled }) => {
  return (
    <button
      className="bg-yellow-400 text-black font-semibold uppercase px-2 py-2  min-w-1/2 rounded-full font-Roboto"
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
