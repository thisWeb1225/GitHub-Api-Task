import './../css/Issue.css'
import { IssueType } from '../context/IssuesProvider';
import { ReducerAction } from '../context/IssuesProvider';
import { ReducerActionType } from '../context/IssuesProvider';

import IssueModal from './IssueModal';
import { useState } from 'react';


type PropsType = {
  issue: IssueType,
  dispatch: React.Dispatch<ReducerAction>,
  REDUCER_ACTIONS: ReducerActionType
}

const Issue = ({ issue, dispatch, REDUCER_ACTIONS }: PropsType) => {

  const [isModalShow, setIsModalShow] = useState<boolean>(false)

  const { title, body, state, number } = issue;

  const openIssueModal = () => {
    setIsModalShow(true)
  }

  return (
    <>
      <div className='issueCard' onClick={openIssueModal}>
        <h2 className='issueCard__title'>{title}</h2>
        <p className='issueCard__body'>{body}</p>
      </div>
      <IssueModal
        issue={issue}
        dispatch={dispatch}
        REDUCER_ACTIONS={REDUCER_ACTIONS}
        isModalShow={isModalShow}
        setIsModalShow={setIsModalShow}
      />
    </>

  )
}

export default Issue
