import isFunction from 'lodash/isFunction'
import isUndefined from 'lodash/isUndefined'

import React, { useEffect, useState } from 'react'

import { Icon, TextField } from '@shopify/polaris'
import { SearchMajor } from '@shopify/polaris-icons'

interface Props {
  placeHolder: string
  onSearch: (text: string) => void
  onChange?: (text: string) => void
  value?: string
  className?: string
  disabled?: boolean
}

const SearchBar: React.FC<Props> = ({
  value,
  placeHolder,
  className = 'w-full',
  onSearch,
  onChange,
  disabled,
}) => {
  const [search, setSearch] = useState<string>('')

  const handleChangeSearch = (text: string): void => {
    setSearch(text)
    isFunction(onChange) && onChange(text)
  }

  const handleKeyDownEnter = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      onSearch(search)
    }
  }

  const handleClearSearch = (): void => {
    setSearch('')
    onSearch('')
  }

  const icon: JSX.Element = (
    <div className='mr-2'>
      <Icon source={SearchMajor} />
    </div>
  )

  useEffect(() => {
    !isUndefined(value) && setSearch(value)
  }, [value])

  return (
    <div className={className} onKeyDownCapture={handleKeyDownEnter}>
      <TextField
        label='Search templates'
        labelHidden
        type='text'
        value={search}
        onChange={handleChangeSearch}
        clearButton
        onClearButtonClick={handleClearSearch}
        inputMode='text'
        prefix={icon}
        placeholder={placeHolder}
        autoComplete='off'
        disabled={disabled}
      />
    </div>
  )
}

export default SearchBar
