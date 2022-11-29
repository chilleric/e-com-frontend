import { useResponsive } from '@/hooks'
import { Checkbox } from '@nextui-org/react'

interface IViewPointPermission {
  listViewPoint: string[]
  listViewChecked: string[]
  setListViewPoint: Function
  editAble?: boolean
  keyObj: string
}

export const ViewPointPermission = ({
  listViewPoint,
  listViewChecked,
  setListViewPoint,
  editAble,
  keyObj,
}: IViewPointPermission) => {
  const breakPoint = useResponsive()
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${breakPoint}, minmax(0, 1fr))`,
        gap: 16,
      }}
    >
      {listViewPoint.map((viewPoint) => (
        <div
          key={viewPoint}
          style={{ gridColumn: 'span 1 / span 1', display: 'flex', alignItems: 'center', gap: 10 }}
        >
          <Checkbox
            isSelected={listViewChecked?.includes(viewPoint)}
            onChange={() => {
              if (listViewChecked.includes(viewPoint)) {
                setListViewPoint({
                  [keyObj]: listViewChecked.filter((item) => item !== viewPoint),
                })
                return
              }
              setListViewPoint({
                [keyObj]: [...listViewChecked, viewPoint],
              })
            }}
            isReadOnly={!editAble}
          >
            {viewPoint}
          </Checkbox>
        </div>
      ))}
    </div>
  )
}
