import { routes } from '@/routes/menu'
import { AppShell, ScrollArea } from '@mantine/core'
import { LinksGroup } from '../NavbarLinksGroup/NavbarLinksGroup'
import { UserButton } from '../UserButton/UserButton'
import classes from './NavbarNested.module.css'

const { Navbar } = AppShell

// const mockdata = [
//   { label: 'Dashboard', icon: IconGauge },
//   {
//     label: 'Market news',
//     icon: IconNotes,
//     initiallyOpened: true,
//     links: [
//       { label: 'Overview', link: '/' },
//       { label: 'Forecasts', link: '/' },
//       { label: 'Outlook', link: '/' },
//       { label: 'Real time', link: '/' }
//     ]
//   },
//   {
//     label: 'Releases',
//     icon: IconCalendarStats,
//     links: [
//       { label: 'Upcoming releases', link: '/' },
//       { label: 'Previous releases', link: '/' },
//       { label: 'Releases schedule', link: '/' }
//     ]
//   },
//   { label: 'Analytics', icon: IconPresentationAnalytics },
//   { label: 'Contracts', icon: IconFileAnalytics },
//   { label: 'Settings', icon: IconAdjustments },
//   {
//     label: 'Security',
//     icon: IconLock,
//     links: [
//       { label: 'Enable 2FA', link: '/' },
//       { label: 'Change password', link: '/' },
//       { label: 'Recovery codes', link: '/' }
//     ]
//   }
// ]

export function NavbarNested() {
  const links = routes.map((item) => <LinksGroup {...item} key={item.name} />)

  return (
    <Navbar className={classes.navbar}>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton />
      </div>
    </Navbar>
  )
}
