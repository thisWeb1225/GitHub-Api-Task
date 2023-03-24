import useIssuesList from "../hook/useIssuesList"
import { useEffect, useState } from "react"

const IssuesList = () => {
  const { dispatch, REDUCER_ACTIONS, issuesList } = useIssuesList();

  useEffect(() => {
    dispatch({ type: REDUCER_ACTIONS.GET })
  }, [])

  return (
    <main>

    </main>
  )
}

export default IssuesList