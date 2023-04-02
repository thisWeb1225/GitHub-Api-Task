import { useEffect, useState, useRef } from "react"

import Issue from "./Issue"
import Filter from "./Filter"
import IssueCreate from "./IssueCreate"

import useIssuesList from "../hook/useIssuesList"
import api from "../api/api"

import './../css/IssuesList.css'

const IssuesList = () => {
  const [filteredIssuesList, setFilteredIssuesList] = useState([] as any[]);
  const page = useRef(1);
  const direction = useRef<'desc' | 'asc'>('desc');
  const { dispatch, REDUCER_ACTIONS, issuesList } = useIssuesList();

  function clearIssuesList() {
    page.current = 1;
    dispatch({ type: REDUCER_ACTIONS.CLEAR })
  }

  // update filtered issues state when issuesList update
  useEffect(() => {
    setFilteredIssuesList(issuesList)
  }, [issuesList])

  // when scroll to bottom, fetch 10 more issues
  const observer = useRef<IntersectionObserver>();
  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const token = localStorage.getItem('accessToken');
          if (!token) return;
          const getRepoIssues = async () => {
            const data = await api.getRepoIssues(token, page.current, direction.current);

            if (data.length !== 0) {
              page.current++;
              dispatch({ type: REDUCER_ACTIONS.UPDATE_ALL, listPayload: data });
            }
          }

          getRepoIssues()
        }
      }
    ), {};

    observer.current.observe(document.querySelector('.footer')!);

    return () => {
      if (observer.current) observer.current.disconnect();
    }
  }, [])

  return (
    <>
      <Filter
        clearIssuesList={clearIssuesList}
        setFilteredIssuesList={setFilteredIssuesList}
        direction={direction}
      />
      <IssueCreate />
      <main className="issuesList">
        {filteredIssuesList.map(issue => {
          return (
            <Issue
              issue={issue}
              key={issue.number}
            />
          )
        })}
      </main>
      <footer className="footer">
        thisWeb &copy; 2023
      </footer>
    </>
  )
}

export default IssuesList