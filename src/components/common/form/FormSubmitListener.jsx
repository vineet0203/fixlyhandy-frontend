import { useEffect, useRef } from 'react';
import { useFormikContext } from 'formik';
import { useToast } from '../ToastProvider';

const FormSubmitListener = () => {
  const { errors, submitCount } = useFormikContext();
  const { showToast } = useToast();
  const prevSubmitCountRef = useRef(submitCount);

  useEffect(() => {
    if (submitCount > prevSubmitCountRef.current) {
      if (Object.keys(errors).length > 0) {
        showToast("Please fill all required fields", "warning");
      }
      prevSubmitCountRef.current = submitCount;
    }
  }, [submitCount, errors, showToast]);

  return null;
};

export default FormSubmitListener;
