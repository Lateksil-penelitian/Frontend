const formatCurrency = (number) =>
  new Intl.NumberFormat('id-ID').format(number);

export default formatCurrency;
