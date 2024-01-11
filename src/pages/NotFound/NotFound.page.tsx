import { Button, Container, Image, SimpleGrid, Text, Title } from '@mantine/core'
import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './NotFound.module.css'

const NotFound: FC = () => {
  const nav = useNavigate()

  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src="/NotFoundImage.svg" className={classes.mobileImage} />

        <div>
          <Title className={classes.title}>Something is not right...</Title>

          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped the address,
            or the page has been moved to another URL. If you think this is an error
            contact support.
          </Text>

          <Button
            mt="xl"
            size="md"
            variant="outline"
            className={classes.control}
            onClick={() => nav('/')}
          >
            Get back to home page
          </Button>
        </div>

        <Image src="/NotFoundImage.svg" className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  )
}

export default NotFound
