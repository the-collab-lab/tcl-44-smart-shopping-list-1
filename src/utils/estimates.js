import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

export const getEtimatedNextPurchaseDay = (item) => {
  //function to convert seconds to days
  const convertSecondsToDays = (seconds) => {
    return seconds / 86400;
  };
  //calculate the current date in seconds
  const CalcCurrentDateInSeconds = () => {
    return Date.now() / 1000;
  };

  //calculate how many days has passed since last purchased, or
  const getDaysSinceLastTransaction = () => {
    let secondsSinceLastTransaction;
    //check if the item has a lastPurchased value, if not use when the item was added instead.
    if (item.lastPurchased) {
      secondsSinceLastTransaction =
        CalcCurrentDateInSeconds() - item.lastPurchased.seconds;
    } else {
      return item.timeframe;
    }

    return convertSecondsToDays(secondsSinceLastTransaction);
  };

  // this the last estimated purchase time that has been calculated before
  const previousEstimate = item.timeframe;
  // how many times this item have been purchased
  const totalPurchases = item.totalPurchases;
  // how many days has passed after the last purchase
  const daysSinceLastTransaction = getDaysSinceLastTransaction();

  // pass these arguments to calculate the estimated next purchase in days
  const estimatedDays = Math.floor(
    calculateEstimate(
      previousEstimate,
      daysSinceLastTransaction,
      totalPurchases,
    ),
  );
  return estimatedDays;
};
