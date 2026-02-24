const styles = {
  kind: {
    primary: {
      base: `
        border
        flex
        font-medium
        items-center
        justify-center
        py-2
        md:py-2
        px-3
        rounded-xl
        text-white
        transition
        size-fit
      `,
      disableState: 'cursor-not-allowed bg-blue-300',
      enableState: 'hover:bg-blue-400 cursor-pointer bg-primary active:bg-blue-600',
    },
    discard: {
      base: `
      active:bg-transparent
      bg-transparent
      border
      flex
      font-medium
      items-center
      justify-center
      py-2
      md:py-2
      px-3
      rounded-xl
      text-primary
      transition
      size-fit
      outline-none
      border-1
      border-primary
      `,
      disableState: 'cursor-not-allowed text-slate-500',
      enableState: 'hover:bg-blue-50 cursor-pointer',
    },
    miniDiscard: {
      base: `
      active:bg-transparent
      bg-transparent
      border
      flex
      font-medium
      items-center
      justify-center
      py-1
      px-2
      rounded-lg
      text-primary
      transition
      size-fit
      outline-none
      border-1
      border-current
      `,
      disableState: 'cursor-not-allowed text-slate-500',
      enableState: 'hover:bg-blue-50 cursor-pointer',
    },
    miniPrimary: {
      base: `
        border
        flex
        font-medium
        items-center
        justify-center
        py-1
        md:py-1
        px-2
        rounded-lg
        text-white
        transition
        size-fit
      `,
      disableState: 'cursor-not-allowed bg-blue-300',
      enableState: 'hover:bg-blue-400 cursor-pointer bg-primary active:bg-blue-600',
    },
    delete: {
      base: `
        border
        flex
        font-medium
        items-center
        justify-center
        py-2
        md:py-3
        px-4
        rounded-lg
        text-white
        transition
        size-fit
      `,
      disableState: 'cursor-not-allowed bg-red-200',
      enableState: 'hover:bg-red-900 cursor-pointer bg-red-500 active:bg-red-700',
    },
    miniDelete: {
      base: `
        border
        flex
        font-medium
        items-center
        justify-center
        py-1
        px-2
        rounded-md
        transition
        size-fit
        text-red-500
        border-red-500
      `,
      disableState: 'cursor-not-allowed',
      enableState: 'hover:bg-red-700 hover:text-white cursor-pointer',
    },
  },
};

export default styles;
