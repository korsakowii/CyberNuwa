import React, { createContext, useContext, useState } from 'react';
import { cn } from '@/lib/utils';
import { FormField, FormErrors } from '@/types';

interface FormContextType {
  values: Record<string, any>;
  errors: FormErrors;
  setValue: (name: string, value: any) => void;
  setError: (name: string, error: string) => void;
  clearError: (name: string) => void;
  validate: () => boolean;
}

const FormContext = createContext<FormContextType | null>(null);

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a Form component');
  }
  return context;
};

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  fields: FormField[];
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => void;
  onValidationError?: (errors: FormErrors) => void;
}

export const Form: React.FC<FormProps> = ({
  fields,
  initialValues = {},
  onSubmit,
  onValidationError,
  className,
  children,
  ...props
}) => {
  const [values, setValues] = useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const setValue = (name: string, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      clearError(name);
    }
  };

  const setError = (name: string, error: string) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const clearError = (name: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    fields.forEach(field => {
      const value = values[field.name];
      
      // Required validation
      if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }

      // Length validation
      if (typeof value === 'string') {
        if (field.validation?.minLength && value.length < field.validation.minLength) {
          newErrors[field.name] = `${field.label} must be at least ${field.validation.minLength} characters`;
          return;
        }
        if (field.validation?.maxLength && value.length > field.validation.maxLength) {
          newErrors[field.name] = `${field.label} must be no more than ${field.validation.maxLength} characters`;
          return;
        }
      }

      // Pattern validation
      if (field.validation?.pattern && typeof value === 'string') {
        const regex = new RegExp(field.validation.pattern);
        if (!regex.test(value)) {
          newErrors[field.name] = `${field.label} format is invalid`;
          return;
        }
      }

      // Custom validation
      if (field.validation?.custom) {
        const customError = field.validation.custom(value);
        if (customError) {
          newErrors[field.name] = customError;
          return;
        }
      }
    });

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      onValidationError?.(newErrors);
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(values);
    }
  };

  const contextValue: FormContextType = {
    values,
    errors,
    setValue,
    setError,
    clearError,
    validate,
  };

  return (
    <FormContext.Provider value={contextValue}>
      <form onSubmit={handleSubmit} className={cn('space-y-6', className)} {...props}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

// Form Field Component
export interface FormFieldProps {
  field: FormField;
  className?: string;
}

export const FormFieldComponent: React.FC<FormFieldProps> = ({ field, className }) => {
  const { values, errors, setValue } = useForm();
  const value = values[field.name] || '';
  const error = errors[field.name];

  const handleChange = (newValue: any) => {
    setValue(field.name, newValue);
  };

  const renderField = () => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">{field.placeholder}</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => handleChange(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-zinc-800 border-zinc-700 rounded focus:ring-blue-500 focus:ring-2"
          />
        );
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map(option => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => handleChange(e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-zinc-800 border-zinc-700 focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-white">{option.label}</span>
              </label>
            ))}
          </div>
        );
      default:
        return (
          <input
            type={field.type}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <label className="block text-sm font-medium text-white">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderField()}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};
