import * as Navigation from './Navigation'
import * as Collapsible from '@radix-ui/react-collapsible'
import clsx from 'clsx'
import { SidebarSimple } from '@phosphor-icons/react'
// import { CreatePage } from './CreatePage'
import { Search } from './Search'
// import { useQuery } from '@tanstack/react-query'

export function Sidebar(): JSX.Element {
  const isMacOS = process.platform === 'darwin'

  // const { data } = useQuery(['documents'], async () => {
  //   const res = await window.api.fetchDocuments()

  //   return res.data
  // })

  return (
    <Collapsible.Content className="flex-shrink-0 border-r border-grey-600 h-screen relative group data-[state=open]:animate-slideIn data-[state=closed]:animate-slideOut overflow-hidden">
      <Collapsible.Trigger
        className={clsx(
          'absolute h-5 w-5 right-4 text-grey-800 hover:text-grey-800/70 inline-flex items-center justify-center z-10',
          {
            'top-[1.125rem]': isMacOS,
            'top-6': !isMacOS
          }
        )}
      >
        <SidebarSimple weight="bold" className="h-4 w-4" />
      </Collapsible.Trigger>

      <div
        className={clsx('region-drag h-6', {
          block: isMacOS,
          hidden: !isMacOS
        })}
      />
      <div
        className={clsx('h-6', {
          block: isMacOS,
          hidden: !isMacOS
        })}
      />

      <div
        className={clsx(
          'flex-1 flex flex-col gap-4 h-full w-[240px] group-data-[state=open]:opacity-100 group-data-[state=closed]:opacity-0 transition-opacity duration-200',
          {
            'pt-6': !isMacOS
          }
        )}
      >
        <Search />
        <Navigation.Root>
          <Navigation.Section>
            <Navigation.SectionTitle>Projects</Navigation.SectionTitle>
            <Navigation.SectionContent>
              {/* {data?.map((document) => (
                <Navigation.Link to={`/document/${document.id}`} key={document.id}>
                  {document.title || 'Untitled'}
                </Navigation.Link>
              ))} */}
              <Navigation.Link to="">Primeira pasta</Navigation.Link>
              <Navigation.Link to="">Segunda pasta</Navigation.Link>
              <Navigation.Link to="">Draft</Navigation.Link>
            </Navigation.SectionContent>
          </Navigation.Section>
        </Navigation.Root>

        {/* <CreatePage /> */}
      </div>
    </Collapsible.Content>
  )
}
