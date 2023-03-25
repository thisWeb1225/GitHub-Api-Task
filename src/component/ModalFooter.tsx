type PropsType = {
  isEdit: boolean,
  closeIssueModal: () => void;
  saveIssueModal: () => void;
}

const ModalFooter = ({ isEdit, closeIssueModal, saveIssueModal }: PropsType) => {

  return (
    <div className='modal__issue-btn'>
      {isEdit
        ? (<>
          <button onClick={closeIssueModal} className="btn-danger">cancel</button>
          <button onClick={saveIssueModal}>store</button>
        </>)
        : <button onClick={closeIssueModal} className="btn-danger">close</button>
      }
    </div>
  )
}

export default ModalFooter