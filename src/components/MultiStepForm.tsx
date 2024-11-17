import {
  Form,
  Formik,
  FormikConfig,
  FormikHelpers,
  FormikValues,
} from 'formik';
import React, { useState } from 'react';
import FormNavigation from './FormNavigation';

interface Props extends FormikConfig<FormikValues> {
  children: React.ReactNode;
}

const MultiStepForm = ({ children, initialValues, onSubmit }: Props) => {
  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children) as React.ReactElement[];

  const [snapshot, setSnapshot] = useState(initialValues);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = (values: FormikValues) => {
    setSnapshot(values);
    // setSnapshot((snapshot) => ({ ...snapshot, ...values }));
    setStepNumber(stepNumber + 1);
  };
  const previous = (values: FormikValues) => {
    setSnapshot(values);
    // setSnapshot((snapshot) => ({ ...snapshot, ...values }));
    setStepNumber(stepNumber - 1);
  };

  const handleSubmit = async (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>
  ) => {
    console.log('isLastStep', isLastStep);

    if (step.props.onSubmit) {
      await step.props.onSubmit(values);
    }

    if (isLastStep) {
      console.log('Submitted values', values);
      console.log('actions', actions);
      alert(JSON.stringify(values, null, 2));
      return onSubmit(values, actions);
    } else {
      actions.setTouched({});
      //   actions.setSubmitting(false);
      next(values);
    }
  };

  return (
    <div>
      <Formik
        initialValues={snapshot}
        validationSchema={step.props.validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          const { values } = formik;
          const stepName = step.props.stepName;

          return (
            <Form>
              <h2>{stepName}</h2>
              {step}
              <FormNavigation
                isLastStep={isLastStep}
                hasPrevious={stepNumber > 0}
                onBackClick={() => previous(values)}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default MultiStepForm;

export const FormStep = ({ stepName = '', children }: any) => children;
