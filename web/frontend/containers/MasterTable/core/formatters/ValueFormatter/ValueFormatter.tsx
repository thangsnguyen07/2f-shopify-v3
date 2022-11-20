import type { FormatterProps } from '../../../../../utils/hooks/types'

export function ValueFormatter<R, SR>(props: FormatterProps<R, SR>): JSX.Element | null {
  const placeHolderText = () => {
    let placeholder = ''
    switch (props.column.key) {
      case 'externalUrl':
        placeholder = 'https://'
        break
      case 'buttonText':
        placeholder = 'Buy product'
        break
      default:
        placeholder = ''
        break
    }
    return placeholder
  }

  try {
    return (
      <>
        {props.row[props.column.key as keyof R] ? (
          props.row[props.column.key as keyof R]
        ) : (
          <span style={{ color: 'grey' }}>{placeHolderText()}</span>
        )}
      </>
    )
  } catch {
    return null
  }
}
