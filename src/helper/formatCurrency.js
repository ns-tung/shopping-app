export default function formatCurrency(e) {
  e = e.toString();
  e = e.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  return e;
}