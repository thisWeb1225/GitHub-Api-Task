import { createContext, useState, ReactElement } from "react";

interface IssueType {
  id: number;
  title: string;
  body: string;
  state: string;
}

const IssuesContext = createContext<IssueType[]>([] as IssueType[])

type ChildrenType = { children?: ReactElement | ReactElement[] }

const IssuesProvider = ({ children }: ChildrenType) => {
  const [issues, setIssues] = useState([]);

  return (
    <IssuesContext.Provider value={issues}>
      {children}
    </IssuesContext.Provider>
  )
}

