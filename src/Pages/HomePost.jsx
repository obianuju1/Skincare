import styles from "./HomePost.module.css"
import { Link } from 'react-router-dom'
const HomePost =({id,time,title,upvotes})=>{
    return(
        <Link to ={'/details/'+ id}>
        <div className={styles.Post}>
            <p>Posted {time} </p>
            <h3>{title}</h3>
           <p>{upvotes} upvotes</p>
        </div></Link>
     
    )
}
export default HomePost;