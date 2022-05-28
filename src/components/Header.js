const Header = ({ title, imageSrc, isHome }) => {
  let headerStyles;
  let titleStyles;
  if (isHome) {
    headerStyles = 'bg-yellow-400 w-full text-center relative h-32';
    titleStyles = 'font-bold text-2xl mx-auto mt-4 w-full lg:w-1/2 ';
  } else {
    headerStyles = 'bg-yellow-400 w-full flex justify-center';
    titleStyles = 'font-bold text-2xl mt-4 mr-4 pl-2 sm:pl-0';
  }

  return (
    <header className={headerStyles}>
      <h1 className={titleStyles}>{title}</h1>
      <img
        className={
          isHome
            ? 'absolute inset-x-1/2 -translate-x-1/2 -bottom-38 2xl:-bottom-24'
            : ''
        }
        src={imageSrc}
        alt="bag-brand"
      />
    </header>
  );
};

export default Header;
