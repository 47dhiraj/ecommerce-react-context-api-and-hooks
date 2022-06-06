import { useState } from 'react'
import { Alert } from 'react-bootstrap'


function Message({ variant, children })                 // { variant, children } vannale destructuring the props and children component
{
    const [show, setShow] = useState(true);


    if (show) {
        return (
            <Alert variant={variant} onClose={() => setShow(false)} dismissible style={{ fontWeight: 'bold', fontSize: 'larger' }} >

                {children}

            </Alert>
        )
    }
    else {
        return (
            <>

            </>
        )
    }


}

export default Message
