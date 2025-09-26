import { forwardRef, InputHTMLAttributes } from 'react'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && (
          <label className="form-label" htmlFor={props.id}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`form-input ${error ? 'border-error' : ''} ${className}`}
          {...props}
        />
        {error && (
          <p className="text-error text-sm mt-1">{error}</p>
        )}
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'

export default FormInput