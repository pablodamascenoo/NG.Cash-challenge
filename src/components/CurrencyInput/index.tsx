import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

const defaultMaskOptions = {
  prefix: "R$",
  suffix: "",
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ".",
  allowDecimal: true,
  decimalSymbol: ",",
  decimalLimit: 2,
  requireDecimal: true,
  integerLimit: 7,
  allowNegative: false,
  allowLeadingZeroes: false,
};

export default function CurrencyInput({ ...inputProps }) {
  const currencyMask = createNumberMask(defaultMaskOptions);

  return <MaskedInput mask={currencyMask} {...inputProps} />;
}
