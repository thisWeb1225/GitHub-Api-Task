import { useState } from "react";

type PropsType = {
  isEdit: boolean,
  editedTitle: string,
  setEditedTitle: React.Dispatch<React.SetStateAction<string>>,
  editedBody: string,
  setEditedBody: React.Dispatch<React.SetStateAction<string>>,
  editedStatus: string,
  setEditedStatus: React.Dispatch<React.SetStateAction<string>>,
}

const ModalContent = ({ isEdit, editedTitle, setEditedTitle, editedBody, setEditedBody, editedStatus, setEditedStatus }: PropsType) => {

  return (
    <>
      <label className="modal__issue-label modal__content">
        Status :
        <select
          value={editedStatus}
          name="label"
          className='modal__input modal__input-status'
          disabled={!isEdit}
          onChange={(e) => setEditedStatus(e.target.value)}>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </label>
      <label className="modal__issue-title modal__content">
        Title :
        <input
          className="modal__input"
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          disabled={!isEdit} />
      </label>
      <label className='modal__issue-body modal__content'>
        Body :
        <textarea
          className='modal__input modal__input-body'
          value={editedBody}
          onChange={(e) => setEditedBody(e.target.value)}
          disabled={!isEdit}
        />
      </label>
    </>
  )
}

export default ModalContent