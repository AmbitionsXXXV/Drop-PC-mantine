import { COMMIT_ORG, DEL_ORG, GET_ORG, GET_ORGS, GET_SAMPLE_ORGS } from '@/graphql/org'
import { DEFAULT_PAGE_SIZE } from '@/utils/constants'
import { TBaseOrganization, TOrgQuery, TOrgsQuery } from '@/utils/types'
import { useMutation, useQuery } from '@apollo/client'
import { toast } from 'sonner'

export const useOrganizations = (
  pageNum = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  isSample = false
) => {
  const { loading, data, refetch } = useQuery<TOrgsQuery>(
    isSample ? GET_SAMPLE_ORGS : GET_ORGS,
    {
      variables: {
        page: {
          pageNum,
          pageSize
        }
      }
    }
  )

  return {
    loading,
    refetch,
    page: data?.getOrganizations.page,
    data: data?.getOrganizations.data
  }
}

export const useOrganization = (id: string) => {
  const { loading, data } = useQuery<TOrgQuery>(GET_ORG, {
    variables: {
      id
    }
  })

  return {
    loading,
    data: data?.getOrganizationInfo.data
  }
}

export const useEditInfo = (): [handleEdit: Function, loading: boolean] => {
  const [edit, { loading }] = useMutation(COMMIT_ORG)

  const handleEdit = async (id: number, params: TBaseOrganization) => {
    const res = await edit({
      variables: {
        id,
        params
      }
    })

    toast.info(res.data.commitOrganization.message)
  }

  return [handleEdit, loading]
}

export const useDeleteOrg = (): [handleEdit: Function, loading: boolean] => {
  const [del, { loading }] = useMutation(DEL_ORG)

  const delHandler = async (id: number, callback: () => void) => {
    const res = await del({
      variables: {
        id
      }
    })

    if (res.data.deleteOrganization.code === 200) {
      toast.success(res.data.deleteOrganization.message)
      callback()

      return
    }

    toast.error(res.data.deleteOrganization.message)
  }

  return [delHandler, loading]
}
