type PropsType = {
  isEdit: boolean,
  closeIssueModal: () => void,
  saveIssue: () => void,
}

const ModalFooter = ({ isEdit, closeIssueModal, saveIssue }: PropsType) => {

  return (
    <div className='modal__issue-btn'>
      {isEdit
        ? (<>
          <button onClick={closeIssueModal} className="btn-danger">cancel</button>
          <button onClick={saveIssue}>store</button>
        </>)
        : <button onClick={closeIssueModal} className="btn-danger">close</button>
      }
    </div>
  )
}

export default ModalFooter