import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import ModalHeader from './ModalHeader';

// type and provider
import { IssueType } from '../context/IssuesProvider';
import { ReducerAction } from '../context/IssuesProvider';
import { ReducerActionType } from '../context/IssuesProvider';

// api
import api from '../api/api';

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
  const [isEdit, setIsEdit] = useState(true);
  const [editedState, setEditedState] = useState('');
  const [editedTitle, setEditedTitle] = useState('');
  const [editedBody, setEditedBody] = useState('');

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
      setIsEdit(false)
    } else {
      setEditedTitle('');
      setEditedBody('');
      setEditedState('');
      setIsEdit(false)
    }
  }, [isModalShow])

  return (
    <Modal isOpen={isModalShow} onRequestClose={closeIssueModal}>
      <ModalHeader title={title} isEdit={isEdit} setIsEdit={setIsEdit} />
      <label className="modal__issue-title">
        Title :
        <input
          className="modal__issue-titleInput"
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          disabled={!isEdit} />
      </label>
      <label className='modal__issue-body'>
        body :
        <textarea
          className='modal__issue-bodyInput'
          value={editedBody}
          onChange={(e) => setEditedBody(e.target.value)}
          disabled={!isEdit}
        />
      </label>
      <div className='modal__issue-btn'>
        {isEdit
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