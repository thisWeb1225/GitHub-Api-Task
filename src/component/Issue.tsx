import './Issue.css'
import { IssueType } from '../context/IssuesProvider';
import { ReducerAction } from '../context/IssuesProvider';
import { ReducerActionType } from '../context/IssuesProvider';


type PropsType = {
  issue: IssueType,
  dispatch: React.Dispatch<ReducerAction>,
  REDUCER_ACTIONS: ReducerActionType
}

const Issue = ({ issue, dispatch, REDUCER_ACTIONS }: PropsType) => {

  const { title, body, state, number } = issue;

  return (
    <div>
      <h2 className='issueCard__title'>{title}</h2>
      <p className='issueCard__body'>{body}</p>
    </div>
  )
}

export default Issue
