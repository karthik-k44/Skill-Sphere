import React from 'react'

interface EmptyBoxProps {
  message: string;
}

const EmptyBox: React.FC<EmptyBoxProps> = ({ message }) => {
  return (
  <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
    {message}
  </div>
  )
}

export default EmptyBox