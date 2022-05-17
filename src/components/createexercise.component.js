import { useEffect, useReducer } from "react";
import DatePicker from "react-date-picker";
import axios from "axios";

const initialState = {
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: []
};

const userReducer = (userState, action) => {
    switch (action.type) {
        case "ON_USERNAME_CHANGE": return { ...userState, username: action.value };
        case "ON_DESCRIPTION_CHANGE": return { ...userState, description: action.value };
        case "ON_DURATION_CHANGE": return { ...userState, duration: action.value };
        case "ON_DATE_CHANGE": return { ...userState, date: action.value };
        case "USERS_ADD": return { ...userState, users: action.value.users, username: action.value.username };
        default: return userState;
    }
};

const CreateExercise = props => {
    const [userState, dispatch] = useReducer(userReducer, initialState);

    useEffect(() => {
        axios.get("http://localhost:5000/users/")
            .then(res => {
                if (res.data.length > 0) {
                    dispatch({ type: "USERS_ADD", value: { users: res.data.map(user => user.username), username: res.data[0].username} });
                }
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

        
        axios.post("http://localhost:5000/exercises/add", exercise)
            .then(res => console.log(res.data));

        window.location = "/";  //Go back to the main page (list of exercises)
    };

    return <div>
        <h3 onClick={() => console.log(userState)}>Create New Exercise Log</h3>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Username</label>
                <select
                    required
                    className="form-control"
                    value={userState.username}
                    onChange={e => dispatch({ type: "ON_USERNAME_CHANGE", value: e.target.value })}>
                        {
                            userState.users.map(user => {
                                return <option
                                    key={user}
                                    value={user}>
                                        {user}
                                    </option>
                            })
                        }
                    </select>
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
                <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
            </div>
        </form>
    </div>;
};

export default CreateExercise;