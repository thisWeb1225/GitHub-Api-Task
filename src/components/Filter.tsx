import { useState } from "react"
import { IssueType } from "../context/IssuesProvider"
import useIssuesList from "../hook/useIssuesList"
import api from "../api/api"
import './../css/Filter.css'


type PropsType = {
  clearIssuesList: () => void,
  setFilteredIssuesList: React.Dispatch<React.SetStateAction<any[]>>,
  direction: React.MutableRefObject<"desc" | "asc">,
}

const Filter = ({ clearIssuesList, setFilteredIssuesList, direction }: PropsType) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const { dispatch, REDUCER_ACTIONS, issuesList } = useIssuesList();

  const chooseStatus = (status: string) => {
    if (status === 'All') {
      setFilteredIssuesList(issuesList)
    } else {
      setFilteredIssuesList(() => {
        return issuesList.filter(issue => issue.labels[0]?.name === status)
      })
    }
  }

  const changeDirection = (sort: string) => {
    clearIssuesList()
    const directionParam = sort === 'desc' ? 'desc' : 'asc';
    direction.current = directionParam;
  }

  const search = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const response = await api.search(token, searchKeyword);
      dispatch({ type: REDUCER_ACTIONS.SEARCH, listPayload: response.items })
    }
  }


  return (
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
        onChange={(e) => changeDirection(e.target.value)}
      >
        <option value="desc">From New</option>
        <option value="asc">From Old</option>
      </select>

      <div className="filter__searchBody">
        <input type="text"
          className="filter__input filter__input-search"
          placeholder="Search Body"
          onChange={(e) => setSearchKeyword(e.target.value)} />
        <button onClick={search}>Search</button>
      </div>
    </section>
  )
}

export default Filter;