const styles = {
  kind: {
    primary: {
      base: `
        border
        border-primary
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
        w-full
      `,
      disableState: 'cursor-not-allowed bg-primary-300',
      enableState: 'hover:bg-primary-700 cursor-pointer bg-primary active:bg-primary-600',
    },
    primaryDark: {
      base: `
        border
        border-primary-900
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
        w-full
      `,
      disableState: 'cursor-not-allowed bg-primary-300 border-primary-300',
      enableState: 'hover:bg-primary-800 cursor-pointer bg-primary-900 active:bg-primary-950',
    },
    discardDark: {
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
      text-primary-900
      transition
      w-full
      outline-none
      border-1
      border-primary-900
      `,
      disableState: 'cursor-not-allowed text-slate-500 border-slate-300',
      enableState: 'hover:bg-primary-100 cursor-pointer',
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
      w-full
      outline-none
      border-1
      border-primary
      `,
      disableState: 'cursor-not-allowed text-slate-500',
      enableState: 'hover:bg-primary-100 cursor-pointer',
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
      enableState: 'hover:bg-primary-100 cursor-pointer',
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
      disableState: 'cursor-not-allowed bg-primary-300',
      enableState: 'hover:bg-primary-700 cursor-pointer bg-primary active:bg-primary-600',
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
