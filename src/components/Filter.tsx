import { IssueType } from "../context/IssuesProvider"
import './../css/Filter.css'


type PropsType = {
  issuesList: IssueType[],
  filteredIssuesList: any[],
  setFilteredIssuesList: React.Dispatch<React.SetStateAction<any[]>>
}

const Filter = ({ issuesList, filteredIssuesList, setFilteredIssuesList }: PropsType) => {

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
  )
}

export default Filter;