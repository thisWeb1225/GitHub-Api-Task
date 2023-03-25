// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

type PropsType = {
  title: string,
  isEdit: boolean,
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>,
}

const ModalHeader = ({ title, isEdit, setIsEdit }: PropsType) => {
  const handleEdit = () => {
    setIsEdit(!isEdit)
  }

  return (
    <div className='modal__header'>
      <h2 className="modal__title">Issue Name : {title}</h2>
      <FontAwesomeIcon icon={faTrash} className="modal__header-btn" />
      <FontAwesomeIcon icon={faPenToSquare} className="modal__header-btn" onClick={handleEdit} />
    </div>
  )
}

export default ModalHeader