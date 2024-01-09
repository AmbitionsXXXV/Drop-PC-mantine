import { Badge } from '@mantine/core'

export const AUTH_TOKEN = 'auth_token'
export const DEFAULT_PAGE_SIZE = 10
export const LOCAL_CURRENT_ORG = 'LOCAL_CURRENT_ORG'
export const DAY_FORMAT = 'YYYY-MM-DD'
// 卡类型
export const CARD_TYPE = {
  TIME: 'time', // 次卡
  DURATION: 'duration' // 时长卡
}
export const getCardName = (type: string) => {
  switch (type) {
    case CARD_TYPE.TIME:
      return <Badge color="blue">次卡</Badge>
    case CARD_TYPE.DURATION:
      return <Badge color="green">时长卡</Badge>
    default:
      return '-'
  }
}

// 预约课程状态
export const SCHEDULE_STATUS = {
  CANCEL: 'CANCEL'
}
