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
  const [editedLabel, setEditedLabel] = useState('');

  const { number, title, body, state, labels } = issue;
  const status = labels[0]?.name;
  console.log(status)

  const closeIssueModal = () => {
    setIsModalShow(() => false);
  }

  const saveIssueModal = () => {
    if (editedBody.trim().length < 30) {
      alert('內容要超過 30 字');
      return;
    }
    if (!(editedTitle.trim())) {
      alert('必須填入標題')
      return
    }

    // api
    const updateIssue = async () => {
      if (window.confirm('確定要儲存嗎？')) {
        const token = localStorage.getItem('accessToken');
        if (!token) return
        const data = await api.updateIssue(token, { number, editedTitle, editedBody, editedState });
        console.log(data)
        setShouldRenderIssues(true);
        setIsModalShow(false);
      } else {
        return
      }
    }

    updateIssue();
  }

  useEffect(() => {
    if (isModalShow) {
      setEditedTitle(title);
      setEditedBody(body);
      setEditedState(state);
      setIsEdit(false);
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
      <label className="modal__issue-label modal__content">
        status :
        <select name="label" id="label" className='modal__input' disabled={!isEdit} onChange={(e) => setEditedLabel(e.target.value)}>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </label>
      <label className="modal__issue-title modal__content">
        Title :
        <input
          className="modal__issue-titleInput modal__input"
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          disabled={!isEdit} />
      </label>
      <label className='modal__issue-body modal__content'>
        body :
        <textarea
          className='modal__issue-bodyInput modal__input'
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