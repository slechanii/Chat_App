import _ from 'lodash'
import React from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import Axios from 'axios';
import configData from "../config.json";

const initialState = {
  loading: false,
  results: [],
  value: '',
}

var source = []

function getNonSubscribedUsers(channel_id){
    Axios.post(configData.SERVER_URL + "getNonChannelMembers/", {channel_id: channel_id})
         .then((res) => {
            source = res.data
         })
         .catch((err) => {
             console.log(err)
         })
}

function addUserToChannel(user_id, channel_id, reload){
    Axios.post(configData.SERVER_URL + "addUserToChannel/", {channel_id: channel_id, profile_id: user_id})
    .then((res) => {
      reload();
    })
    .catch((err) => {
        console.log(err)
    })
}

function exampleReducer(state, action) {
  switch (action.type) {
    case 'CLEAN_QUERY':
      return initialState
    case 'START_SEARCH':
      return { ...state, loading: true, value: action.query }
    case 'FINISH_SEARCH':
      return { ...state, loading: false, results: action.results }
    case 'UPDATE_SELECTION':
      return { ...state, value: action.selection }

    default:
      throw new Error()
  }
}

function AddUserSearchbar(props) {
    getNonSubscribedUsers(props.channelId)
    const renderer = ({username, user_id }) => (
        <div className="searchbar-add-users-results">               
            <p className="searchbar-add-users-results" onClick={() =>{addUserToChannel(user_id, props.channelId, props.reload)} }>{username}</p>               
        </div>
    );


    // var source = getNonSubscribedUsers(props.channelId)
  const [state, dispatch] = React.useReducer(exampleReducer, initialState)
  const { loading, results, value } = state

  const timeoutRef = React.useRef()
  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current)
    dispatch({ type: 'START_SEARCH', query: data.value })

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' })
        return
      }

      const re = new RegExp(_.escapeRegExp(data.value), 'i')
      const isMatch = (result) => re.test(result.username)

      dispatch({
        type: 'FINISH_SEARCH',
        results: _.filter(source, isMatch),
      })
    }, 300)
  }, [])
  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])
//   alert(JSON.stringify(results))
  return (

        <Search
          loading={loading}
          onResultSelect={(e, data) =>
            dispatch({ type: 'UPDATE_SELECTION', selection: data.result.username })
          }
          onSearchChange={handleSearchChange}
          results={results}
          resultRenderer={renderer}
          value={value}
          className="searchbar-add-users"
        />
  )
}

export default AddUserSearchbar
