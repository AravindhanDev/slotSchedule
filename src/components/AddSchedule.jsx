import { useRef, useState } from "react"
import { slotDetails } from "../slotsDetails"
import "./css/AppSchedule.css"
import "./css/App.css"

function AddSchedule({
    addScheduleSlots,
    setLoggedIn,
    setAuthDetails,
    slotsRemain,
}) {
    const [studentList, setStudentList] = useState([])
    const scheduledSlots = slotDetails
    const scheduleRef = useRef()
    const regNoRef = useRef()
    const nameRef = useRef()

    function addStudent(event) {
        event.preventDefault()
        let regNo = regNoRef.current.value
        let name = nameRef.current.value
        let schedule = JSON.parse(scheduleRef.current.value)
        if (regNo === "") {
            alert("register number is required")
            return
        }
        if (name === "") {
            alert("name is required")
            return
        }
        setStudentList((prevStudentList) => [
            ...prevStudentList,
            { name, regNo, schedule },
        ])
        reset()
    }

    function handleClick() {
        let schedule = JSON.parse(scheduleRef.current.value)
        setStudentList(() => [])
        scheduleRef.current.selectedIndex = 0
        addScheduleSlots({ schedule, studentList })
        alert("Slot Booked")
    }

    function reset() {
        regNoRef.current.value = ""
        nameRef.current.value = ""
    }

    function getBatch(time) {
        if (time < 12) return "AM"
        if (time === 12) return "Noon"
        return "PM"
    }

    function logOutAsStudent() {
        setLoggedIn(false)
        setAuthDetails((prevAuthDetails) => {
            return { ...prevAuthDetails, userType: "" }
        })
    }

    return (
        <>
            <div className="student-container">
                <div className="add-student">
                    <form onSubmit={addStudent}>
                        <div className="form-group">
                            <label>Choose Schedule</label> <br />
                            <select ref={scheduleRef}>
                                {scheduledSlots.map((slots, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={JSON.stringify(slots)}
                                            disabled={
                                                slotsRemain[slots.day] < 1
                                            }
                                        >
                                            {slots.day} {slots.from}:
                                            {slots.fromMin || "00"}
                                            {getBatch(slots.from)} - {slots.to}:
                                            {slots.toMin || "00"}
                                            {getBatch(slots.to)}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Register No</label> <br />
                            <input
                                type="text"
                                ref={regNoRef}
                                placeholder="eg. 19uca037"
                            />
                        </div>
                        <div className="form-group">
                            <label>Student Name</label> <br />
                            <input
                                type="text"
                                ref={nameRef}
                                placeholder="eg. jack bauer"
                            />
                        </div>
                        <div className="form-group">
                            <button className="btns">Add Student</button>
                        </div>
                    </form>
                </div>
                <br />
                <div className="student-list">
                    <table>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>RegNo</th>
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: "center" }}>
                            <tr className="d-none">
                                <td colSpan={3}>
                                    <i>No data available</i>
                                </td>
                            </tr>
                            {studentList.length === 0 && (
                                <tr>
                                    <th colSpan={3}>
                                        <em>No data available</em>
                                    </th>
                                </tr>
                            )}
                            {studentList.map((student, index) => {
                                return (
                                    <tr key={index + 1}>
                                        <td>{index + 1}</td>
                                        <td>{student.name}</td>
                                        <td>{student.regNo}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <br />
                    <button
                        className="btns"
                        disabled={studentList.length === 0}
                        onClick={handleClick}
                    >
                        Book Slot
                    </button>
                </div>
                <br />
                <br />
                <button className="btns" onClick={logOutAsStudent}>
                    Logout as student
                </button>
            </div>
        </>
    )
}

export default AddSchedule
