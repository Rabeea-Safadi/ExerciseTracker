import { useEffect, useReducer, useRef } from "react";
import DatePicker from "react-date-picker";
import axios from "axios";
import { useParams } from "react-router-dom";

const initialState = {
    username: "",
    description: "",
    duration: 0,
    date: new Date()
};

const userReducer = (userState, action) => {
    switch (action.type) {
        case "ON_USERNAME_CHANGE": return { ...userState, username: action.value };
        case "ON_DESCRIPTION_CHANGE": return { ...userState, description: action.value };
        case "ON_DURATION_CHANGE": return { ...userState, duration: action.value };
        case "ON_DATE_CHANGE": return { ...userState, date: action.value };
        case "FETCHED_EXERCISE": return { ...action.value, date: new Date(action.value.date) }
        default: return userState;
    }
};

const EditExercise = props => {
    const [userState, dispatch] = useReducer(userReducer, initialState);
    const userInputRef = useRef();
    const { id } = useParams();

    useEffect(() => {
        axios.get("http://localhost:5000/exercises/" + id)
            .then(res => {
                console.log(Date.parse(res.data.date));
                dispatch({ type: "FETCHED_EXERCISE", value: res.data})
            });
    }, []);

    const onSubmit = e => {
        e.preventDefault();
        
        const exercise = {
            username: userState.username,
            description: userState.description,
            duration: userState.duration,
            date: userState.date
        };

        
        axios.post("http://localhost:5000/exercises/update/" + id, exercise)
            .then(res => console.log(res.data));

        window.location = "/";  //Go back to the main page (list of exercises)
    };

    return <div>
        <h3>Edit Exercise</h3>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Username</label>
                <input ref={userInputRef}
                    readOnly
                    className="form-control"
                    value={userState.username} />
            </div>
            <div className="form-group">
                <label>Description</label>
                <input type="text"
                    required
                    className="form-control"
                    value={userState.description}
                    onChange={e => dispatch({ type: "ON_DESCRIPTION_CHANGE", value: e.target.value })} />
            </div>
            <div className="form-group">
                <label>Duration</label>
                <input type="text"
                    required
                    className="form-control"
                    value={userState.duration}
                    onChange={e => dispatch({ type: "ON_DURATION_CHANGE", value: e.target.value })} />
            </div>
            <br />
            <div className="form-group">
                <label>Date </label>
                <DatePicker
                    onChange={date => dispatch({ type: "ON_DATE_CHANGE", value: date})}
                    value={userState.date}
                />
            </div>
            <br />
            <div className="form-group">
                <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
            </div>
        </form>
    </div>;
};

export default EditExercise;