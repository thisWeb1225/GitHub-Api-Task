import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';
import ModalContent from './ModalContent';

// type and provider
import { IssueType } from '../context/IssuesProvider';
import useIssuesList from '../hook/useIssuesList';


// api
import api from '../api/api';

// css
import './../css/IssueModal.css'

type PropsType = {
  issue: IssueType,
  isModalShow: boolean,
  setIsModalShow: React.Dispatch<React.SetStateAction<boolean>>,
  isCreate: boolean,
}

Modal.setAppElement('#root');

// component
const IssueModal = ({ issue, isModalShow, setIsModalShow, isCreate }: PropsType) => {
  const [isEdit, setIsEdit] = useState(isCreate);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedBody, setEditedBody] = useState('');
  const [editedStatus, setEditedStatus] = useState('');

  const { dispatch, REDUCER_ACTIONS } = useIssuesList()

  const { number, title, body, state, labels } = issue;
  const status = labels[0]?.name;

  const closeIssueModal = () => {
    setIsModalShow(false);
  }

  const saveIssue = () => {
    if (!(editedTitle.trim())) {
      alert('必須填入標題')
      return
    }
    if (editedBody.trim().length < 30) {
      alert('內容要超過 30 字');
      return;
    }

    // api
    const updateIssue = async () => {

      if (window.confirm('確定要送出嗎？')) {
        // check
        const token = localStorage.getItem('accessToken');
        if (!token) return

        // handle labels
        const labels = editedStatus ? [editedStatus] : ['Open'];

        if (isCreate) {
          // create issue
          const returnData = await api.createIssue(token, { editedTitle, editedBody, labels });

          dispatch({ type: REDUCER_ACTIONS.CREATE, payload: returnData });

          setIsModalShow(false);
        } else {
          // update issue
          const returnData = await api.updateIssue(token, { number, editedTitle, editedBody, labels });

          dispatch({ type: REDUCER_ACTIONS.UPDATE, payload: returnData });

          setIsModalShow(false);
        }
      } else {
        return;
      }
    }

    updateIssue();
  }

  const deleteIssue = () => {
    const deleteIssue = async () => {
      if (window.confirm('確定要刪除嗎？')) {
        // check
        const token = localStorage.getItem('accessToken');
        if (!token) return;

        const returnData = await api.updateIssue(token, { number, editedTitle, editedBody, editedState: 'closed' });

        dispatch({ type: REDUCER_ACTIONS.DELETE, payload: returnData });

        setIsModalShow(false);
      } else {
        return;
      }
    }

    deleteIssue();
  }


  useEffect(() => {
    if (isModalShow) {
      setEditedTitle(title);
      setEditedBody(body);
      setEditedStatus(() => status ? status : 'Open');
    } else {
      setEditedTitle('');
      setEditedBody('');
      setIsEdit(isCreate);
    }
  }, [isModalShow])

  return (
    <Modal isOpen={isModalShow} onRequestClose={closeIssueModal}>
      <ModalHeader
        title={title}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        deleteIssue={deleteIssue}
        isCreate={isCreate}
      />
      <ModalContent
        isEdit={isEdit}
        editedStatus={editedStatus}
        setEditedStatus={setEditedStatus}
        editedTitle={editedTitle}
        setEditedTitle={setEditedTitle}
        editedBody={editedBody}
        setEditedBody={setEditedBody}
      />
      <ModalFooter
        isEdit={isEdit}
        closeIssueModal={closeIssueModal}
        saveIssue={saveIssue}
        isCreate={isCreate}
      />
    </Modal>
  )
}

export default IssueModal;