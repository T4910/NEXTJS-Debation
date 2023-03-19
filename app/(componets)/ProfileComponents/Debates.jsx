export default function Debates({topic, description, role, timestart, timeend}) {
  return (
    <div className="debate-ended">
        <h3>{topic}</h3>
        <p>{description}</p>
        <p className="mini">{role}</p>
        <p className="mini">{timestart}</p>-<p className="mini">{timeend}</p>
    </div>
  )
}
