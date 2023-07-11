import { userIdRange } from "../idRange"
import "./css/App.css"

function Auth({ authDetails, setAuthDetails, sendMessage }) {
    function handleAuthDetails(event) {
        let name = event.target.name
        setAuthDetails((prevAuthDetails) => {
            return { ...prevAuthDetails, userType: name }
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        if (authDetails.userType === "student") {
            let { userType, identificationNumber } = authDetails
            if (
                identificationNumber >= userIdRange[userType].from === false ||
                identificationNumber <= userIdRange[userType].to === false
            ) {
                sendMessage({ auth: false })
                return
            }
            sendMessage({ auth: true, typeOfUser: "student" })
        } else {
            let {identificationNumber, password} = authDetails
            if (identificationNumber === 123456 && password === 'admin') {
                sendMessage({ auth: true, typeOfUser: "faculty" })
            } else {
                sendMessage({auth: false})
            }
        }
        setAuthDetails((prevAuthDetails) => {
            return {...prevAuthDetails, identificationNumber: '', password: '', }
        })
    }

    return (
        <>
            {authDetails.userType === "" ? (
                <div className="auth">
                    <div className="user-btns">
                        <button name="student" onClick={handleAuthDetails}>
                            Student
                        </button>
                        <button name="faculty" onClick={handleAuthDetails}>
                            Faculty
                        </button>
                    </div>
                </div>
            ) : (
                <div className="auth-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Identification Number</label> <br />
                            <input
                                type="number"
                                value={authDetails.identificationNumber}
                                name="identificationNumber"
                                onChange={(event) =>
                                    setAuthDetails((prevAuthDetails) => {
                                        return {
                                            ...prevAuthDetails,
                                            identificationNumber: parseInt(
                                                event.target.value
                                            ),
                                        }
                                    })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label> <br />
                            <input
                                type="password"
                                value={authDetails.password}
                                name="password"
                                onChange={(event) =>
                                    setAuthDetails((prevAuthDetails) => {
                                        return {
                                            ...prevAuthDetails,
                                            password: event.target.value,
                                        }
                                    })
                                }
                            />
                        </div>
                        <div className="auth-btns">
                            <button className="btns">Login</button>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}

export default Auth
