export function formatToMoney(value) {
  const stringToNumber = Number(value);
  return stringToNumber.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}