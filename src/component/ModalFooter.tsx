type PropsType = {
  isEdit: boolean,
  closeIssueModal: () => void,
  saveIssue: () => void,
  isCreate: boolean
}

const ModalFooter = ({ isEdit, closeIssueModal, saveIssue, isCreate }: PropsType) => {

  const confirmText = isCreate ? 'send' : 'store';

  return (
    <div className='modal__issue-btn'>
      {isEdit
        ? (<>
          <button onClick={closeIssueModal} className="btn-danger">cancel</button>
          <button onClick={saveIssue}>{confirmText}</button>
        </>)
        : <button onClick={closeIssueModal} className="btn-danger">close</button>
      }
    </div>
  )
}

export default ModalFooter