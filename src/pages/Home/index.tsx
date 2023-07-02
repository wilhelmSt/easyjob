import { useState } from "react";
import Header, { HeaderProps } from "../../components/Header"


export default function Home(): JSX.Element {
  const [isTeacher, setIsTeacher] = useState(false)

  const headerProps: HeaderProps = {
    isTeacher,
    setIsTeacher
  }

  return (
    <>
      <Header {...headerProps} />
      
    </>
  );
}