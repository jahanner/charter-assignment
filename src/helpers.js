export const calculateTotals = (moneySpent) => {
  const monthlyTotalSpent = {};
  let totalSpent = 0;
  for (const entry of moneySpent) {
    const month = entry.month;
    const amount = entry.amount;
    if (monthlyTotalSpent[month]) {
      monthlyTotalSpent[month] += amount;
    } else {
      monthlyTotalSpent[month] = amount;
    }
    totalSpent += amount;
  }

  return {
    monthlyTotalSpent: monthlyTotalSpent,
    totalSpent: totalSpent,
  };
};

export const calculateRewardsPoints = (purchases) => {
  const rewardsPoints = [];
  for (const month in purchases) {
    let purchase = purchases[month];
    let points = 0;
    if (purchase > 100) {
      const amountOver100 = purchase - 100;
      points += 2 * amountOver100;
      purchase -= amountOver100;
    }
    if (purchase > 50 && purchase <= 100) {
      const amountBetween50And100 = purchase - 50;
      points += amountBetween50And100;
    }
    if (points > 0)
      rewardsPoints.push({ month: getMonthName(month), points: points });
  }
  return rewardsPoints;
};

const getMonthName = (monthNumber) => {
  const date = new Date();
  date.setMonth(Math.floor(monthNumber) - 1);
  return date.toLocaleString("en-US", { month: "long" });
};
