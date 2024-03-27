import React, { useContext, useState } from 'react'
import'./Sidebar.css'
import {assets} from '../../assets/assets'
import { Context } from '../../Context/Context'

function Sidebar() {
 
    const [Extended , setExtended] = useState(false)

const{onSent,PrePrompt,setRecentPrompt,newChat}= useContext(Context);
  return (
    <div className='sidebar'>
        <div className="top">
            <img className='menu' src={assets.menu_icon} alt=""  onClick={()=>setExtended(prev=>!prev)}/>
           <div onClick={()=>newChat()} className="new-chat">
                <img src={assets.plus_icon} alt="" />
             {Extended?<p>New Chat</p>:null}
            </div>
          {Extended? <div className="recent">
                <p className='recent-title'>Recent</p>
                {PrePrompt.map((items,index)=>{
                    return(
                    <div className="recent-entry">
                    <img src={assets.message_icon} alt="" />
                    <p>{items.slice(0,18)}</p>
                </div>)

                })
                
                }
                
            </div>:null}

        </div>





        <div className="bottom">
            <div className="bottom-item recent-entry">
                <img src={assets.question_icon} alt="" />
                {Extended ?<p> Help </p>:null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.history_icon} alt="" />
                {Extended ?<p>Activity </p>:null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.setting_icon} alt="" />
                {Extended ?<p> Setting </p>:null}
            </div>
        </div>
      
    </div>
  )
}

export default Sidebar
