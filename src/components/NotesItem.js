import React from 'react'
import { Link } from 'react-router-dom'
const NotesItem = (props) => {
    const { notedetail } = props
    return (
        <div className='col-md-3'>   
            <div className="card my-3" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">{notedetail.title}</h5>
                    <p className="card-text">{notedetail.description}</p>
                    <Link href="/" class="btn btn-primary">Go somewhere</Link>
                </div>
            </div>
        </div>
    )
}

export default NotesItem