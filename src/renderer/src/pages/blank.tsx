import { Button } from '@renderer/shadcn/components/ui/button'

import emoticonsrc from '@renderer/assets/wow-emoticon.svg'
import plantsrc from '@renderer/assets/plant.svg'
import reticencesleftsrc from '@renderer/assets/reticences-left.svg'
import reticencesrightsrc from '@renderer/assets/reticences-right.svg'
import { useNavigate } from 'react-router-dom'

export function Blank(): JSX.Element {
  const navigate = useNavigate()

  return (
    <div className="items-center justify-center flex flex-1 flex-col">
      <div className="relative items-center justify-center flex flex-col">
        <h2 className="text-[2.5rem] font-medium">Welcome to</h2>
        <h1 className="text-[4rem] font-[501]">Orch Readme</h1>
        <Button onClick={() => navigate('/document/novo')} variant="default" className="mt-[24px]">
          Create document
        </Button>
        <p className="text-[1rem] mt-[14px]">or</p>
        <Button onClick={() => navigate('/project/novo')} variant="link">
          import project
        </Button>

        <img className="absolute left-[-80px] bottom-[70px]" src={emoticonsrc} alt="" />
        <img className="absolute right-[-60px] top-[-80px]" src={plantsrc} alt="" />
        <img className="absolute left-[-80px] top-0" src={reticencesleftsrc} alt="" />
        <img className="absolute right-[-96px] bottom-[70px]" src={reticencesrightsrc} alt="" />
      </div>
    </div>
  )
}
