let orderCount = 0;

export function addOrder() {
  orderCount++;

  if (orderCount === 10) {
    orderCount = 0; // reset after free order
    return { free: true, count: 10 };
  }

  return { free: false, count: orderCount };
}

export function getPoints() {
  return orderCount;
}