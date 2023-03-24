import './Issue.css'

interface IssueType {
  title: string,
  body: string,
  state: string,
  number: number
}

function Issue(props: IssueType) {

  const { title, body, state, number } = props;

  return (
    <>
      <h2 className='issueCard__title'>{title}</h2>
      <p className='issueCard__body'>{body}</p>
    </>
  )
}

export default Issue
