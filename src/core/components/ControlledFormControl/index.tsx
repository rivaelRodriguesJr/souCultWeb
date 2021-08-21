
import { Form } from 'react-bootstrap';
import { Control, Controller, DeepMap, FieldError, RegisterOptions } from 'react-hook-form';


interface Props {
  name: string;
  control: Control<any>;
  errors: DeepMap<any, FieldError>;
  rules: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  type?: 'text' | 'number';
}

const ControlledFormControl = ({ name, control, errors, rules, type = 'text' }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) =>
        <>
          <Form.Control
            type={type}
            isInvalid={fieldState.invalid}
            {...field}
          />
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

export default ControlledFormControl;