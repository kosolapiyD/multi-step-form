import { Field, useField, FieldConfig } from 'formik';

type Props = {
  label: string;
  name: string;
};

const TextField = ({ name, label }: Props) => {
  const [field, meta] = useField(name);

  return (
    <>
      <Field
        name={name}
        placeholder={label}
        className={`inputField ${meta.error && meta.touched ? 'error' : ''}`}
      />
      <span className='errorText'>{meta.error}</span>
    </>
  );
};

export default TextField;
