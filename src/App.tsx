import { object, string } from 'yup';
import './App.css';
import MultiStepForm, { FormStep } from './components/MultiStepForm';
import TextField from './components/TextField';

function App() {
  const initialValues = {
    name: '',
    email: '',
    street: '',
    country: '',
    company: '',
    jobTitle: '',
  };

  const handleSubmit = (values: any, props: any) => {
    console.log('handleSubmit values', values);
  };

  const personValidationSchema = object({
    name: string().required('Name is required'),
    // email: string().email('Email is invalid').required('Email is required'),
  });

  const addressValidationSchema = object({
    street: string().required('Street is required'),
    // country: string().required('Country is required'),
  });

  const workValidationSchema = object({
    company: string().required('Company is required'),
    // jobTitle: string().required('Job title is required'),
  });

  return (
    <div className='container'>
      <MultiStepForm
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormStep
          stepName='Person'
          onSubmit={() => {
            console.log('Person submitted');
          }}
          validationSchema={personValidationSchema}
        >
          <div className='fieldsBox'>
            <TextField name='name' label='Name' />
            <TextField name='email' label='Email' />
          </div>
        </FormStep>
        <FormStep
          stepName='Address'
          onSubmit={() => {
            console.log('Address submitted');
          }}
          validationSchema={addressValidationSchema}
        >
          <div className='fieldsBox'>
            <TextField name='street' label='Street' />
            <TextField name='country' label='Country' />
          </div>
        </FormStep>
        <FormStep
          stepName='Work'
          onSubmit={() => {
            console.log('Work submitted');
          }}
          validationSchema={workValidationSchema}
        >
          <div className='fieldsBox'>
            <TextField name='company' label='Company' />
            <TextField name='jobTitle' label='Job Title' />
          </div>
        </FormStep>
      </MultiStepForm>
    </div>
  );
}

export default App;
