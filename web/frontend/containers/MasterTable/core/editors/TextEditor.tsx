import React, { ReactElement } from 'react'

import type { EditorProps } from '../../../../utils/hooks/types'

function autoFocusAndSelect(input: HTMLInputElement | null) {
  input?.focus()
  input?.select()
}

export default function TextEditor<TRow, TSummaryRow>({
  row,
  column,
  onRowChange,
  onClose,
}: EditorProps<TRow, TSummaryRow>): ReactElement {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (column.isNumber) {
      if (!isNaN(+event.target.value)) {
        onRowChange({ ...row, [column.key]: event.target.value })
        return
      }
      return
    }
    onRowChange({ ...row, [column.key]: event.target.value })
  }

  let value = row[column.key as keyof TRow] as unknown as string
  if (value === null) {
    value = ''
  }

  return (
    <input
      className={`rdg-text-editor ${column.isNumber ? 'text-right' : ''}`}
      ref={autoFocusAndSelect}
      disabled={false}
      value={value}
      onChange={event => onChangeHandler(event)}
      onBlur={() => {
        onClose(true)
      }}
    />
  )
}
