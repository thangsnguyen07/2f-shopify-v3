import { useFocusRef } from '../../../../utils/hooks'
import type { HeaderRendererProps } from '../../../../utils/hooks/types'

type SharedHeaderCellProps<R, SR> = Pick<
  HeaderRendererProps<R, SR>,
  'sortDirection' | 'onSort' | 'priority' | 'isCellSelected'
>

interface Props<R, SR> extends SharedHeaderCellProps<R, SR> {
  children: React.ReactNode
}

export default function SortableHeaderCell<R, SR>({
  onSort,
  sortDirection,
  priority,
  children,
  isCellSelected,
}: Props<R, SR>) {
  const { ref, tabIndex } = useFocusRef<HTMLSpanElement>(isCellSelected)

  function handleKeyDown(event: React.KeyboardEvent<HTMLSpanElement>) {
    if (event.key === ' ' || event.key === 'Enter') {
      // stop propagation to prevent scrolling
      event.preventDefault()
      onSort(event.ctrlKey || event.metaKey)
    }
  }

  function handleClick(event: React.MouseEvent<HTMLSpanElement>) {
    onSort(event.ctrlKey || event.metaKey)
  }

  return (
    <span
      ref={ref}
      tabIndex={tabIndex}
      className={'rdg-header-sort-cell'}
      onClick={handleClick}
      onKeyDown={handleKeyDown}>
      <span className={'rdg-header-sort-name'}>{children}</span>
      <span>
        {sortDirection !== undefined && (
          <svg viewBox='0 0 12 8' width='12' height='8' className={'fill-current'} aria-hidden>
            <path
              d={sortDirection === 'ASC' ? 'M0 8 6 0 12 8' : 'M0 0 6 8 12 0'}
              className={'transition delay-75'}
            />
          </svg>
        )}
        {priority}
      </span>
    </span>
  )
}
