import { Box, Collapse, Group, Text, ThemeIcon, UnstyledButton, rem } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'
import clsx from 'clsx'
import { FC, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import classes from './NavbarLinksGroup.module.css'

interface LinksGroupProps {
  icon?: FC<any>
  name: string
  path: string
  hideInMenu?: boolean
  initiallyOpened?: boolean
  links?: Array<{ name: string; path: string }>
}

export function LinksGroup({
  icon: Icon,
  name,
  path,
  hideInMenu,
  initiallyOpened,
  links
}: LinksGroupProps) {
  const { pathname } = useLocation()
  const nav = useNavigate()
  const [opened, setOpened] = useState(initiallyOpened || false)

  const hasLinks = Array.isArray(links)
  const items = (hasLinks ? links : []).map((link) => (
    <Text<'a'>
      component="a"
      key={link.name}
      href={link.path}
      className={classes.link}
      onClick={() => nav(link.path, { replace: true })}
    >
      {link.name}
    </Text>
  ))

  return (
    <>
      {!hideInMenu && !!Icon && (
        <UnstyledButton
          onClick={() => setOpened((o) => !o)}
          className={clsx(classes.control, pathname === path && classes.active)}
        >
          <Group
            gap={0}
            justify="space-between"
            onClick={() => nav(path, { replace: true })}
          >
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <ThemeIcon variant="light" size={30}>
                <Icon style={{ width: rem(18), height: rem(18) }} />
              </ThemeIcon>

              <Box ml="md">{name}</Box>
            </Box>

            {hasLinks && (
              <IconChevronRight
                className={classes.chevron}
                stroke={1.5}
                style={{
                  width: rem(16),
                  height: rem(16),
                  transform: opened ? 'rotate(-90deg)' : 'none'
                }}
              />
            )}
          </Group>
        </UnstyledButton>
      )}

      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  )
}
