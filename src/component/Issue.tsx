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
  setShouldRenderIssues: React.Dispatch<React.SetStateAction<boolean>>
}

const Issue = ({ issue, dispatch, REDUCER_ACTIONS, setShouldRenderIssues }: PropsType) => {

  const [isModalShow, setIsModalShow] = useState<boolean>(false)

  const { title, body, state, number, labels } = issue;
  const status: string = labels[0]?.name.toLowerCase();

  const openIssueModal = () => {
    setIsModalShow(true)
  }

  return (
    <>
      <div className='issue' onClick={openIssueModal}>
        <h2 className='issue__title'>
          <span className={`issue__state ${status}`}></span>
          {title}
        </h2>
        <p className='issue__body'>{body}</p>
      </div>
      <IssueModal
        issue={issue}
        dispatch={dispatch}
        REDUCER_ACTIONS={REDUCER_ACTIONS}
        isModalShow={isModalShow}
        setIsModalShow={setIsModalShow}
        setShouldRenderIssues={setShouldRenderIssues}
      />
    </>

  )
}

export default Issue
