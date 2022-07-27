import { useDispatch } from 'react-redux'
import { updateFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const filterChangeHandler = (event) => {
    // console.log('filter change event.target.value', event.target.value)
    const filterString = event.target.value
    dispatch(updateFilter(filterString))
  }

  return (
    <div>
      filter <input name="filter" onChange={filterChangeHandler}></input>
    </div>
  )
}

export default Filter