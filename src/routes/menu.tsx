import {
  IconAlignBoxRightStretch,
  IconBuildingStore,
  IconGift,
  IconHome,
  IconId,
  IconUsers
} from '@tabler/icons-react'
import { FC } from 'react'

interface IRoute {
  path: string
  name: string
  icon?: FC<any>
  hideInMenu?: boolean
  links?: Array<{ name: string; path: string }>
}

export const ROUTE_KEY = {
  HOME: '/home',
  MY: '/my',
  ORG: '/org',
  COURSE: '/course',
  STUDENT: '/student',
  PRODUCT: '/product',
  TEACHER: '/teacher',
  NO_ORG: '/noOrg',
  PAGE_404: '/p404'
}

export const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEY.HOME]: {
    path: '/',
    name: '首页',
    hideInMenu: true,
    icon: IconHome
  },
  [ROUTE_KEY.MY]: {
    path: '/my',
    name: '个人信息',
    hideInMenu: true,
    icon: IconHome
  },
  [ROUTE_KEY.ORG]: {
    path: '/org',
    name: '门店管理',
    hideInMenu: true,
    icon: IconBuildingStore
  },
  [ROUTE_KEY.COURSE]: {
    path: '/course',
    name: '课程管理',
    icon: IconAlignBoxRightStretch
  },
  [ROUTE_KEY.NO_ORG]: {
    path: '/noOrg',
    name: '选择门店提示',
    hideInMenu: true
  },
  [ROUTE_KEY.STUDENT]: {
    path: '/student',
    name: '学员管理',
    icon: IconUsers
  },
  [ROUTE_KEY.PRODUCT]: {
    path: '/product',
    name: '商品管理',
    icon: IconGift
  },
  [ROUTE_KEY.TEACHER]: {
    path: '/teacher',
    name: '教师管理',
    icon: IconId
  },
  [ROUTE_KEY.PAGE_404]: {
    path: '*',
    hideInMenu: true,
    name: '404'
  }
}

export const routes = Object.keys(ROUTE_CONFIG).map((key) => ({
  ...ROUTE_CONFIG[key],
  key
}))

export const getRouteByKey = (key: string) => ROUTE_CONFIG[key]
