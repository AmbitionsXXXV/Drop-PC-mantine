import { AUTO_CREATE_SCHEDULE, GET_SCHEDULES } from '@/graphql/dashboard'
import { TSchedulesQuery } from '@/utils/types'
import { useMutation, useQuery } from '@apollo/client'
import { toast } from 'sonner'

/**
 * 自动创建课程表
 */
export const useAutoCreateSchedule = (): [handleEdit: Function, loading: boolean] => {
  const [run, { loading }] = useMutation(AUTO_CREATE_SCHEDULE)

  const handleRun = async (startDay: string, endDay: string) => {
    const res = await run({
      variables: {
        startDay,
        endDay
      }
    })

    toast.info(res.data.autoCreateSchedule.message)
  }

  return [handleRun, loading]
}

/**
 * 获取某天课程表
 */
export const useSchedules = (today: string) => {
  const { data, loading, refetch } = useQuery<TSchedulesQuery>(GET_SCHEDULES, {
    variables: {
      today
    }
  })

  return {
    loading,
    refetch,
    data: data?.getSchedules.data
  }
}
