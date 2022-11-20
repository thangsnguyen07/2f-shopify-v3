import isEqual from 'lodash/isEqual'
import xorWith from 'lodash/xorWith'

import React, { useCallback, useEffect, useMemo } from 'react'
import { useState } from 'react'
//Store
import { useDispatch, useSelector } from 'react-redux'

//Polaris
import { Button, OptionList, Popover } from '@shopify/polaris'
import { AdjustMinor } from '@shopify/polaris-icons'
import { OptionDescriptor } from '@shopify/polaris/build/ts/latest/src/types'

import { actions as customizeDisplayActions } from 'store/CustomizeDisplay'
import { selectListColumn } from 'store/CustomizeDisplay/selector'
import { RootState } from 'store/index'

const CustomizeDisplay: React.FC = () => {
  const dispatch = useDispatch()
  const listColumn = useSelector<RootState, OptionDescriptor[]>(selectListColumn)

  const [selected, setSelected] = useState<string[]>([])
  const [popoverActive, setPopoverActive] = useState(false)

  const orgListColumn = useMemo((): string[] => listColumn?.map(x => x.value), [listColumn])
  const hiddenColumnLength = useMemo(
    (): number =>
      selected.length > 0 && selected.includes('all') ? selected.length - 1 : selected.length,
    [selected]
  )

  const saveOptionsList = useCallback(
    (list: string[]): void => {
      setSelected(list)
      dispatch(customizeDisplayActions.setListHiddenColumn(list))
    },
    [dispatch]
  )

  const togglePopoverActive = (): void => {
    setPopoverActive(popoverActive => !popoverActive)
  }

  const checkAllOptionList = useCallback(
    (selectList: string[]): string[] => {
      let newList: string[] = []
      const uncheckValue = xorWith(orgListColumn, selectList, isEqual)

      if (selectList.includes('all')) {
        newList = orgListColumn
        if (uncheckValue?.length > 0 && selected.includes('all'))
          newList = selectList.filter(f => f !== 'all')
      }
      if (uncheckValue.includes('all')) {
        newList = selectList
        if (selectList.length === orgListColumn.length - 1) newList = orgListColumn
        if (selected.includes('all')) newList = []
      }
      return newList
    },
    [orgListColumn, selected]
  )

  const handleChangeOptionList = (select: string[]): void => {
    const newList = checkAllOptionList(select)

    saveOptionsList(newList)
  }

  const activator = useMemo(
    (): JSX.Element => (
      <div className='relative w-56'>
        <Button
          fullWidth
          textAlign='left'
          icon={AdjustMinor}
          onClick={togglePopoverActive}
          disclosure>
          Customize Display
        </Button>
        <span className='absolute text-center pointer-events-none top-2 right-7 w-1/6 ml-1.5 rounded py-0.5 px-1.5 bg-gray-200 text-xs font-semibold text-gray-700 tabular-nums'>
          {hiddenColumnLength}
        </span>
      </div>
    ),
    [hiddenColumnLength]
  )

  useEffect(() => {
    listColumn.length > 0 && saveOptionsList(listColumn.map(m => m.value))
  }, [listColumn, saveOptionsList])

  return (
    <Popover active={popoverActive} activator={activator} onClose={togglePopoverActive}>
      <OptionList
        title='Inventory Location'
        onChange={handleChangeOptionList}
        options={listColumn}
        selected={selected}
        allowMultiple
      />
    </Popover>
  )
}

export default CustomizeDisplay
