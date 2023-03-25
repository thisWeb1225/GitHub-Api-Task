import { useEffect, useState } from "react"

import Issue from "./Issue"

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


  const searchIssueTitle = (keyword: string) => {
    setFilteredIssuesList(() => {
      return issuesList.filter((issue => issue.title.toLowerCase().includes(keyword.toLocaleLowerCase())))
    })
  }

  const chooseStatus = (status: string) => {
    if (status === 'All') {
      setFilteredIssuesList(issuesList)
    } else {
      setFilteredIssuesList(() => {
        return issuesList.filter(issue => issue.labels[0]?.name === status)
      })
    }
  }

  const sortWithTime = (time: string) => {
    if (time === 'New') {
      setFilteredIssuesList(issuesList)
    } else {
      setFilteredIssuesList([...issuesList].reverse())
    }
  }

  return (
    <>
      <section className="filter">
        <select
          name="status"
          title="choose status"
          className="filter__input filter__input-status"
          onChange={(e) => chooseStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <select
          name="time"
          title="sort with time"
          className="filter__input filter__input-time"
          onChange={(e) => sortWithTime(e.target.value)}
        >
          <option value="New">From New</option>
          <option value="Old">From Old</option>
        </select>

        <input type="text" className="filter__input filter__input-search" placeholder="Search" onChange={(e) => searchIssueTitle(e.target.value)} />


      </section>
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