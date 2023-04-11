import Input, { parsePhoneNumber } from "react-phone-number-input/input-mobile";
import "./PhoneInput.scss";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const PhoneInput = ({ value, onChange }: Props) => {
  return (
    <Input
      className="custom-phone-input"
      country="US"
      value={value ? `+1${value}` : ""}
      withCountryCallingCode
      international
      onChange={(updatedValue) => {
        const phoneNumber = parsePhoneNumber(updatedValue || "");
        onChange(phoneNumber?.nationalNumber || "");
      }}
    />
  );
};

export default PhoneInput;
