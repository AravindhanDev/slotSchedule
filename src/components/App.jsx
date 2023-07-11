import AddSchedule from "./AddSchedule"
import ListSchedule from "./ListSchedule"
import Auth from "./Auth"
import { useState, useEffect } from "react"

function App() {
    const [authDetails, setAuthDetails] = useState({ 
        userType: "",
        identificationNumber: "",
        password: "",
    })

    const [isLoggedIn, setLoggedIn] = useState(false)

    const [slotsRemain, setSlotsRemain] = useState({
        Monday: 8,
        Tuesday: 0,
        Wednesday: 4,
        Thursday: 12,
        Friday: 8,
    })

    const [slotSchedules, setSlotSchedules] = useState({
        Monday: {
            schedule: { from: 10, fromMin: 0, to: 12, toMin: 0 },
            teams: [],
        },
        Tuesday: { schedule: {}, teams: [] },
        Wednesday: {
            schedule: { from: 16, fromMin: 0, to: 17, toMin: 0 },
            teams: [],
        },
        Thursday: {
            schedule: { from: 20, fromMin: 30, to: 23, toMin: 30 },
            teams: [],
        },
        Friday: {
            schedule: { from: 17, fromMin: 0, to: 19, toMin: 0 },
            teams: [],
        },
    })

    useEffect(() => {
        console.log(slotsRemain)
    }, [slotsRemain])

    useEffect(() => {
        console.log(slotSchedules)
    }, [slotSchedules])

    function addScheduleSlots(slotDetails) {
        let day = slotDetails.schedule["day"]
        setSlotSchedules((prevScheduledSlots) => {
            return {
                ...prevScheduledSlots,
                [day]: {
                    ...prevScheduledSlots[day],
                    teams: [
                        ...prevScheduledSlots[day].teams,
                        slotDetails.studentList,
                    ],
                },
            }
        })
        setSlotsRemain((prevSlotsRemain) => {
            return {
                ...prevSlotsRemain,
                [day]: slotsRemain[day] - 1,
            }
        })
    }

    function sendMessage(message) {
        if (!message.auth) {
            alert("Authentication failed")
            setLoggedIn(false)
            return
        }
        setLoggedIn(true)
        setAuthDetails((prevAuthDetails) => {
            return { ...prevAuthDetails, userType: message.typeOfUser }
        })
    }

    return (
        <>
            {!isLoggedIn && (
                <Auth
                    sendMessage={sendMessage}
                    authDetails={authDetails}
                    setAuthDetails={setAuthDetails}
                />
            )}
            {isLoggedIn && authDetails.userType === "student" && (
                <AddSchedule
                    slotsRemain={slotsRemain}
                    setAuthDetails={setAuthDetails}
                    setLoggedIn={setLoggedIn}
                    addScheduleSlots={addScheduleSlots}
                />
            )}
            {isLoggedIn && authDetails.userType === "faculty" && (
                <ListSchedule
                    setLoggedIn={setLoggedIn}
                    setAuthDetails={setAuthDetails}
                    slotSchedules={slotSchedules}
                    slotsRemain={slotsRemain}
                />
            )}
        </>
    )
}

export default App
