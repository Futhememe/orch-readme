// import * as Navigation from './Navigation'
import * as Collapsible from '@radix-ui/react-collapsible'
import clsx from 'clsx'
import { SidebarSimple } from '@phosphor-icons/react'
// import { CreatePage } from './CreatePage'
// import { Profile } from './Profile'
// import { Search } from './Search'
// import { useQuery } from '@tanstack/react-query'

export function Sidebar(): JSX.Element {
  const isMacOS = process.platform === 'darwin'

  // const { data } = useQuery(['documents'], async () => {
  //   const res = await window.api.fetchDocuments()

  //   return res.data
  // })

  return (
    <Collapsible.Content className="bg-rotion-800 flex-shrink-0 border-r border-rotion-600 h-screen relative group data-[state=open]:animate-slideIn data-[state=closed]:animate-slideOut overflow-hidden">
      <Collapsible.Trigger
        className={clsx(
          'absolute h-5 w-5 right-4 text-grey-600 hover:text-rotion-50 inline-flex items-center justify-center z-10',
          {
            'top-[1.125rem]': isMacOS,
            'top-6': !isMacOS
          }
        )}
      >
        <SidebarSimple className="h-4 w-4" />
      </Collapsible.Trigger>

      {/* <div
        className={clsx('region-drag h-14', {
          block: isMacOS,
          hidden: !isMacOS
        })}
      ></div> */}

      <div
        className={clsx(
          'flex-1 flex flex-col gap-8 h-full w-[240px] group-data-[state=open]:opacity-100 group-data-[state=closed]:opacity-0 transition-opacity duration-200',
          {
            'pt-6': !isMacOS
          }
        )}
      >
        {/* <Profile />
        <Search />

        <Navigation.Root>
          <Navigation.Section>
            <Navigation.SectionTitle>Workspace</Navigation.SectionTitle>
            <Navigation.SectionContent>
              {data?.map((document) => (
                <Navigation.Link to={`/document/${document.id}`} key={document.id}>
                  {document.title || 'Untitled'}
                </Navigation.Link>
              ))}
            </Navigation.SectionContent>
          </Navigation.Section>
        </Navigation.Root>

        <CreatePage /> */}
      </div>
    </Collapsible.Content>
  )
}
