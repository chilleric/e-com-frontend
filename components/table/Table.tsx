import { ActionType, HeaderTableType } from '@/types'
import { Col, Row, Table, TableProps, Tooltip } from '@nextui-org/react'
import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineEdit, AiOutlineEye } from 'react-icons/ai'

interface ICustomTable<T> {
  header: HeaderTableType[]
  body: T[]
  listActions?: ActionType[]
  listFunctionParseValue: Partial<Record<keyof T, Function>>
}

export function CustomTable<T extends {}>({
  header,
  body,
  listActions,
  listFunctionParseValue,
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
            {listActions ? (
              listActions.map((action) => (
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
            ) : (
              <>
                <Col css={{ d: 'flex' }}>
                  <Tooltip content="Edit user">
                    <div
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    >
                      <AiOutlineEdit size={20} fill="#979797" />
                    </div>
                  </Tooltip>
                </Col>
                <Col css={{ d: 'flex' }}>
                  <Tooltip content="Details">
                    <div
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    >
                      <AiOutlineEye size={20} fill="#979797" />
                    </div>
                  </Tooltip>
                </Col>
              </>
            )}
          </Row>
        )
      default:
        return data[columnKey as keyof T] as React.ReactNode
    }
  }

  return (
    <Table aria-label="Example table with dynamic content" {...props}>
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
