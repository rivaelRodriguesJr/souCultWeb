import { Form } from 'react-bootstrap';
import { Controller, DeepMap, FieldError, FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';

interface Value {
  key: any;
  value: any;
}

interface ControlledSelectProps<TFieldValues, TName extends FieldPath<TFieldValues>> extends UseControllerProps<TFieldValues, TName> {
  errors: DeepMap<any, FieldError>;
  values: Value[];
  onChange?: (value: string) => void;
}

const ControlledSelect = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ name, control, errors, rules, values = [], onChange = () => {}}: ControlledSelectProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) =>
        <>
          <Form.Control
            as="select"
            isInvalid={fieldState.invalid}
            onChange={ev => {
              onChange(ev.target.value);
              field.onChange(ev);
            }}
            value={field.value as any}
          >
            <option value={-1}>Selecione</option>
            {values.map(v => (
              <option key={v.key} value={v.key}>{v.value}</option>
            ))}
          </Form.Control>
          {errors[field.name] &&
            <Form.Control.Feedback type="invalid">
              {errors[field.name]?.message}
            </Form.Control.Feedback>
          }
        </>
      }
      rules={rules}
    />

  );
}

export default ControlledSelect;