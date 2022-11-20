import Modal from 'components/Modal'
import { SpinnerCenter } from 'components/Spinner'
import { Column } from 'utils/hooks/types'

import React from 'react'
import { ConnectedProps, connect } from 'react-redux'

import { OptionDescriptor } from '@shopify/polaris/build/ts/latest/src/types'

import { actions as customizeDisplayActions } from 'store/CustomizeDisplay'
import { masterTableActions } from 'store/MasterTableSlice'
import { AppDispatch, RootState } from 'store/index'

import { SimpleProductRow, SummaryRow } from 'types'

import { DataGridHandle } from '../core'
import { SelectColumn } from '../core/Columns'
import DataGrid from '../core/DataGrid'
import TextEditor from '../core/editors/TextEditor'

export function getColumns(
  listHiddenColumns?: string[]
): readonly Column<SimpleProductRow, SummaryRow>[] {
  let column: Column<SimpleProductRow, SummaryRow>[] = [
    SelectColumn,
    {
      key: 'id',
      name: 'ID',
      width: 200,
      resizable: true,
      frozen: true,
    },
    {
      key: 'title',
      name: 'Title',
      width: 200,
      resizable: true,
      frozen: true,
      editor: TextEditor,
    },
    {
      key: 'description',
      name: 'Description',
      width: 200,
      resizable: true,
      formatter: () => <Modal></Modal>, // Testing
    },
    {
      key: 'descriptionHtml',
      name: 'Description HTML',
      width: 200,
      resizable: true,
      editor: TextEditor, // Testing
    },
    {
      key: 'createdAt',
      name: 'Created At',
      width: 200,
      resizable: true,
    },
    {
      key: 'customProductType',
      name: 'Custom Product Type',
      width: 200,
      resizable: true,
      formatter: ({ row }) => {
        return (
          <>
            <span>{JSON.stringify(row.customProductType)}</span>
          </>
        )
      },
    },
    {
      key: 'featuredImage',
      name: 'Featured Image',
      width: 200,
      resizable: true,
      formatter: ({ row }) => {
        return (
          <>
            <span>{JSON.stringify(row.featuredImage)}</span>
          </>
        )
      },
    },
    {
      key: 'status',
      name: 'Status',
      width: 200,
      resizable: false,
      formatter: ({ row }) => {
        return (
          <>
            <span>{row.status}</span>
          </>
        )
      },
    },
    {
      key: 'featuredMedia',
      name: 'Featured Media',
      width: 200,
      resizable: true,
      formatter: ({ row }) => {
        return (
          <>
            <span>{JSON.stringify(row.featuredMedia)}</span>
          </>
        )
      },
    },
    {
      key: 'giftCardTemplateSuffix',
      name: 'Gift Card Template Suffix',
      width: 200,
      resizable: true,
      formatter: ({ row }) => {
        return (
          <>
            <span>{JSON.stringify(row.giftCardTemplateSuffix)}</span>
          </>
        )
      },
    },
    {
      key: 'handle',
      name: 'Handle',
      width: 220,
      resizable: true,
      editor: ({ row, column, onRowChange, onClose }) =>
        TextEditor({ row, column, onRowChange, onClose }),
    },
    {
      key: 'hasOnlyDefaultVariant',
      name: 'Has Only Default Variant',
      width: 200,
      resizable: true,
      formatter: ({ row }) => {
        return (
          <>
            <span>{JSON.stringify(row.hasOnlyDefaultVariant)}</span>
          </>
        )
      },
    },
    {
      key: 'hasOutOfStockVariants',
      name: 'Has Out Of Stock Variants',
      width: 200,
      resizable: true,
      formatter: ({ row }) => {
        return (
          <>
            <span>{JSON.stringify(row.hasOutOfStockVariants)}</span>
          </>
        )
      },
    },
    {
      key: 'isGiftCard',
      name: 'Is Gift Card',
      width: 200,
      resizable: true,
      formatter: ({ row }) => {
        return (
          <>
            <span>{JSON.stringify(row.isGiftCard)}</span>
          </>
        )
      },
    },
    {
      key: 'legacyResourceId',
      name: 'Legacy Resource Id',
      width: 200,
      resizable: true,
    },
    {
      key: 'mediaCount',
      name: 'Media Count',
      width: 200,
      resizable: true,
    },
    {
      key: 'onlineStorePreviewUrl',
      name: 'Online Store Preview Url',
      width: 200,
      resizable: true,
    },
    {
      key: 'onlineStoreUrl',
      name: 'Online Store Url',
      width: 200,
      resizable: true,
      formatter: ({ row }) => {
        return (
          <>
            <span>{JSON.stringify(row.onlineStoreUrl)}</span>
          </>
        )
      },
    },
    {
      key: 'publishedAt',
      name: 'Published At',
      width: 200,
      resizable: true,
      formatter: ({ row }) => {
        return (
          <>
            <span>{JSON.stringify(row.publishedAt)}</span>
          </>
        )
      },
    },
    {
      key: 'requiresSellingPlan',
      name: 'Requires Selling Plan',
      width: 200,
      resizable: true,
      formatter: ({ row }) => {
        return (
          <>
            <span>{JSON.stringify(row.requiresSellingPlan)}</span>
          </>
        )
      },
    },
    {
      key: 'tags',
      name: 'Tags',
      width: 200,
      resizable: true,
      formatter: ({ row }) => {
        return (
          <>
            <span>{JSON.stringify(row.tags)}</span>
          </>
        )
      },
    },
    {
      key: 'templateSuffix',
      name: 'Template Suffix',
      width: 200,
      resizable: true,
    },
    {
      key: 'totalInventory',
      name: 'Total Inventory',
      width: 200,
      resizable: true,
    },
    {
      key: 'tracksInventory',
      name: 'Tracks Inventory',
      width: 200,
      resizable: true,
    },
    {
      key: 'totalVariants',
      name: 'Total Variants',
      width: 200,
      resizable: true,
    },
    {
      key: 'vendor',
      name: 'Vendor',
      width: 200,
      resizable: true,
    },
  ]

  if (listHiddenColumns) {
    column = column.filter(
      f =>
        listHiddenColumns.includes(f.key) ||
        (listHiddenColumns.length !== 0 && f.key === 'select-row')
    )
  }

  return column
}

