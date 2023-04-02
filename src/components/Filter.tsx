import { useState, useRef } from "react"
import useIssuesList from "../hook/useIssuesList"
import api from "../api/api"
import './../css/Filter.css'


type PropsType = {
  clearIssuesList: () => void,
  direction: React.MutableRefObject<"desc" | "asc">,
  labels: React.MutableRefObject<string>,
  isSearch: React.MutableRefObject<boolean>,
}

const Filter = ({ clearIssuesList, direction, labels, isSearch }: PropsType) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const { dispatch, REDUCER_ACTIONS } = useIssuesList();

  const searchBar = useRef<HTMLInputElement>(null)

  const chooseLabels = (lablesParam: string) => {
    clearIssuesList()
    if (lablesParam === 'All') {
      labels.current = '';
    } else {
      labels.current = lablesParam;
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
      clearIssuesList();
      isSearch.current = true;
      const response = await api.search(token, searchKeyword);
      dispatch({ type: REDUCER_ACTIONS.SEARCH, listPayload: response.items });
    }
  }

  const cancelSearch = () => {
    clearIssuesList();
    searchBar.current!.value = '';
    isSearch.current = false;
  }


  return (
    <section className="filter">
      <select
        name="status"
        title="choose status"
        className="filter__input filter__input-status"
        onChange={(e) => chooseLabels(e.target.value)}
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
        <input
          ref={searchBar}
          type="text"
          className="filter__input filter__input-search"
          placeholder="Search Body"
          onChange={(e) => setSearchKeyword(e.target.value)} />
        <button onClick={search}>Search</button>
        {isSearch.current
          ? <button onClick={cancelSearch}>Cancel</button>
          : <></>}
      </div>
    </section>
  )
}

export default Filter;