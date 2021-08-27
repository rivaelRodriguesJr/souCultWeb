
import { ChangeEventHandler } from 'react';
import { Form } from 'react-bootstrap';
import { Control, Controller, DeepMap, FieldError, RegisterOptions } from 'react-hook-form';

type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

interface Value {
  key: any;
  value: any;
}

interface Props {
  name: string;
  control: Control<any>;
  errors: DeepMap<any, FieldError>;
  rules: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  values: Value[];
  onChange?: ChangeEventHandler<FormControlElement>;
}

const ControlledSelect = ({ name, control, errors, rules, values = [], onChange = () => {}}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) =>
        <>
          <Form.Control
            as="select"
            isInvalid={fieldState.invalid}
            {...field}
            onChange={onChange}
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