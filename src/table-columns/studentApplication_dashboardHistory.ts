import { h, ref } from 'vue'
import { NImage, NSpace, NText } from 'naive-ui'

import type { FundApplication_Interface } from '@/interface/fundOrFinancialAid'

import { useCamelCaseToTitle } from '@/composables/camelCaseToTitle'
import { useFormatDateTime } from '@/composables/formatDateString'
import { useNumberToCurrency } from '@/composables/formatNumber'

const requiredColumns = [
  'sn',
  'applicantName',
  'NIN',
  'dateApplied',
  'school',
  'accountDetails',
  'fundAmount',
  'schoolDocuments',
  'status'
]

// device width
const deviceWidth = ref(null ?? window.innerWidth)

const updateDeviceWidth = (event: any) => {
  deviceWidth.value = event?.target?.innerWidth
}

window.addEventListener('resize', updateDeviceWidth)
// -------------------------------------------------

const imageDocumentSlot = (row: any) => [
  // image 1
  row['schoolOrExamEnrollmentFormDocument']?.length
    ? h(
      NImage,
      {
        width: 50,
        height: 50,
        src: row['schoolOrExamEnrollmentFormDocument'],
        previewedImgProps: {
          style: {
            height: '300px'
          }
        },
        alt: 'school or exam enrollment form document'
      }
    )
    : h(
      'span',
      {
        style: {
          color: 'red'
        }
      },
      'NA'),
  // image 2
  row['schoolOrExamFeesDocument']?.length
    ? h(
      NImage,
      {
        width: 50,
        height: 50,
        src: row['schoolOrExamFeesDocument'],
        previewedImgProps: {
          style: {
            height: '300px'
          }
        },
        alt: 'school or exam fees document'
      }
    )
    : h(
      'span',
      {
        style: {
          color: 'red'
        }
      },
      'NA')
]

export const dashboardHistoryDataTableColumn = (): object[] => {
  const tableColumns: object[] = []

  requiredColumns.map((column: string, index: number) => {
    const columnItem: any = {}

    columnItem['title'] = h('b', useCamelCaseToTitle(column))
    columnItem['key'] = column

    if (column === 'sn') {
      columnItem['render'] = (row: FundApplication_Interface, index: number): number => index + 1
      columnItem['fixed'] = 'left'
    }

    if (column === 'applicantName') {
      columnItem['width'] = 200
    }

    if (column === 'NIN') {
      columnItem['render'] = (row: FundApplication_Interface) => row?.nin ?? '---'
    }

    if (column === 'dateApplied') {
      columnItem['render'] = (row: FundApplication_Interface) => useFormatDateTime(row?.created_Date) ?? '---'
    }

    if (column === 'school') {
      columnItem['width'] = 300
      columnItem['render'] = (row: FundApplication_Interface) => row?.institutionName
    }

    if (column === 'accountDetails') {
      columnItem.width = 250
      columnItem.render = (row: FundApplication_Interface) => h(
        NSpace,
        {
          vertical: true,
          size: 2
        },
        () => [
          h('span', row?.institutionPaymentBankName),
          h('span', row?.institutionPaymentAccountNumber),
          h('span', row?.institutionPaymentAccountName)
        ]
      )
    }

    if (column === 'fundAmount') {
      columnItem['render'] = (row: FundApplication_Interface) => useNumberToCurrency(row?.requiredFundAmount, 'NGN')
    }

    if (column === 'schoolDocuments') {
      // columnItem['width'] = 400
      columnItem['render'] = (row: any) => h(
        NSpace,
        {
          size: 20,
          align: 'start'
        },
        // slots for button vNodes
        () => imageDocumentSlot(row)
      )
    }

    if (column === 'status') {
      columnItem.fixed = deviceWidth.value > 1200 ? 'right' : ''
      columnItem['render'] = (row: any) => h(
        NText,
        {
          bordered: false,
          type: row.status.toLowerCase() === 'saved' ? 'tertiary'
            : row.status.toLowerCase() === 'pending' ? 'warning'
            : row.status.toLowerCase() === 'reviewed' ? 'info'
            : row.status.toLowerCase() === 'approved' ? 'success'
            : row.status.toLowerCase() === 'declined' ? 'error'
            : row.status.toLowerCase() === 'disbursed' ? 'success'
            : ''
        },
        {
          default: () => row.status
        }
      )
    }

    tableColumns[index] = columnItem
  })

  return tableColumns
}
