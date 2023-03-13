export default function UserVisitedDebates({debates}) {
  console.log('made it ot debate component', debates)
  return (
    <div>
      {debates ?
        debates.reverse().map(({topic, role, description, room_id, timestart, timeend, visibility, winners}, index) => 
          (visibility) && 
            <div className="debate-ended">
              <h3>{topic}</h3>
              <p>{description}</p>
              <p className="mini">{role}</p>
              <p className="mini">{timestart}</p>-<p className="mini">{timeend}</p>
            </div>
        )
      : 'loading...'}
    </div>
  )
}
