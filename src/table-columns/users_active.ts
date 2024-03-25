import { h, ref } from 'vue'
import { NDropdown, NTag, NText } from 'naive-ui'
import {
  EllipsisVerticalOutline as Ellipse,
  EyeOutline as EyeIcon,
  PersonRemoveOutline as DeactivateIcon
} from '@vicons/ionicons5'

import type { UserData_Interface } from '@/interface/authentication'

import { useDataTableButtonClickStore } from '@/stores/common/dataTableButtonClick'

import { useCamelCaseToTitle } from '@/composables/camelCaseToTitle'
import { useRenderIcon } from '@/composables/renderIcon'

const dataTableButtonClickStore = useDataTableButtonClickStore()

const requiredColumns = [
  'sn',
  'name',
  'email',
  'phoneNumber',
  'roleName',
  // 'userStatus',
  'actions'
]

// device width
const deviceWidth = ref(null ?? window.innerWidth)

const updateDeviceWidth = (event: any) => {
  deviceWidth.value = event?.target?.innerWidth
}

window.addEventListener('resize', updateDeviceWidth)
// -------------------------------------------------

const dropdownOptions = (row: UserData_Interface) => [
  {
    label: "View",
    key: "view details"
  },
  {
    label: "Deactivate",
    key: "deactivate user",
    disabled: row.isLockedOut || !row.isActive || row.isDeactivated ? true : false
  }
]

const dropdownSlot = (row: UserData_Interface) => h(
  NDropdown,
  {
    // dropdown options
    options: dropdownOptions(row),
    // dropdown option selected
    'on-select': (key: string) => handleClick(row, key)
  },
  // slots for dropdown vnode icon
  () => h(
    NTag,
    {
      size: 'medium',
    },
    useRenderIcon(Ellipse)
  )
)

function handleClick(row: UserData_Interface, buttonClicked: string) {
  const payload = {
    buttonClicked,
    data: row
  }

  // update modal prop
  dataTableButtonClickStore.setClickedButtonProp(payload)
  dataTableButtonClickStore.setIsButtonClicked(true)
}

export const activeUsersDataTableColumn = (): object[] => {
  const tableColumns: object[] = []

  requiredColumns.map((column: string, index: number) => {
    const columnItem: any = {}

    columnItem['title'] = h('b', useCamelCaseToTitle(column))
    columnItem['key'] = column

    if (column === 'sn') {
      columnItem['render'] = (row: UserData_Interface, index: number): number => index + 1
      columnItem['fixed'] = 'left'
    }

    if (column === 'name') {
      columnItem['width'] = 200
      columnItem['render'] = (row: UserData_Interface) => `${row.firstName ?? ''} ${row.middleName ?? ''} ${row.lastName ?? ''} `
    }

    if (column === 'phoneNumber') {
      columnItem['render'] = (row: UserData_Interface) => parseInt(row.phoneNumber) ? row.phoneNumber : 'NA'
    }

    if (column === 'userStatus') {
      columnItem['render'] = (row: any) => h(
        NText,
        {
          bordered: false,
          type: row?.userStatus.toLowerCase() === 'pending' ? 'warning'
            : row?.userStatus.toLowerCase() === 'approved' ? 'success'
            : row?.userStatus.toLowerCase() === 'disapproved' ? 'error'
            : row?.userStatus.toLowerCase() === 'deactivated' ? 'default'
            : row?.userStatus.toLowerCase() === 'lockedout' ? 'default'
            : ''
        },
        {
          default: () => row.userStatus
        }
      )
    }

    if (column === 'actions') {
      columnItem.fixed = deviceWidth.value > 1200 ? 'right' : ''
      columnItem['render'] = (row: UserData_Interface) => dropdownSlot(row)
    }

    tableColumns[index] = columnItem
  })

  return tableColumns
}
