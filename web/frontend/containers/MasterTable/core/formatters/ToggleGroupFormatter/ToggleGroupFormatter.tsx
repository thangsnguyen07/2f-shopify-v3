import { useFocusRef } from '../../../../../utils/hooks'
import type { GroupFormatterProps } from '../../../../../utils/hooks/types'

export function ToggleGroupFormatter<R, SR>({
  groupKey,
  isExpanded,
  isCellSelected,
  toggleGroup,
}: GroupFormatterProps<R, SR>): JSX.Element | JSX.Element[] {
  const { ref, tabIndex } = useFocusRef<HTMLSpanElement>(isCellSelected)

  function handleKeyDown({ key }: React.KeyboardEvent<HTMLSpanElement>) {
    if (key === 'Enter') {
      toggleGroup()
    }
  }

  const d = isExpanded ? 'M1 1 L 7 7 L 13 1' : 'M1 7 L 7 1 L 13 7'

  return (
    <span
      ref={ref}
      className={'rdg-group-cell-content'}
      tabIndex={tabIndex}
      onKeyDown={handleKeyDown}>
      {groupKey}
      <svg viewBox='0 0 14 8' width='14' height='8' className={'rdg-caret'} aria-hidden>
        <path d={d} />
      </svg>
    </span>
  )
}
