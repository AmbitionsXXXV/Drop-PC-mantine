import { useGoTo } from '@/hooks'
import { useUserContext } from '@/hooks/userHooks'
import { useOrganizations } from '@/service/org'
import { currentOrg } from '@/utils'
import { LOCAL_CURRENT_ORG } from '@/utils/constants'
import { ComboboxItem, Select, Space } from '@mantine/core'
import _ from 'lodash'
import { useEffect, useState } from 'react'

/**
 *  门店选择器
 */
const OrgSelect = () => {
  const [options, setOptions] = useState<
    | Array<{
        label: string
        value: string
      }>
    | undefined
  >([])
  const { data, refetch } = useOrganizations(1, 10, true)
  const { go } = useGoTo()
  const { setStore } = useUserContext()

  const onSearchHandler = _.debounce((name: string) => {
    refetch({
      name
    })
  }, 500)

  const onChangeHandler = (_value: string | null, option: ComboboxItem) => {
    setStore({
      currentOrg: option.value
    })
    localStorage.setItem(LOCAL_CURRENT_ORG, JSON.stringify(option))
  }

  // useEffect(() => {
  //   if (currentOrg()?.value) {
  //     setStore({
  //       currentOrg: currentOrg().value
  //     })
  //   } else {
  //     go(ROUTE_KEY.NO_ORG)
  //   }
  // }, [])

  useEffect(() => {
    const _options = data?.map((item) => ({ label: item.name, value: item.id }))

    setOptions(_options)
  }, [data])

  return (
    <Space h="100%" className="flex items-center justify-center">
      选择门店：
      <Select
        searchable
        data={options}
        style={{ width: 200 }}
        placeholder="请选择门店"
        defaultValue={currentOrg()}
        // @ts-ignore
        onChange={onChangeHandler}
        onSearchChange={onSearchHandler}
      />
    </Space>
  )
}

export default OrgSelect
