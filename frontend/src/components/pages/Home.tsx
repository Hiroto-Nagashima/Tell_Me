import { VFC } from "react"
import { auth } from "../../firebase";
export const Home:VFC=()=>{
  return(
    <>
      <div>
        Homeです
      </div>
      <button onClick={() => auth.signOut()}>Sign out</button>
    </>
  )
}