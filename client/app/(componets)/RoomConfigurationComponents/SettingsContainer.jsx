import Configs from './Configs'
import EnableSpeakerGroups from './EnableSpeakersGroups'

export default function SettingsContainer() {
  return (
    <div>
        <div className="settings-container">
          <Configs 
          header={'Topic'} 
          content={
            <input type="text" name="topic" id="topic" defaultValue="Military System of Government is better than civil system of Government" required="" />
          }/>
          <Configs 
          header={'Description'} 
          content={
            <textarea name="description" id="description" cols="30" rows="9" maxLength="250" placeholder="Room description...."></textarea>
          }/>
          <Configs 
          header={'Accessibiility'}
          content={
            <>
              <div>
                <input type="radio" name="show_status" defaultValue="public" required="" />
                <label htmlFor="show_status">public</label>
              </div>
              <div>
                <input type="radio" name="show_status" defaultValue="public" required="" />
                <label htmlFor="show_status">private</label>
              </div>
            </>
          }/>
          <Configs 
          header={'Judging System'}
          content={
            <>
              <div>
                <input type="checkbox" name="judging" value="judges" required="" />
                <label htmlFor="show_status">Judges</label>
              </div>
              <div>
                <input type="checkbox" name="judging" value="judges" required="" />
                <label htmlFor="show_status">Audience</label>
              </div>
            </>
          }/>
          <Configs
          header={'Enabe speaker groups'}
          content={
            <EnableSpeakerGroups />
          }/>
        </div>

    </div>
  )
}
