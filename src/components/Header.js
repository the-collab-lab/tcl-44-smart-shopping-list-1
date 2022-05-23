const Header = ({ title, imageSrc }) => {
  return (
    <header>
      <h1>{title}</h1>
      <img src={imageSrc} alt="bag-brand" />
    </header>
  );
};

export default Header;
