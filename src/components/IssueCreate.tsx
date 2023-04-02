import { useState } from "react";
import IssueModal from "./IssueModal";
import { IssueType } from "../context/IssuesProvider";

const IssueCreate = () => {
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
        isCreate={true}
      />
    </>
  )
}

export default IssueCreate