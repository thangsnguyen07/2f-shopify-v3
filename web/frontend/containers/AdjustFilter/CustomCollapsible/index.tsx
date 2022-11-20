import { OptionType } from 'constants/AdjustFilter'
import isEmpty from 'lodash/isEmpty'
//Lodash
import isUndefined from 'lodash/isUndefined'

import React, { Children, useEffect, useLayoutEffect, useMemo, useState } from 'react'

//Polaris
import { Button, Collapsible, Heading, Tag } from '@shopify/polaris'
import { ChevronDownMinor, ChevronUpMinor } from '@shopify/polaris-icons'

export interface Props {
  children: React.ReactNode
  keyName: string
  label: string
  onRemove: () => void
  readOnly?: boolean
  prefix?: React.ReactNode
}

const CustomCollapsible: React.FC<Props> = ({
  children,
  keyName,
  label,
  onRemove,
  readOnly = false,
  prefix,
}): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(true)
  const [expanded, setExpanded] = useState<boolean>(false)
  const [childrenValue, setChildrenValue] = useState<string | string[]>()
  const [listOptions, setListOption] = useState<OptionType[]>([])

  const handleToggle = (): void => {
    setExpanded(!expanded)
    setOpen(!open)
  }

  const tagName = useMemo(() => {
    const labels: string[] = []

    if (!isUndefined(childrenValue)) {
      const tempArray: string[] = []
      tempArray.concat(childrenValue)

      tempArray.forEach(item => {
        const label = listOptions.find(f => f.value === item)?.label?.toString()
        labels.push(label || (childrenValue as string))
      })
    }

    return !isEmpty(childrenValue) && !open ? <Tag>{`${label}: ${labels.join(', ')}`}</Tag> : null
  }, [childrenValue, label, listOptions, open])

  useEffect(() => {
    const getProps = Children.toArray(children)
      .map(({ props: { selected, value, choices } }: any) => ({ selected, value, choices }))
      .shift()
    !isUndefined(getProps?.value) && setChildrenValue(getProps?.value)
    !isUndefined(getProps?.selected) && setChildrenValue(getProps?.selected)
    !isUndefined(getProps?.choices) && setListOption(getProps?.choices)
  }, [children])

  useEffect(() => {
    setDisabled(!childrenValue?.length)
  }, [childrenValue])

  useLayoutEffect(() => {
    open && document.getElementById(`id-${keyName}`)?.focus()
  }, [keyName, open])

  return (
    <div className='collapsible'>
      <button
        style={{ color: readOnly ? '#6D7175' : 'unset' }}
        className='Polaris-Button w-full'
        onClick={handleToggle}>
        <div className='flex w-full justify-between items-center'>
          <Heading>{label}</Heading>
          <Button icon={open ? ChevronDownMinor : ChevronUpMinor} plain />
        </div>
        <div className='flex mt-0.5'>{tagName}</div>
      </button>
      {open && (
        <>
          <Collapsible open={open} id={`collap-${keyName}`} expandOnPrint>
            <div className='p-4 flex flex-col gap-3 my-1'>
              {prefix && prefix}
              {children}
              <Button textAlign='left' plain disabled={disabled} onClick={onRemove}>
                Clear
              </Button>
            </div>
          </Collapsible>
        </>
      )}
    </div>
  )
}

export default CustomCollapsible
