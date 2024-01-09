import Course from '@/pages/Course/Course.page'
import Home from '@/pages/Home/Home.page'
import My from '@/pages/My/My.page'
import NoOrg from '@/pages/NoOrg/NoOrg.page'
import Org from '@/pages/Org/Org.page'
import Page404 from '@/pages/Page404/Page404.page'
import Product from '@/pages/Product/Product.page'
import Student from '@/pages/Student/Student.page'
import Teacher from '@/pages/Teacher/Teacher.page'
import { ROUTE_KEY } from './menu'

export const ROUTE_COMPONENT = {
  [ROUTE_KEY.HOME]: Home,
  [ROUTE_KEY.MY]: My,
  [ROUTE_KEY.ORG]: Org,
  [ROUTE_KEY.COURSE]: Course,
  [ROUTE_KEY.NO_ORG]: NoOrg,
  [ROUTE_KEY.STUDENT]: Student,
  [ROUTE_KEY.PRODUCT]: Product,
  [ROUTE_KEY.TEACHER]: Teacher,
  [ROUTE_KEY.PAGE_404]: Page404
}
