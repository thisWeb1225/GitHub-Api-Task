import useIssuesList from "../hook/useIssuesList"
import api from "../api/api"
import { useEffect } from "react"
import Issue from "./Issue"

type PropsType = {
  token: string
}

const IssuesList = ({ token }: PropsType) => {
  const { dispatch, REDUCER_ACTIONS, issuesList } = useIssuesList();

  useEffect(() => {
    if (!token) return;
    const getRepoIssues = async () => {
      const data = await api.getRepoIssues(token, 1)
      dispatch({ type: REDUCER_ACTIONS.GET, listPayload: data });
    }
    getRepoIssues()

  }, [])

  useEffect(() => {
    console.log(issuesList)
  }, [issuesList])


  return (
    <main className="issuesList">
      {issuesList.map(issue => {
        return (
          <Issue
            issue={issue}
            key={issue.number}
            dispatch={dispatch}
            REDUCER_ACTIONS={REDUCER_ACTIONS}
          />
        )
      })}
    </main>
  )
}

export default IssuesList