import React from 'react';
import { Input } from './Input';

interface FormFieldProps {
  label: string;
  error?: string;
  children?: React.ReactNode;
  htmlFor?: string;
}

export function FormField({ label, error, children, htmlFor }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

interface FormFieldWithInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string;
  error?: string;
}

export function FormFieldWithInput({ label, error, id, ...inputProps }: FormFieldWithInputProps) {
  return (
    <FormField label={label} error={error} htmlFor={id}>
      <Input id={id} {...inputProps} />
    </FormField>
  );
}
