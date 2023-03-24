import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { IssueType } from '../context/IssuesProvider';
import { ReducerAction } from '../context/IssuesProvider';
import { ReducerActionType } from '../context/IssuesProvider';
import api from '../api/api';

import './../css/IssueModal.css'

Modal.setAppElement('#root');

type PropsType = {
  issue: IssueType;
  dispatch: React.Dispatch<ReducerAction>,
  REDUCER_ACTIONS: ReducerActionType
  isModalShow: boolean;
  setIsModalShow: React.Dispatch<React.SetStateAction<boolean>>
  setShouldRenderIssues: React.Dispatch<React.SetStateAction<boolean>>

}

const IssueModal = ({ issue, dispatch, REDUCER_ACTIONS, isModalShow, setIsModalShow, setShouldRenderIssues }: PropsType) => {
  const [isEdited, setIsEdited] = useState<boolean>(true);
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
    }

    updateIssue();
    setIsModalShow(false);
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
      <h2>編輯 {title}</h2>
      <label className="modal__title">
        標題：
        <input
          className="modal__titleInput"
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          disabled={!isEdited} />
      </label>
      <label className='modal__body'>
        內容：
        <textarea
          className='modal__bodyInput'
          value={editedBody}
          onChange={(e) => setEditedBody(e.target.value)}
          disabled={!isEdited}
        />
      </label>
      <div>
        <button onClick={saveIssueModal}>儲存</button>
        <button onClick={closeIssueModal}>取消</button>
      </div>
    </Modal>
  )
}

export default IssueModal;