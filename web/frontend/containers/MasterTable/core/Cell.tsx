import clsx from 'clsx'

import { memo, useLayoutEffect, useState } from 'react'

import UndoIcon from '../../../components/Icons/Undo'
import { getCellStyle, isCellEditable } from '../../../utils'
import { useRovingCellRef } from '../../../utils/hooks'
import type { CellRendererProps } from '../../../utils/hooks/types'

function Cell<R, SR>({
  column,
  colSpan,
  isCellSelected,
  isCopied,
  isDraggedOver,
  row,
  initialRow,
  setRememberProductChanged,
  dragHandle,
  onRowClick,
  onRowDoubleClick,
  onRowChange,
  selectCell,
  ...props
}: CellRendererProps<R, SR>) {
  const { ref, tabIndex, onFocus } = useRovingCellRef(isCellSelected)
  const { cellClass } = column
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)

  const className = clsx(
    'rdg-cell',
    {
      'rdg-cell-frozen': column.frozen,
      'rdg-cell-frozen-last': column.isLastFrozenColumn,
      'rdg-cell-selected': isCellSelected,
      'rdg-cell-copied': isCopied,
      'rdg-cell-dragged-over': isDraggedOver,
    },
    typeof cellClass === 'function' ? cellClass(row) : cellClass
  )

  function selectCellWrapper(openEditor?: boolean | null) {
    selectCell(row, column, openEditor)
  }

  function handleClick() {
    selectCellWrapper(column.editorOptions?.editOnClick)
    onRowClick?.(row, column)
  }

  function handleContextMenu() {
    selectCellWrapper()
  }

  function handleDoubleClick() {
    selectCellWrapper(true)
    onRowDoubleClick?.(row, column)
  }

  const onUndoClickHandler = () => {
    switch (column.key) {
      default: {
        //@TODO: need to find out how it can't detect type of init row
        const newRow = { ...row }
        newRow[column.key as keyof R] = initialRow[column.key as keyof R] as any
        onRowChange(newRow)
      }
    }
  }

  useLayoutEffect(() => {
    if (initialRow) {
      let edited = true
      switch (column.key) {
        case 'title':
          edited = initialRow[column.key as keyof R] !== row[column.key as keyof R]
          break
        default: {
          edited = initialRow[column.key as keyof R] !== row[column.key as keyof R]
        }
      }

      // Set edited state
      if (setRememberProductChanged) {
        if (!(!edited && isFirstLoad)) {
          setRememberProductChanged(row['id' as keyof R] as string, column.key, edited)
        }
      }

      setIsEdited(edited)
    } else {
      setIsEdited(false)
    }
    setIsFirstLoad(false)
  }, [row[column.key as keyof R]])

  return (
    <div
      role='gridcell'
      aria-colindex={column.idx + 1} // aria-colindex is 1-based
      aria-selected={isCellSelected}
      aria-colspan={colSpan}
      aria-readonly={!isCellEditable(column, row) || undefined}
      ref={ref}
      tabIndex={tabIndex}
      className={clsx(className, isEdited ? 'bg-blue-200' : null)}
      style={column.hide ? { padding: 0 } : getCellStyle(column, colSpan)}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      onFocus={onFocus}
      {...props}>
      {isEdited ? (
        <UndoIcon
          color={'dimgray'}
          width={20}
          onClick={() => {
            onUndoClickHandler()
            isCellSelected = false
          }}
        />
      ) : null}
      {!column.rowGroup && (
        <>
          <column.formatter
            column={column}
            row={row}
            isCellSelected={isCellSelected}
            onRowChange={onRowChange}
          />
          {dragHandle}
        </>
      )}
    </div>
  )
}

export default memo(Cell) as <R, SR>(props: CellRendererProps<R, SR>) => JSX.Element
