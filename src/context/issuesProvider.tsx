import { createContext, useState, ReactElement, useReducer, useMemo } from "react";
import api from "../api/api";

export type IssueType = {
  number: number,
  title: string,
  body: string,
  state: string,
  labels: any[],
}

type IssuesListType = { issuesList: IssueType[] };

const initIssuesListState: IssuesListType = { issuesList: [] };

const REDUCER_ACTION_TYPE = {
  GET: 'GET',
  SEARCH: 'SEARCH',
  FILTER: 'FILTER',
  UPDATE_ALL: 'UPDATE_ALL',
  UPDATE: 'UPDATE'
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string,
  payload?: IssueType,
  listPayload?: IssueType[];
  keyword?: string,
}

const reducer = (state: IssuesListType, action: ReducerAction): IssuesListType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.UPDATE_ALL: {
      if (!action.listPayload) {
        throw new Error('action.payload missing in GET action')
      }

      return { ...state, issuesList: [...state.issuesList, ...action.listPayload] }
    }

    case REDUCER_ACTION_TYPE.UPDATE: {
      if (!action.payload) {
        throw new Error('action.payload missing in GET action')
      }

      const { number } = action.payload;

      const filteredIssue = state.issuesList.filter((issue) => {
        return issue.number !== number;
      })

      console.log(filteredIssue)

      return { ...state, issuesList: [...filteredIssue, action.payload] }
    }

    default:
      throw new Error('unidentified reducer action type')
  }
}


const useIssuesListContext = (initIssuesListState: IssuesListType) => {
  const [state, dispatch] = useReducer(reducer, initIssuesListState);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE
  }, [])

  const issuesList = state.issuesList.sort((a, b) => {
    return b.number - a.number;
  })

  return { dispatch, REDUCER_ACTIONS, issuesList }
}

export type UseIssuesListContextType = ReturnType<typeof useIssuesListContext>

const initIssuesListContextState: UseIssuesListContextType = {
  dispatch: () => { },
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  issuesList: [],
}

export const IssuesListContext = createContext<UseIssuesListContextType>(initIssuesListContextState)

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const IssuesListProvider = ({ children }: ChildrenType) => {
  return (
    <IssuesListContext.Provider value={useIssuesListContext(initIssuesListState)}>
      {children}
    </IssuesListContext.Provider>
  )
}

export default IssuesListContext