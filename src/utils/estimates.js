import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

export const etimatedTime = (item) => {
  // this the last estimated purchase time that has been calculated before
  const previousEstimate = item.timeframe;
  // how many times this item have been purchased
  const totalPurchases = item.totalPurchases;

  //function to convert seconds to days
  const convertSecondsToDays = (seconds) => {
    return seconds / 86400;
  };
  //calculate the current date in seconds
  const CalcCurrentDateInSeconds = () => {
    return Date.now() / 1000;
  };

  //calculmate how many days has passed since the item was added to the list or last purchased
  const calcDaysSinceLastTransaction = () => {
    let secondsSinceLastTransaction;
    //check if the item has a lastPurchased value, if not use when the item was added instead.
    if (item.lastPurchased) {
      secondsSinceLastTransaction =
        CalcCurrentDateInSeconds() - item.lastPurchased.seconds;
    } else {
      secondsSinceLastTransaction =
        CalcCurrentDateInSeconds() - item.createdAt.seconds;
    }

    return convertSecondsToDays(secondsSinceLastTransaction);
  };
  const daysSinceLastTransaction = calcDaysSinceLastTransaction();

  // pass these arguments to calculate the estimated next purchase
  const estimatedDays = Math.floor(
    calculateEstimate(
      previousEstimate,
      daysSinceLastTransaction,
      totalPurchases,
    ),
  );
  return estimatedDays;
};
