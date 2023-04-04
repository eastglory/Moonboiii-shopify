import React, { useState } from 'react';
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';


function LoginDialog(props) {

  return (
    <div>
        <PureModal 
            style={{
                backgroundColor: '#fd5b2a'
            }}
            header={
                <p>Sign in with XUMM</p>
            }
            footer={
                <div style={{textAlign: 'right'}}>
                    <a 
                        style={{color: '#000000'}}
                        href={props.nextUrl} 
                        target='_blank'
                    >Open XUMM APP</a>
                </div>
            }
            isOpen={props.open} 
            onClose={props.handleClose}
        >
            <img src={props.qrUrl} alt="QR code" />
        </PureModal>
    </div>
  );
}

export default LoginDialog