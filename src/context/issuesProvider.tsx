import { createContext, useState, ReactElement, useReducer, useMemo } from "react";
import api from "../api/api";

export type IssueType = {
  number: number,
  title: string,
  body: string,
  state: string,
}

type IssuesListType = { issuesList: IssueType[] };

const initIssuesListState: IssuesListType = { issuesList: [] };

const REDUCER_ACTION_TYPE = {
  GET: 'GET',
  UPDATE: 'UPDATE',
  CLOSE: 'CLOSE',
  CREATE: 'CREATE',
  FILTER: 'FILTER'
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string,
  payload?: IssueType,
  listPayload?: IssueType[];
}

const reducer = (state: IssuesListType, action: ReducerAction): IssuesListType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.GET: {
      if (!action.listPayload) {
        throw new Error('action.payload missing in GET action')
      }

      return { ...state, issuesList: action.listPayload }
    }

    case REDUCER_ACTION_TYPE.UPDATE: {
      if (!action.payload) {
        throw new Error('action.payload missing in UPDATE action');
      }

      const { number, title, body, state } = action.payload;

    }

    case REDUCER_ACTION_TYPE.CLOSE: {
      if (!action.payload) {
        throw new Error('action.payload missing in CLOSE action');
      }

      const { state } = action.payload;
    }

    case REDUCER_ACTION_TYPE.CREATE: {
      if (!action.payload) {
        throw new Error('action.payload missing in CREATE action');
      }

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

  const issuesList = state.issuesList;

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