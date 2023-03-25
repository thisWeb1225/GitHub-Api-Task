import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';
import ModalContent from './ModalContent';

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
  const [editedStatus, setEditedStatus] = useState('');

  const { number, title, body, state, labels } = issue;
  const status = labels[0]?.name;

  const closeIssueModal = () => {
    setIsModalShow(false);
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
        // check
        const token = localStorage.getItem('accessToken');
        if (!token) return

        // handle labels
        const labels = [editedStatus]

        const reaturnContent = await api.updateIssue(token, { number, editedTitle, editedBody, editedState });
        const reaturnLabels = await api.updateIssueLabels(token, number, labels)

        setShouldRenderIssues(true);
        setIsModalShow(false)
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
      setEditedStatus(status);
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
      <ModalContent
        isEdit={isEdit}
        editedStatus={editedStatus}
        setEditedStatus={setEditedStatus}
        editedTitle={editedTitle}
        setEditedTitle={setEditedTitle}
        editedBody={editedBody}
        setEditedBody={setEditedBody}
      />
      <ModalFooter isEdit={isEdit} closeIssueModal={closeIssueModal} saveIssueModal={saveIssueModal} />
    </Modal>
  )
}

export default IssueModal;