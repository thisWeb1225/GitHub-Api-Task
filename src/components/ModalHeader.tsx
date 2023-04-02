// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

type PropsType = {
  title: string,
  isEdit: boolean,
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>,
  deleteIssue: () => void,
  isCreate: boolean,
}

const ModalHeader = ({ title, isEdit, setIsEdit, deleteIssue, isCreate }: PropsType) => {
  const editIssue = () => {
    setIsEdit(!isEdit)
  }

  return (
    <div className='modal__header'>
      <h2 className="modal__title">{title}</h2>
      <FontAwesomeIcon icon={faPenToSquare} className={`modal__header-btn ${isEdit} btn-edit`} onClick={editIssue} />
      {isCreate
        ? <></>
        : <FontAwesomeIcon icon={faTrash} className="modal__header-btn btn-delete" onClick={deleteIssue} />
      }
    </div>
  )
}

export default ModalHeader