import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Loader from '../loadingAnimation/loadingAnimation';
import FormInput from './FormInput';

const UserForm = ({
  formHardTexts,
  inputsArray,
  useFormInput,
  onSubmit,
}) => {
  const { handleSubmit } = useFormInput;



  return (
    <div className="w-full min-h-screen bg-gray-light flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full h-screen  sm:w-96 sm:min-h-96 sm:max-h-[600px] rounded-md flex flex-col justify-evenly items-center py-5 "
      >
        <h3 className="font-medium mb-4 text-xl">{formHardTexts.title}</h3>
        {inputsArray.map((inputData) => {
          return (
            <FormInput
              key={inputData.name}
              {...inputData}
              useFormInput={useFormInput}
            />
          );
        })}

        <button
          className="w-72 h-10 pb-2 mt-4 rounded-3xl bg-black text-white  hover:bg-gray-dark transition-all duration-150 flex items-center justify-center"
          type="submit"
        >
          {formHardTexts.submitButton}
        </button>
        <NavLink
          className="text-blue"
          to={formHardTexts.loginAndSignUpSwitcherPath}
        >
          {formHardTexts.loginAndSignUpSwitcherText}
        </NavLink>
      </form>
    </div>
  );
};

export default UserForm;
