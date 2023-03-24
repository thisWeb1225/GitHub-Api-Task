import { useContext } from "react";
import IssuesListContext from "../context/IssuesProvider";
import { UseIssuesListContextType } from "../context/IssuesProvider";

const useIssuesList = (): UseIssuesListContextType => {
  return useContext(IssuesListContext);
}

export default useIssuesList;