import React from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';

type InputProps = {
  name: string;
  givenError?: string;
  customClass?: string;
} & TextFieldProps;

const Input = ({ name, givenError, customClass, required, ...rest }: InputProps): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <TextField
      className={customClass}
      {...register(name, { required: { value: required as boolean, message: givenError as string } })}
      {...rest}
    />
  );
};

export default Input;
