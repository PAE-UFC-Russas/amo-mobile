import { createContext, useContext, useState } from "react";

export const SubjectContext = createContext({});

export default function SubjectContextProvider({ children }) {
  const [subject, setSubject] = useState();
  const [course, setCourse] = useState();

  function EditSubject(subject) {
    setSubject(subject);
  }

  function EditCourse(course) {
    setCourse(course);
  }

  return (
    <SubjectContext.Provider
      value={{
        EditSubject,
        EditCourse,
        subject,
        course,
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
}

export function useSubject() {
  const context = useContext(SubjectContext);

  return context;
}
