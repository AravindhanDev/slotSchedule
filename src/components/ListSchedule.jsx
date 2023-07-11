import TeamRender from "./TeamRender"
import "./css/listSchedule.css"
import "./css/App.css"

function ListSchedule({
    slotSchedules,
    slotsRemain,
    setLoggedIn,
    setAuthDetails,
}) {
    function logoutAsFaculty() {
        setLoggedIn(false)
        setAuthDetails((prevAuthDetails) => {
            return { ...prevAuthDetails, userType: "" }
        })
    }

    return (
        <>
            <div className="list-container">
                <table className="list-schedule">
                    {Object.keys(slotSchedules).map((slot, index) => {
                        let { from, fromMin, to, toMin } =
                            slotSchedules[slot].schedule
                        let startMin = 0,
                            startHr = from,
                            endHr = from,
                            endMin = 0
                        return (
                            <>
                                <tr className="individual-slot" key={index}>
                                    <th colSpan={3}>
                                        {slot} Slot - {from}:
                                        {fromMin !== 0 ? fromMin : "00"} -{to}:
                                        {toMin !== 0 ? toMin : "00"}
                                    </th>
                                </tr>
                                {slotSchedules[slot].teams.length <= 0 && (
                                    <tr>
                                        <th colSpan={3}>
                                            <i>No slots available</i>
                                        </th>
                                    </tr>
                                )}
                                {slotSchedules[slot].teams.map(
                                    (team, index) => {
                                        if (index === 0) {
                                            startMin = 0
                                            endMin += 15
                                        } else {
                                            startMin += 15
                                            endMin += 15
                                            if (endMin === 60) {
                                                startHr += 1
                                                endHr += 1
                                            }
                                        }
                                        return (
                                            <>
                                                <tr>
                                                    <th colSpan={3}>
                                                        Team {index + 1}
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>RegNo</th>
                                                    <th>Time</th>
                                                </tr>
                                                <TeamRender
                                                    team={team}
                                                    startHr={startHr}
                                                    endHr={endHr}
                                                    endMin={endMin}
                                                    startMin={startMin}
                                                    teamId={index + 1}
                                                    slotsRemain={slotsRemain}
                                                />
                                            </>
                                        )
                                    }
                                )}
                                <br />
                            </>
                        )
                    })}
                </table>
                <br />
                <br />
                <button onClick={logoutAsFaculty} className="btns">
                    LogOut as faculty
                </button>
                <br />
                <br />
            </div>
        </>
    )
}

export default ListSchedule
