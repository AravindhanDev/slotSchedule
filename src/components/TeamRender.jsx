import "./css/listSchedule.css"

function TeamRender({team, startHr, startMin, endHr, endMin}) {
  return <>
        {team.map((member, index) => {
            return <tr key={index}>
                <td>{member.name}</td>
                <td>{member.regNo}</td>
                <td>{startHr > 12 ? startHr % 12 : startHr}:{startMin || '00'}{startHr < 12 ? "AM" : "PM"} - {endHr > 12 ? endHr % 12 : endHr}:{endMin || '00'}{endHr < 12 ? "AM" : "PM"} (15 Minutes)</td>
            </tr>
        })}
    </>
}

export default TeamRender