import React from "react";
import ReactInputMask from "react-input-mask";

interface Props {
  className: string;
  value: any;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  name: string;
  placeholder: string;
  setFieldValue: Function;
}

const PhoneInput = ({ className, value, onChange, onBlur,
  name,
  placeholder,
  setFieldValue }: Props) => {

  // const { name, placeholder, setFieldValue, value } = props;

  // Remove formatting and re-format after.
  // Necessary to resolve bugs with formatting and auto-complete
  const ajusta = (v: any) => {
    const digitos = !v ? '' : v.replace(/[^\d]/g, '');
    if (!digitos || digitos.length < 10) return v;
    const corte = digitos.length === 10 ? 6 : 7;
    const max = digitos.length > 11 ? 11 : digitos.length;
    return `(${digitos.substring(0, 2)}) ${digitos.substring(2, corte)}-${digitos.substring(corte, max)}`;
  }

  const maskBuilder = (v: any) => {
    if (!v || v.length === 0) return '';
    const a = ajusta(v);
    return (a.length >= 6 && a[5] === '9') ? '(99) 99999-9999' : '(99) 9999-9999';
  }

  const handleChange = (e: any) => {
    setFieldValue(name, ajusta(e.target.value));
  }

  return (
    <ReactInputMask
      name={name}
      value={value}
      onBlur={onBlur}
      onChange={ev => {
        handleChange(ev);
        onChange(ev);
      }}
      mask={maskBuilder(value)}
      
      placeholder={placeholder}
      maskPlaceholder={null}
      
      className={className}
    />
  )
}

export default PhoneInput;

