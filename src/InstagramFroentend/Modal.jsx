import React from 'react'
import { RiCloseLine } from "react-icons/ri";
import './modal.css'
import { useNavigate } from 'react-router-dom';
function Modal({setModalOpen}) {
    const navigate = useNavigate()
    
  return (
    
   
        <div className='darkBg' onClick={()=>{setModalOpen(false)}}>
             <div className='contered'>

                    
                <div className='Modal'>

                    {/* Modal Header */}
                        <div className='ModalHeader'>
                            <h5 className='heading'></h5>
                        </div>
                        <button className='closeBtn btn bg-danger btn-sm' style={{color:'white'}} onClick={()=>{setModalOpen(false)}}>
                            <RiCloseLine></RiCloseLine>
                        </button>

                        {/* Modal Containent */}
                        <div className='ModalContainent'>
                            Are you really want to Log Out ?
                        </div>
                        <div className='mofalActions'>
                            <div className='actionsContainer'>
                                <button className='btn btn-outline-danger mx-3 btn-sm' 
                                onClick={()=>{
                                    setModalOpen(false);
                                    localStorage.clear();
                                    navigate("/signin")
                                
                                
                                }}>Log Out</button>
                                <button className='btn btn-outline-secondary mx-3 btn-sm'  onClick={()=>{setModalOpen(false)}}>Cancle</button>
                            </div>

                        </div>
                    
                </div>

                </div>
        </div>
      
       
        

  )
}

export default Modal