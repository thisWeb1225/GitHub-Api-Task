import { useState } from "react";
import IssueModal from "./IssueModal";
import { IssueType } from "../context/IssuesProvider";

type PropsType = {
  setShouldRenderIssues: React.Dispatch<React.SetStateAction<boolean>>,
  isCreate: boolean,
}

const IssueCreate = ({ setShouldRenderIssues }: PropsType) => {
  const initIssueState = {
    title: 'New Issue',
    body: '',
    labels: ['open']
  }

  const [issue, setIssue] = useState(initIssueState as IssueType)
  const [isModalShow, setIsModalShow] = useState(false)

  const createIssue = () => {
    setIsModalShow(true)
  }

  return (
    <>
      <button
        className="create__btn"
        onClick={createIssue}
      >
        Create Issue
      </button>
      <IssueModal
        issue={issue}
        isModalShow={isModalShow}
        setIsModalShow={setIsModalShow}
        setShouldRenderIssues={setShouldRenderIssues}
        isCreate={true}
      />
    </>
  )
}

export default IssueCreate