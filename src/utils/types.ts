export interface IPropChild {
  children: React.ReactNode
}

export interface IValue {
  label: string
  value: string
}

export interface IUser {
  id: string
  tel: string
  name: string
  desc: string
  avatar: string
  refetchHandler?: () => void
  currentOrg?: string
}
export interface IPage {
  pageNum: number
  pageSize: number
  total: number
}
export interface IMedia {
  id: string
  url: string
  remark: string
}
/**
 * 门店
 */
export interface IOrganization {
  id: string
  orgFrontImg?: IMedia[]
  orgRoomImg?: IMedia[]
  orgOtherImg?: IMedia[]
  name: string
  logo: string
  tags?: string
  description?: string
  address?: string
  tel?: string
  longitude?: string
  latitude?: string
  identityCardBackImg: string
  identityCardFrontImg: string
  businessLicense: string
}

export type TBaseOrganization = Partial<IOrganization>

export interface TOrgsQuery {
  [key: string]: { __typename?: 'Query'; data: IOrganization[]; page: IPage }
}

export interface TOrgQuery {
  [key: string]: { __typename?: 'Query'; data: IOrganization }
}

export interface IStudent {
  name: string
  id: string
  tel: string
  avatar: string
  account: string
}

export interface TStudentQuery {
  [key: string]: { __typename?: 'Query'; data: IStudent[]; page: IPage }
}

export interface IOrderTime {
  startTime: string
  endTime: string
  key: number
}

export type TWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export interface IWeekCourse {
  week: TWeek
  orderTime: IOrderTime[]
}

export interface ICourse {
  id: string
  name: string // 标题
  desc?: string
  group?: string // 适龄人群
  baseAbility?: string
  limitNumber: number // 限制人数
  duration: number // 持续时长
  reserveInfo?: string
  refundInfo?: string
  otherInfo?: string
  reducibleTime: IWeekCourse[]
  teachers: ITeacher[]
}

export interface TCoursesQuery {
  [key: string]: { __typename?: 'Query'; data: ICourse[]; page: IPage }
}

export interface TCourseQuery {
  [key: string]: { __typename?: 'Query'; data: ICourse; page: IPage }
}

export type TBaseCourse = Partial<ICourse>

export interface ICard {
  id: string
  name: string
  type: string
  time: number
  validityDay: number
  course?: ICourse
}

export interface TCardsQuery {
  [key: string]: { __typename?: 'Query'; data: ICard[]; page: IPage }
}

/**
 * 商品类型
 */
export interface IProduct {
  id: string
  limitBuyNumber: number
  name: string
  coverUrl?: string
  bannerUrl?: string
  desc: string
  originalPrice: number
  stock: number
  preferentialPrice: number
  status: string
  cards: ICard[]
}

export interface IProductType {
  key: string
  title: string
}

export interface TProductsQuery {
  [key: string]: { __typename?: 'Query'; data: IProduct[]; page: IPage }
}

export interface TProductQuery {
  [key: string]: { __typename?: 'Query'; data: IProduct }
}

export interface TProductTypeQuery {
  [key: string]: { __typename?: 'Query'; data: IProductType[] }
}

export type TBaseProduct = Partial<IProduct>

export interface ITeacher {
  id: string
  name: string
  photoUrl: string
  teacherTime: number
  education: string
  seniority: string
  experience: string
  carryPrize: string
  tags: string
}

export type TBaseTeacher = Partial<ITeacher>
export interface TTeachersQuery {
  [key: string]: { __typename?: 'Query'; data: ITeacher[]; page: IPage }
}
export interface TTeacherQuery {
  [key: string]: { __typename?: 'Query'; data: ITeacher }
}

export interface IScheduleRecord {
  id: string
  status: string
  student: IStudent
}
export interface ISchedule {
  id: string
  schoolDay: string
  startTime: string
  endTime: string
  limitNumber: number // 限制上课人数
  course: ICourse
  org: IOrganization
  scheduleRecords: IScheduleRecord[]
}

export interface TSchedulesQuery {
  [key: string]: { __typename?: 'Query'; data: ISchedule[] }
}
