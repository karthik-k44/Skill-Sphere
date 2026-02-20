const InputStyles = {
  inputContainer: `
    w-full
    border
    bg-white
    px-4
    outline-none
    items-center
    focus-within:border-primary
    focus-visible:shadow-none
  `,
  input: `
    flex-1
    w-full
    outline-none
    placeholder:text-blue-gray-200
    placeholder:text-sm
    [appearance:textfield]
    [&::-webkit-inner-spin-button]:appearance-none
  `,
  border: {
    errorState: 'border-red-500',
    normalState: 'border-stroke',
  },
  textAlign: {
    center: 'text-center',
    left: 'text-left',
    right: 'text-right',
  },
};

export default InputStyles;
