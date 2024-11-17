import { FormikValues } from 'formik';

interface Props {
  hasPrevious?: boolean;
  isLastStep: boolean;
  onBackClick: (values: FormikValues) => void;
}

const FormNavigation = ({ hasPrevious, isLastStep, onBackClick }: Props) => {
  return (
    <div className='formNavigation'>
      {hasPrevious && (
        <button type='button' onClick={onBackClick}>
          Back
        </button>
      )}

      <button type='submit'>{isLastStep ? 'Submit' : 'Next'}</button>
    </div>
  );
};

export default FormNavigation;
