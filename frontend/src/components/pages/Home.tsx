import { VFC } from "react"
import { app } from "../../firebase";
export const Home:VFC=()=>{
  return(
    <>
      <div>
        Homeです
      </div>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </>
  )
}