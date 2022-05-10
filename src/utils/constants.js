export const oneDayInSeconds = 86400;

//calculate the current date in seconds
export const calcCurrentDateInSeconds = () => {
  return Date.now() / 1000;
};

//function to convert seconds to days
const convertSecondsToDays = (seconds) => {
  return seconds / oneDayInSeconds;
};

export const getDaysSinceLastTransaction = (item) => {
  let secondsSinceLastTransaction;
  //check if the item has a lastPurchased value, if not use when the item was added instead.
  if (item.lastPurchased) {
    secondsSinceLastTransaction =
      calcCurrentDateInSeconds() - item.lastPurchased.seconds;
  } else {
    return item.timeframe;
  }

  return convertSecondsToDays(secondsSinceLastTransaction);
};
