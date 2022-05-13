import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';
import { getDaysSinceLastTransaction } from './dateHelpers';

export const estimate = (item) => {
  // previous estimated purchase time that has been calculated before
  const previousEstimate = item.timeframe;
  // how many times this item have been purchased
  const totalPurchases = item.totalPurchases;
  // how many days has passed after the last purchase
  const daysSinceLastTransaction = getDaysSinceLastTransaction(item);

  // pass these arguments to calculate the estimated next purchase in days

  return Math.floor(
    calculateEstimate(
      previousEstimate,
      daysSinceLastTransaction,
      totalPurchases,
    ),
  );
};
