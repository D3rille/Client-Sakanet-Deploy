import * as React from 'react';
import {useState, useRef, useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';

export default function VerificationPrivacyPolicy({open, setOpen}) {
    const policy = [
        {
            subsection:"1. Purpose of Data Collection:",
            content:"We collect and process your personal data as part of our identity verification process to ensure the security and integrity of our services. This includes the collection of identification documents for verification purposes."
        },
        {
            subsection:"2. Types of Data Collected:",
            content:"We collect the following types of personal data during the identity verification process:",
            list: ["Full Name", "Date of Birth", "Government-issued ID information"]
        },
        {
            subsection:"3. How We Use Your Data:",
            content:"Your personal data is used solely for the purpose of verifying your identity and maintaining the security of our platform. We do not use this information for any other purpose without your explicit consent."
        },
        {
            subsection:"4. Data Security Measures:",
            content:"We employ industry-standard security measures to safeguard your personal data. This includes encryption, access controls, and regular security audits to ensure the confidentiality and integrity of your information."
        },
        {
            subsection:"5. Storage Duration:",
            content:"We retain your personal data for the duration necessary to fulfill the verification process. Once the verification is complete, we securely delete or anonymize your data, unless otherwise required by law."
        },
        {
            subsection:"6. Third-Party Involvement:",
            content:"We will not engage with third-party identity verification services to assist in the process."
        },
        {
            subsection:"7. User Consent:",
            content:"By using our app and participating in the identity verification process, you explicitly consent to the collection and processing of your personal data for the stated purposes."
        },
        {
            subsection:"8. Access and Correction:",
            content:"You have the right to access, correct, or request the deletion of your personal data. For any inquiries or requests regarding your data, please contact us via email:",
            contacts:["jc.unlayao@mseuf.edu.ph", "rt.luna@mseuf.edu.ph", "sg.encomienda@student.mseuf.edu.ph"]
        },
        {
            subsection:"9. Changes to Privacy Information:",
            content:"We reserve the right to update this privacy information to reflect changes in our data processing practices. You will be notified of any material changes."
        },


    ];

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = useRef(null);
    const scroll = 'paper';

    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
    <React.Fragment>
        <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        >
        <DialogTitle id="scroll-dialog-title">Data Privacy Policy</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            >
                <Typography variant="h6">
                    Data Privacy Information: Identity Verification Process
                </Typography>
                <Typography variant="body1">
                    Last Updated: November 24, 2023
                </Typography>
                {policy.map((item, index)=>{
                    if(index == 1){
                        return(<>
                            <Typography sx={{fontWeight:"bold"}}>
                                {item.subsection}
                            </Typography>
                            <Typography variant="caption">
                                {item.content}
                            </Typography>
                            <ul style={{paddingLeft:"2em"}}>
                                {item.list.map((item, index)=>(
                                    <li key={index}>
                                        <Typography variant="caption">
                                            {item}
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        </>)
                    } 
                    else if(index == 7){
                        return(<>
                            <Typography sx={{fontWeight:"bold"}}>
                                {item.subsection}
                            </Typography>
                            <Typography variant="caption">
                                {item.content}
                            </Typography>
                            <ul style={{paddingLeft:"2em"}}>
                                {item.contacts.map((item, index)=>(
                                    <li key={index}>
                                        <Typography variant="caption">
                                            {item}
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        </>)
                    }
                    else{
                        return(<>
                            <Typography sx={{fontWeight:"bold"}}>
                                {item.subsection}
                            </Typography>
                            <Typography variant="caption">
                                {item.content}
                            </Typography>
                        </>)
                    }
                }
                    
                )}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button variant="outlined" color="error" onClick={handleClose}>Close</Button>
        </DialogActions>
        </Dialog>
    </React.Fragment>
    );
}