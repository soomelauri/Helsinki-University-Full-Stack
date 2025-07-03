// import filterChange and useDispatch
// filterChange is an action creator function, returning a type and a payload
// useDispatch allows us to dispatch stuff to the redux store
import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

// create VisibilityFilter component
// create the dispatch object
// return the radio buttons that use the filterChange as the onClick function, with each having their specific string piped through

// we need to use the dispatch function in order to push it to the redux store and change the state there
const VisibilityFilter = (props) => {
    const dispatch = useDispatch()

    return (
        <div>
            all <input type="radio" name="filter" onChange={() => dispatch(filterChange('ALL'))}/>
            important <input type="radio" name="filter" onChange={() => dispatch(filterChange('IMPORTANT'))}/>
            nonimportant <input type="radio" name="filter" onChange={() => dispatch(filterChange('NONIMPORTANT'))}/>
        </div>
    )
}

export default VisibilityFilter
