const Header = ({ title, imageSrc }) => {
  return (
    <header className="bg-yellow-400 w-full flex justify-center">
      <h1 className="font-bold text-lg mt-4 mr-4">{title}</h1>
      <img src={imageSrc} alt="bag-brand" />
    </header>
  );
};

export default Header;
