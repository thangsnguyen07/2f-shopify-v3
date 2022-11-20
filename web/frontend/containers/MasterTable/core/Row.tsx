import clsx from 'clsx'

import React, { forwardRef, memo } from 'react'
import type { CSSProperties, RefAttributes } from 'react'

import { getColSpan } from '../../../utils'
import {
  RowSelectionProvider,
  useCombinedRefs,
  useLatestFunc,
  useRovingRowRef,
} from '../../../utils/hooks'
import type { RowRendererProps } from '../../../utils/hooks/types'
import Cell from './Cell'

function Row<R, SR>(
  {
    className,
    rowIdx,
    selectedCellIdx,
    isRowSelected,
    lastFrozenColumnIndex,
    row,
    initialRow,
    setRememberProductChanged,
    viewportColumns,
    selectedCellEditor,
    selectedCellDragHandle,
    onRowClick,
    onRowDoubleClick,
    rowClass,
    setDraggedOverRowIdx,
    onMouseEnter,
    top,
    height,
    onRowChange,
    selectCell,
    ...props
  }: RowRendererProps<R, SR>,
  ref: React.Ref<HTMLDivElement>
) {
  const { ref: rowRef, tabIndex, className: rovingClassName } = useRovingRowRef(selectedCellIdx)

  const handleRowChange = useLatestFunc((newRow: R) => {
    onRowChange(rowIdx, newRow)
  })

  function handleDragEnter(event: React.MouseEvent<HTMLDivElement>) {
    setDraggedOverRowIdx?.(rowIdx)
    onMouseEnter?.(event)
  }

  className = clsx(
    'rdg-row',
    `rdg-row-${rowIdx % 2 === 0 ? 'even' : 'odd'}`,
    rovingClassName,
    rowClass?.(row),
    className
  )

  const cells = []

  for (let index = 0; index < viewportColumns.length; index++) {
    const column: any = viewportColumns[index]
    const { idx } = column
    const colSpan = getColSpan(column, lastFrozenColumnIndex, { type: 'ROW', row })
    if (colSpan !== undefined) {
      index += colSpan - 1
    }

    const isCellSelected = selectedCellIdx === idx

    if (isCellSelected && selectedCellEditor) {
      cells.push(selectedCellEditor)
    } else {
      cells.push(
        <Cell
          key={column.key}
          column={column}
          colSpan={colSpan}
          row={row}
          initialRow={initialRow}
          setRememberProductChanged={setRememberProductChanged}
          isCellSelected={isCellSelected}
          dragHandle={isCellSelected ? selectedCellDragHandle : undefined}
          onRowClick={onRowClick}
          onRowDoubleClick={onRowDoubleClick}
          onRowChange={handleRowChange}
          selectCell={selectCell}
          isCopied={false}
          isDraggedOver={false}
        />
      )
    }
  }

  return (
    <RowSelectionProvider value={isRowSelected}>
      <div
        role='row'
        ref={useCombinedRefs(ref, rowRef)}
        tabIndex={tabIndex}
        className={className}
        onMouseEnter={handleDragEnter}
        style={
          {
            top,
            '--row-height': `${height}px`,
          } as unknown as CSSProperties
        }
        {...props}>
        {cells}
      </div>
    </RowSelectionProvider>
  )
}

export default memo(Row) as <R, SR>(props: RowRendererProps<R, SR>) => JSX.Element

export const RowWithRef = memo(forwardRef(Row)) as <R, SR>(
  props: RowRendererProps<R, SR> & RefAttributes<HTMLDivElement>
) => JSX.Element
