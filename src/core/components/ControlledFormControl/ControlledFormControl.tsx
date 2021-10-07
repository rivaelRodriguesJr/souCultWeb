
import { Form } from 'react-bootstrap';
import { Controller, DeepMap, FieldError, FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';

interface ControlledFormControlProps<TFieldValues, TName extends FieldPath<TFieldValues>> extends UseControllerProps<TFieldValues, TName> {
  errors: DeepMap<any, FieldError>;
  type?: 'text' | 'number' | 'date' | 'time';
}

const ControlledFormControl = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ name, control, errors, rules, type = 'text' }: ControlledFormControlProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) =>
        <>
          <Form.Control
            type={type}
            isInvalid={fieldState.invalid}
            onChange={ev => {
              field.onChange(ev);
            }}
            value={field.value as any}
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
