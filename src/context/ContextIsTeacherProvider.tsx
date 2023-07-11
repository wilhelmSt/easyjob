import React, { Dispatch, SetStateAction } from 'react'

export const IsTeacherContext = React.createContext([false, () => {}] as [boolean, Dispatch<SetStateAction<boolean>>]);

export const ContextIsTeacherProvider = ({ children }: any) => {
  const [isTeacher, setIsTeacher] = React.useState<boolean>(false);

  return (
    <IsTeacherContext.Provider value={[isTeacher, setIsTeacher]}>
      {children}
    </IsTeacherContext.Provider>
  )
}