const mapStateToProps = (state: RootState) => {
  return {
    listProducts: state.masterTable.products,
    selectedRows: state.masterTable.selectedRows,
    initProducts: state.masterTable.initProducts,
    isLoading: state.masterTable.isLoading,
    listHiddenColumn: state.customizeDisplay.listHiddenColumn,
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    setProducts: (products: SimpleProductRow[]) =>
      dispatch(masterTableActions.setProducts(products)),
    setSelectedRows: (selectedRows: Set<number>) =>
      dispatch(masterTableActions.setSelectedRows(selectedRows)),
    setRememberProductChanged: (id: string, key: string, isChanged: boolean) =>
      dispatch(masterTableActions.setRememberProductChanged({ id, key, isChanged })),
    setListColumn: () => {
      const list = getColumns()
        ?.filter(f => f.name !== '')
        ?.map(x => ({ value: x.key, label: x.name } as OptionDescriptor))
      dispatch(customizeDisplayActions.setListColumn(list))
    },
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

class SimpleProduct extends React.Component<Props> {
  myRef = React.createRef<DataGridHandle>()

  rowKeyGetter(row: SimpleProductRow): string {
    return row.id
  }

  setRows(rows: SimpleProductRow[]): void {
    this.props.setProducts(rows)
  }

  componentDidMount(): void {
    this.props.setListColumn()
  }

  render(): JSX.Element {
    const sortedRows: SimpleProductRow[] = [...this.props.listProducts]

    return (
      <>
        {this.props.isLoading ? (
          <SpinnerCenter />
        ) : (
          <DataGrid
            ref={this.myRef}
            rowKeyGetter={this.rowKeyGetter.bind(this) as any}
            columns={getColumns(this.props.listHiddenColumn)}
            headerRowHeight={60}
            rowHeight={100}
            rows={sortedRows}
            initialRows={this.props.initProducts}
            onRowsChange={this.setRows.bind(this)}
            defaultColumnOptions={{
              sortable: true,
              resizable: true,
            }}
            selectedRows={this.props.selectedRows}
            onSelectedRowsChange={this.props.setSelectedRows}
            onSortColumnsChange={() => console.log('sortColumns')}
            style={{
              height: '100vh',
            }}
            setRememberProductChanged={this.props.setRememberProductChanged}
          />
        )}
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleProduct)
