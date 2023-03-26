import { useEffect, useState } from "react"

import Issue from "./Issue"
import Filter from "./Filter"
import IssueCreate from "./IssueCreate"

import useIssuesList from "../hook/useIssuesList"
import api from "../api/api"

import './../css/IssuesList.css'

const IssuesList = () => {
  const [filteredIssuesList, setFilteredIssuesList] = useState([] as any[]);
  const [shouldRenderIssues, setShouldRenderIssues] = useState(true);

  const { dispatch, REDUCER_ACTIONS, issuesList } = useIssuesList();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;
    const getRepoIssues = async () => {
      const data = await api.getRepoIssues(token, 1);
      dispatch({ type: REDUCER_ACTIONS.GET, listPayload: data });
    }

    if (shouldRenderIssues) {
      getRepoIssues()
      setShouldRenderIssues(false)
    }

  }, [issuesList, shouldRenderIssues])

  useEffect(() => {
    setFilteredIssuesList(issuesList)
  }, [issuesList])

  const createIssue = () => {

  }

  return (
    <>
      <Filter
        issuesList={issuesList}
        filteredIssuesList={filteredIssuesList}
        setFilteredIssuesList={setFilteredIssuesList}
      />
      <IssueCreate
        setShouldRenderIssues={setShouldRenderIssues}
        isCreate={true}
      />
      <main className="issuesList">
        {filteredIssuesList.map(issue => {
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
    </>
  )
}

export default IssuesList