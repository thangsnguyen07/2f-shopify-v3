import clsx from 'clsx'

import React from 'react'

import { useFocusRef } from '../../../../../utils/hooks'

type SharedInputProps = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  'disabled' | 'onClick' | 'aria-label' | 'aria-labelledby'
>

interface SelectCellFormatterProps extends SharedInputProps {
  isCellSelected: boolean
  value: boolean
  onChange: (value: boolean, isShiftClick: boolean) => void
}

export function SelectCellFormatter({
  value,
  isCellSelected,
  disabled,
  onClick,
  onChange,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: SelectCellFormatterProps) {
  const { ref, tabIndex } = useFocusRef<HTMLInputElement>(isCellSelected)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.checked, (e.nativeEvent as MouseEvent).shiftKey)
  }

  return (
    <div className={'sticky h-full w-full'}>
      <label className={clsx('rdg-checkbox-label', { 'rdg-checkbox-label-disabled': disabled })}>
        <input
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          ref={ref}
          type='checkbox'
          disabled={disabled}
          tabIndex={tabIndex}
          checked={value}
          onChange={handleChange}
          onClick={onClick}
        />
      </label>
    </div>
  )
}
