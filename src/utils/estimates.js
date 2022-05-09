import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';
import { oneDayInSeconds, calcCurrentDateInSeconds } from './constants';
export const estimate = (item) => {
  //function to convert seconds to days
  const convertSecondsToDays = (seconds) => {
    return seconds / oneDayInSeconds;
  };

  //function to help calculate how many days has passed since last purchased.
  const getDaysSinceLastTransaction = () => {
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

  // previous estimated purchase time that has been calculated before
  const previousEstimate = item.timeframe;
  // how many times this item have been purchased
  const totalPurchases = item.totalPurchases;
  // how many days has passed after the last purchase
  const daysSinceLastTransaction = getDaysSinceLastTransaction();

  // pass these arguments to calculate the estimated next purchase in days

  return Math.floor(
    calculateEstimate(
      previousEstimate,
      daysSinceLastTransaction,
      totalPurchases,
    ),
  );
};
