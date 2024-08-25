import { MagnifyingGlass } from '@phosphor-icons/react'
// import { useState } from 'react'
// import { SearchBar } from '../SearchBar'

export function Search(): JSX.Element {
  // const [isSearchBarOpen, setIsSearchBarOpen] = useState<boolean>(false)

  // function handleOpenChange(isOpen: boolean) {
  //   setIsSearchBarOpen(isOpen)
  // }

  return (
    <>
      <button
        // onClick={() => handleOpenChange(true)}
        className="flex mx-4 p-1 items-center gap-2 text-blackfont-500 text-sm hover:text-blackfont-500/80 transition-colors"
      >
        <MagnifyingGlass className="w-5 h-5" />
        Search
      </button>

      {/* <SearchBar open={isSearchBarOpen} onOpenChange={handleOpenChange} /> */}
    </>
  )
}
