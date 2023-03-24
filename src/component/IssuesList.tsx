import { useEffect, useState } from "react"

import Issue from "./Issue"

import useIssuesList from "../hook/useIssuesList"
import api from "../api/api"

import './../css/IssuesList.css'

const IssuesList = () => {
  const [shouldRenderIssues, setShouldRenderIssues] = useState(true)

  const { dispatch, REDUCER_ACTIONS, issuesList } = useIssuesList();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;
    const getRepoIssues = async () => {
      const data = await api.getRepoIssues(token, 1);
      dispatch({ type: REDUCER_ACTIONS.GET, listPayload: data });
    }

    if (shouldRenderIssues) {
      console.log(issuesList)
      getRepoIssues()
      setShouldRenderIssues(false)
    }

  }, [issuesList, shouldRenderIssues])


  return (
    <main className="issuesList">
      {issuesList.map(issue => {
        return (
          <Issue
            issue={issue}
            key={issue.number}
            dispatch={dispatch}
            REDUCER_ACTIONS={REDUCER_ACTIONS}
            setShouldRenderIssues={setShouldRenderIssues}
          />
        )
      })}
    </main>
  )
}

export default IssuesList