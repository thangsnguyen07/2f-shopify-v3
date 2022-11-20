import React from 'react'

import { useFocusRef } from '../../../../../utils/hooks'

interface CellExpanderFormatterProps {
  isCellSelected: boolean
  expanded: boolean
  onCellExpand: () => void
}

export function CellExpanderFormatter({
  isCellSelected,
  expanded,
  onCellExpand,
}: CellExpanderFormatterProps) {
  const { ref, tabIndex } = useFocusRef<HTMLSpanElement>(isCellSelected)

  function handleKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      onCellExpand()
    }
  }

  return (
    <div className={'cell-expanded'}>
      <span onClick={onCellExpand} onKeyDown={handleKeyDown}>
        <span ref={ref} tabIndex={tabIndex}>
          {expanded ? '\u25BC' : '\u25b6'}
        </span>
      </span>
    </div>
  )
}
