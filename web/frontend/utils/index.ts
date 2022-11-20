import clsx from 'clsx'

import type { CalculatedColumn } from './hooks/types'

export * from './colSpanUtils'
export * from './domUtils'
export * from './keyboardUtils'
export * from './selectedCellUtils'
export * from './isEqual'

export const { min, max, floor, sign } = Math

export function assertIsValidKeyGetter<R, K extends React.Key>(
  keyGetter: unknown
): asserts keyGetter is (row: R) => K {
  if (typeof keyGetter !== 'function') {
    throw new Error('Please specify the rowKeyGetter prop to use selection')
  }
}

export function getCellStyle<R, SR>(
  column: CalculatedColumn<R, SR>,
  colSpan?: number
): React.CSSProperties {
  return {
    gridColumnStart: column.idx + 1,
    gridColumnEnd: colSpan !== undefined ? `span ${colSpan}` : undefined,
    left: column.frozen ? `var(--frozen-left-${column.idx})` : undefined,
  }
}

export function getCellClassname<R, SR>(
  column: CalculatedColumn<R, SR>,
  ...extraClasses: Parameters<typeof clsx>
): string {
  return clsx(
    'rdg-cell',
    {
      ['rdg-cell-frozen']: column.frozen,
      ['rdg-cell-frozen-last']: column.isLastFrozenColumn,
    },
    ...extraClasses
  )
}
