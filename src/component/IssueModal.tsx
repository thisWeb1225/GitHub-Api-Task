import Modal from 'react-modal';
import { useEffect, useState } from 'react';

// type and provider
import { IssueType } from '../context/IssuesProvider';
import { ReducerAction } from '../context/IssuesProvider';
import { ReducerActionType } from '../context/IssuesProvider';

// api
import api from '../api/api';

// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

// css
import './../css/IssueModal.css'

type PropsType = {
  issue: IssueType;
  dispatch: React.Dispatch<ReducerAction>,
  REDUCER_ACTIONS: ReducerActionType
  isModalShow: boolean;
  setIsModalShow: React.Dispatch<React.SetStateAction<boolean>>
  setShouldRenderIssues: React.Dispatch<React.SetStateAction<boolean>>

}

Modal.setAppElement('#root');

const IssueModal = ({ issue, dispatch, REDUCER_ACTIONS, isModalShow, setIsModalShow, setShouldRenderIssues }: PropsType) => {
  const [isEdited, setIsEdited] = useState(false);
  const [editedState, setEditedState] = useState('');
  const [editedTitle, setEditedTitle] = useState('');
  const [editedBody, setEditedBody] = useState('');
  const [rerender, setRerender] = useState(false);

  const { number, title, body, state } = issue

  const closeIssueModal = () => {
    setIsModalShow(() => false);
  }

  const saveIssueModal = () => {
    if (editedBody.trim().length < 30) {
      alert('內容要超過 30 字');
      return;
    }

    // api
    const updateIssue = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) return
      const data = await api.updateIssue(token, { number, editedTitle, editedBody, editedState });
      setShouldRenderIssues(true);
      setIsModalShow(false);
    }

    updateIssue();

  }

  useEffect(() => {
    if (isModalShow) {
      setEditedTitle(title);
      setEditedBody(body);
      setEditedState(state)
    } else {
      setEditedTitle('');
      setEditedBody('');
      setEditedState('');
    }
  }, [isModalShow])

  return (
    <Modal isOpen={isModalShow} onRequestClose={closeIssueModal}>
      <div className='modal__header'>
        <h2 className="modal__title">Issue Name : {title}</h2>
        <FontAwesomeIcon icon={faTrash} className="modal__header-btn" />
        <FontAwesomeIcon icon={faPenToSquare} className="modal__header-btn" />
      </div>
      <label className="modal__issue-title">
        Title :
        <input
          className="modal__issue-titleInput"
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          disabled={!isEdited} />
      </label>
      <label className='modal__issue-body'>
        body :
        <textarea
          className='modal__issue-bodyInput'
          value={editedBody}
          onChange={(e) => setEditedBody(e.target.value)}
          disabled={!isEdited}
        />
      </label>
      <div className='modal__issue-btn'>
        {isEdited
          ? (<>
            <button onClick={closeIssueModal} className="btn-danger">cancel</button>
            <button onClick={saveIssueModal}>store</button>
          </>)
          : <button onClick={closeIssueModal} className="btn-danger">close</button>
        }

      </div>
    </Modal>
  )
}

export default IssueModal;