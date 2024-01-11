import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const NoOrg: FC = () => {
  const nav = useNavigate()

  return (
    <>
      <div onClick={() => nav('/111')}>NoOrg</div>
    </>
  )
}

export default NoOrg
