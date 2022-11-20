import { useFocusRef } from './useFocusRef'

export function useRovingRowRef(selectedCellIdx: number | undefined) {
  const isSelected = selectedCellIdx === -1
  const { ref, tabIndex } = useFocusRef<HTMLDivElement>(isSelected)

  return {
    ref,
    tabIndex,
    className: isSelected ? 'rdg-row-selected' : undefined,
  }
}
