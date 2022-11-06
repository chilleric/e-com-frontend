import { ActionType, HeaderTableType } from '@/types'
import { Col, Row, Table, TableProps, Tooltip } from '@nextui-org/react'
import { useRouter } from 'next/router'
import React from 'react'

interface ICustomTable<T> {
  header: HeaderTableType[]
  body: T[]
  listActions?: ActionType[]
  listFunctionParseValue: Partial<Record<keyof T, Function>>
  handleChangeSelection?: Function
}

export function CustomTable<T extends { id: string }>({
  header,
  body,
  listActions,
  listFunctionParseValue,
  handleChangeSelection,
  ...props
}: ICustomTable<T> & TableProps) {
  const router = useRouter()

  const renderCell = (data: T, columnKey: React.Key) => {
    if (listFunctionParseValue[columnKey as keyof T]) {
      return listFunctionParseValue[columnKey as keyof T]!(data[columnKey as keyof T])
    }
    switch (columnKey) {
      case 'actions':
        return (
          <Row justify="center" align="center">
            {listActions
              ? listActions.map((action) => (
                  <Col key={action.content} css={{ d: 'flex' }}>
                    <Tooltip content={action.content}>
                      <div
                        onClick={(e) => {
                          action.func(data['id' as keyof T], router)
                          e.stopPropagation()
                        }}
                      >
                        {action.icon}
                      </div>
                    </Tooltip>
                  </Col>
                ))
              : null}
          </Row>
        )
      default:
        return data[columnKey as keyof T] as React.ReactNode
    }
  }

  const handleChange = (keys: 'all' | Set<React.Key>) => {
    if (handleChangeSelection) {
      if (keys === 'all') {
        handleChangeSelection(body.map((item) => item?.id ?? ''))
      } else {
        handleChangeSelection(Array.from(keys))
      }
    }
  }

  return (
    <Table
      aria-label="Example table with dynamic content"
      onSelectionChange={handleChange}
      {...props}
    >
      <Table.Header columns={header}>
        {(column) => <Table.Column key={column.key}>{column.name}</Table.Column>}
      </Table.Header>
      <Table.Body items={body}>
        {(item) => (
          <Table.Row key={item['id' as keyof T] as string}>
            {(columnKey) => <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  )
}
