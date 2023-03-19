export default function UserDescription({desc}) {
  return (
    <div style={{backgroundColor: '#ff2fff'}}>
        <h4>User's description</h4>
        <div>
          {
            desc ? desc 
            : (desc === '') ? 'No description '
            : 'loading...'
          }
        </div>
    </div>
  )
}
