import { useCourses } from '@/service/course'
import { Table } from '@mantine/core'
import { useState, type FC } from 'react'
import { tableData } from './constants'

const Course: FC = () => {
  const [curId, setCurId] = useState('')
  const { refetch } = useCourses()
  const [showInfo, setShowInfo] = useState(false)
  const [showOrderTime, setShowOrderTime] = useState(false)
  const [showCard, setShowCard] = useState(false)

  const onClickAddHandler = (id?: string) => {
    if (id) {
      setCurId(id)
    } else {
      setCurId('')
    }
    setShowInfo(true)
  }

  const onOrderTimeHandler = (id: string) => {
    setCurId(id)
    setShowOrderTime(true)
  }

  const onCardHandler = (id: string) => {
    setCurId(id)
    setShowCard(true)
  }

  return (
    <>
      <div>Course</div>

      <Table.ScrollContainer minWidth={800}>
        <Table striped verticalSpacing="xs" data={tableData} />
      </Table.ScrollContainer>
    </>
  )
}

export default Course
