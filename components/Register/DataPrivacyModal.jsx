import React, { useRef } from 'react';
import { Typography, Box } from '@mui/material';

const DataPrivacyModal = () => {

    const sectionRefs = {
        section1: useRef(null),
        section2: useRef(null),
        section3: useRef(null),
        section4: useRef(null),
        section5: useRef(null),
        section6: useRef(null),
        section7: useRef(null),
        section8: useRef(null),
        section9: useRef(null),
        section10: useRef(null),
       
    };

    const scrollToSection = (sectionKey) => {
        const section = sectionRefs[sectionKey].current;
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <Box sx={{ textAlign: 'justify' }}>
            <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold', color: '#4D5157' }}>
            DATA PRIVACY POLICY
            </Typography>
            <Typography variant="subtitle2" gutterBottom style={{ fontStyle: 'italic', marginTop: '2rem', marginBottom: '2rem', color: '#4C4E52' }}>
            Last updated April 30, 2023
            </Typography>
            <Typography variant="body2" paragraph style={{ color: '#4C4E52' }}>
                This privacy notice for SakaNet (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), describes how and why we might collect, store, use, and/or share (&quot;process&quot;) your information when you use our services (&quot;Services&quot;), such as when you:
            </Typography>
            <Typography variant="body2" paragraph style={{ marginLeft: '1.5rem', marginBottom: '1rem', color: '#4C4E52' }}>
            <li>
                Visit our website at [SakaNet Website], or any website of ours that links to this privacy notice
            </li>
            <li>
                Download and use our mobile application (SakaNet), or any other application of ours that links to this privacy notice
            </li>
            <li>
                Engage with us in other related ways, including any sales, marketing, or events
            </li>
            </Typography>
            <Typography variant="body1" gutterBottom style={{ fontWeight: 'bold', color: '#4C4E52' }}>
            SUMMARY OF KEY POINTS
            </Typography>
            <Typography variant="body2" paragraph style={{ fontStyle: 'italic', fontWeight: 550, color: '#4C4E52' }}>
            This summary provides key points from our privacy notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.
            </Typography>
            <Typography variant="body2" paragraph style={{ color: '#4C4E52' }}>
            <b>What personal information do we process? </b>
            When you visit, use, or navigate our Services, we may process personal information depending on how you interact with SakaNet and the Services, the choices you make, and the products and features you use. Learn more about{' '}
            <span
                onClick={() => scrollToSection('section1')}
                style={{ cursor: 'pointer', textDecoration: 'underline', color: '#286652' }}
            >
                personal information you disclose to us.
            </span>
            </Typography>
            <Typography variant="body2" paragraph style={{ color: '#4C4E52' }}>
            <b>Do we process any sensitive personal information? </b> We do not process sensitive personal information.
            </Typography>
            <Typography variant="body2" paragraph style={{ color: '#4C4E52' }}>
            <b>Do we receive any information from third parties? </b> We receive information via API calls from google maps.
            </Typography>
            <Typography variant="body2" paragraph style={{ color: '#4C4E52' }}>
            <b>How do we process your information? </b>We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about{' '}
            <span
                onClick={() => scrollToSection('section2')}
                style={{ cursor: 'pointer', textDecoration: 'underline', color: '#286652' }}
            >
                how we process your information.
            </span>
            </Typography>
            <Typography variant="body2" paragraph style={{ color: '#4C4E52' }}>
            <b>In what situations and with which parties do we share personal information? </b>We may share information in specific situations and with specific third parties. Learn more about{' '}
            <span
                onClick={() => scrollToSection('section3')}
                style={{ cursor: 'pointer', textDecoration: 'underline', color: '#286652' }}
            >
                when and with whom we share your personal information.
            </span>
            </Typography>
            <Typography variant="body2" paragraph style={{ color: '#4C4E52' }}>
            How do we keep your information safe? We have organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Learn more about{' '}
            <span
                onClick={() => scrollToSection('section6')}
                style={{ cursor: 'pointer', textDecoration: 'underline', color: '#286652' }}
            >
                how we keep your information safe.
            </span>
            </Typography>

            <Typography variant="body2" paragraph style={{ color: '#4C4E52' }}>
            <b>What are your rights? </b>Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about{' '}
            <span
                onClick={() => scrollToSection('section7')}
                style={{ cursor: 'pointer', textDecoration: 'underline', color: '#286652' }}
            >
                your privacy rights.
            </span>
            </Typography>
            <Typography variant="body2" paragraph style={{ color: '#4C4E52' }}>
            <b>How do you exercise your rights? </b>The easiest way to exercise your rights is by submitting a{' '}
            <span
                onClick={() => scrollToSection('section8')}
                style={{ cursor: 'pointer', textDecoration: 'underline', color: '#286652' }}
            >
                data subject access request
            </span>
            , or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.
            </Typography>

            <Typography variant="body2" paragraph style={{ color: '#4C4E52' }}>
            Want to learn more about what SakaNet does with any information we collect? Review the privacy notice in full.
            </Typography>

            {/* TABLE OF CONTENTS */}

            <Typography variant="body1" gutterBottom style={{ fontWeight: 'bold' }}>
            TABLE OF CONTENTS
            </Typography>

            <Typography variant="body2" style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <ol type="1">
                <li onClick={() => scrollToSection('section1')}
                style={{ cursor: 'pointer' }}>
                WHAT INFORMATION DO WE COLLECT?
                </li>
                <li onClick={() => scrollToSection('section2')}
                style={{ cursor: 'pointer' }}>
                HOW DO WE PROCESS YOUR INFORMATION?
                </li>
                <li onClick={() => scrollToSection('section3')}
                style={{ cursor: 'pointer' }}>
                WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                </li>
                <li onClick={() => scrollToSection('section4')}
                style={{ cursor: 'pointer' }}>
                DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                </li>
                <li onClick={() => scrollToSection('section5')}
                style={{ cursor: 'pointer' }}>
                HOW LONG DO WE KEEP YOUR INFORMATION?
                </li>
                <li onClick={() => scrollToSection('section6')}
                style={{ cursor: 'pointer' }}>
                HOW DO WE KEEP YOUR INFORMATION SAFE?
                </li>
                <li onClick={() => scrollToSection('section7')}
                style={{ cursor: 'pointer' }}>
                WHAT ARE YOUR PRIVACY RIGHTS?
                </li>
                <li onClick={() => scrollToSection('section8')}
                style={{ cursor: 'pointer' }}>
                CONTROLS FOR DO-NOT-TRACK FEATURES
                </li>
                <li onClick={() => scrollToSection('section9')}
                style={{ cursor: 'pointer' }}>
                DO WE MAKE UPDATES TO THIS NOTICE?
                </li>
                <li onClick={() => scrollToSection('section10')}
                style={{ cursor: 'pointer' }}>
                HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                </li>
            </ol>
            </Typography>

            {/* CONTENTS */}

            <Typography variant="body2" gutterBottom style={{ marginTop: '2rem', marginBottom: '1rem' }} ref={sectionRefs.section1}>
            <b>1. WHAT INFORMATION DO WE COLLECT? </b>
            </Typography>
            <Typography variant="body2" gutterBottom>
            <b>Personal information you disclose to us</b>
            </Typography>

            <Typography variant="subtitle2" gutterBottom style={{ fontStyle: 'italic' }}>
            <b> In Short: </b>We collect personal information that you provide to us.
            </Typography>

            <Typography variant="body2" paragraph>
            We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
            </Typography>
            <Typography variant="body2" paragraph>
            <b>Personal Information Provided by You. </b>The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:
            </Typography>
            <Typography variant="body2" paragraph style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>
                names
            </li>
            <li>
                phone numbers
            </li>
            <li>
                email addresses
            </li>
            <li>
                usernames
            </li>
            <li>
                passwords
            </li>
            <li>
                contact or authentication data
            </li>
            </Typography>
            <Typography variant="body2" paragraph>
            <b>Sensitive Information.  </b>We do not process sensitive information.
            </Typography>

            <Typography variant="body2" paragraph>
            <b>Application Data. </b>If you use our application(s), we also may collect the following information if you choose to provide us with access or permission:
            </Typography>
            <Typography variant="body2" paragraph style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>
            <i> Mobile Device Access. </i>We may request access or permission to certain features from your mobile device, including your mobile device&apos;s storage, and other features. If you wish to change our access or permissions, you may do so in your device&apos;s settings.
            </li>
            <li>
            <i>Push Notifications. </i> We may request to send you push notifications regarding your account or certain features of the application(s). If you wish to opt out from receiving these types of communications, you may turn them off in your device&apos;s settings.
            </li>
            </Typography>
            <Typography variant="body2" paragraph>
            This information is primarily needed to maintain the security and operation of our application(s), for troubleshooting, and for our internal analytics and reporting purposes.
            </Typography>
            <Typography variant="body2" paragraph>
            All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
            </Typography>
            <Typography variant="body2" gutterBottom style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
            Information automatically collected
            </Typography>
            <Typography variant="subtitle2" gutterBottom style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
            <b> In Short: </b>Some information &mdash; such as your Internet Protocol (IP) address and/or browser and device characteristics &mdash; is collected automatically when you visit our Services.
            </Typography>
            <Typography variant="body2" style={{ marginBottom: '1rem' }}>
            We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.
            </Typography>
            <Typography variant="body2" style={{ marginBottom: '1rem' }}>
            Like many businesses, we also collect information through cookies and similar technologies.
            </Typography>
            <Typography variant="body2" paragraph>
            The information we collect includes:
            </Typography>
            <Typography variant="body2" paragraph style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '1rem' }}>
            <i>Log and Usage Data. </i>Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type, and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called &quot;crash dumps&quot;), and hardware settings).
            </li>
            <li style={{ marginBottom: '1rem' }}>
            <i>Device Data. </i>We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model, Internet service provider and/or mobile carrier, operating system, and system configuration information.
            </li>
            <li style={{ marginBottom: '1rem' }}>
            <i>Location Data. </i> We collect location data such as information about your device&apos;s location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. However, if you choose to opt out, you may not be able to use certain aspects of the Services.
            </li>
            </Typography>
            <Typography variant="body2" gutterBottom style={{ marginTop: '2rem', marginBottom: '1rem' }} ref={sectionRefs.section2}>
            <b>2. HOW DO WE PROCESS YOUR INFORMATION?  </b>
            </Typography>
            <Typography variant="subtitle2" gutterBottom style={{ fontStyle: 'italic' }}>
            <b> In Short: </b>We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.
            </Typography>
            <Typography variant="body2" paragraph style={{ fontWeight: 'bold' }}>
            We process your personal information for a variety of reasons, depending on how you interact with our Services, including:
            </Typography>
            <Typography variant="body2" paragraph style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>
            To facilitate account creation and authentication and otherwise manage user accounts. We may process your information so you can create and log in to your account, as well as keep your account in working order.
            </li>
            <li>
            To deliver and facilitate delivery of services to the user. We may process your information to provide you with the requested service.
            </li>
            <li>
            To enable user-to-user communications. We may process your information if you choose to use any of our offerings that allow for communication with another user.
            </li>
            <li>
            To identify usage trends. We may process information about how you use our Services to better understand how they are being used so we can improve them.
            </li>
            <li>
            To comply with our legal obligations. We may process your information to comply with our legal obligations, respond to legal requests, and exercise, establish, or defend our legal rights.
            </li>
            </Typography>
            <Typography variant="body2" gutterBottom style={{ marginTop: '2rem', marginBottom: '1rem' }} ref={sectionRefs.section3}>
            <b>3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?  </b>
            </Typography>
            <Typography variant="subtitle2" gutterBottom style={{ fontStyle: 'italic' }}>
            <b> In Short: </b>We may share information in specific situations described in this section and/or with the following third parties.
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
            <b>Vendors, Consultants, and Other Third-Party Service Providers.  </b>We may share your data with third-party vendors, service providers, contractors, or agents (&quot;third parties&quot;) who perform services for us or on our behalf and require access to such information to do that work. The third parties we may share personal information with are as follows:
            </Typography>
            <Typography variant="body2" paragraph style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>
            Location services
            </li>
            </Typography>
            <Typography variant="body2" gutterBottom>
            Google Maps API
            </Typography>
            <Typography variant="body2" paragraph style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>
            <b>Business Transfers. </b>We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
            </li>
            <li>
            <b>When we use Google Maps Platform APIs. </b>We may share your information with certain Google Maps Platform APIs (e.g., Google Maps API, Places API). We obtain and store on your device (&quot;cache&quot;) your location. You may revoke your consent anytime by contacting us at the contact details provided at the end of this document.
            </li>
            <li>
            <b>Other Users. </b>When you share personal information (for example, by posting comments, contributions, or other content to the Services) or otherwise interact with public areas of the Services, such personal information may be viewed by all users and may be publicly made available outside the Services in perpetuity. Similarly, other users will be able to view descriptions of your activity, communicate with you within our Services, and view your profile.
            </li>
            </Typography>
            <Typography variant="body2" gutterBottom style={{ marginTop: '2rem', marginBottom: '1rem' }} ref={sectionRefs.section4}>
            <b>4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?  </b>
            </Typography>
            <Typography variant="subtitle2" gutterBottom style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
            <b> In Short: </b>We may use cookies and other tracking technologies to collect and store your information.
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
            We may use cookies and similar tracking technologies to access or store information.
            </Typography>
            <Typography variant="body2" gutterBottom style={{ marginTop: '2rem', marginBottom: '1rem' }} ref={sectionRefs.section5}>
            <b>5. HOW LONG DO WE KEEP YOUR INFORMATION?  </b>
            </Typography>
            <Typography variant="subtitle2" gutterBottom style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
            <b> In Short: </b>We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.
            </Typography>
            <Typography variant="subtitle2" gutterBottom style={{ marginBottom: '1rem' }}>
            We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than three (3) months past the termination of the user&apos;s account.
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
            When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
            </Typography>
            <Typography variant="body2" gutterBottom style={{ marginTop: '2rem', marginBottom: '1rem' }} ref={sectionRefs.section6}>
            <b>6. HOW DO WE KEEP YOUR INFORMATION SAFE?  </b>
            </Typography>
            <Typography variant="subtitle2" gutterBottom style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
            <b> In Short: </b>We aim to protect your personal information through a system of organizational and technical security measures.
            </Typography>
            <Typography variant="subtitle2" gutterBottom style={{ marginBottom: '1rem' }}>
            We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.
            </Typography>
            <Typography variant="body2" gutterBottom style={{ marginTop: '2rem', marginBottom: '1rem' }} ref={sectionRefs.section7}>
            <b>7. WHAT ARE YOUR PRIVACY RIGHTS?  </b>
            </Typography>
            <Typography variant="subtitle2" gutterBottom style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
            <b> In Short: </b>You may review, change, or terminate your account at any time.
            </Typography>
            <Typography variant="subtitle2" gutterBottom style={{ marginBottom: '1rem' }}>
            If you believe that we are unlawfully processing your personal information, you have the right to file a complaint with the National Privacy Commission (NPC). You can file a complaint with the NPC by visiting their website (www.privacy.gov.ph) and following the instructions provided on their complaints page.
            </Typography>
            <Typography variant="subtitle2" gutterBottom style={{ marginBottom: '1rem' }}>
            <b><u>Withdrawing your consent:</u></b> If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section <u>&quot;HOW CAN YOU CONTACT US ABOUT THIS NOTICE?&quot;</u> below.
            </Typography>
            <Typography variant="subtitle2" gutterBottom style={{ marginBottom: '1rem' }}>
            However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.
            </Typography>
            <Typography variant="subtitle2" gutterBottom style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
            Account Information
            </Typography>
            <Typography variant="subtitle2" gutterBottom style={{ marginBottom: '1rem' }}>
            If you would at any time like to review or change the information in your account or terminate your account, you can:
            </Typography>
            <Typography variant="body2" paragraph style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>
            Log in to your account settings and update your user account.
            </li>
            <li>
            Contact us using the contact information provided.
            </li>
            </Typography>

            <Typography variant="subtitle2" gutterBottom style={{ marginBottom: '1rem' }}>
            Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases.
            <br />
            If you have questions or comments about your privacy rights, you may email us at jc.unlayao@mseuf.edu.ph, rt.luna@mseuf.edu.ph, sg.encomienda@student.mseuf.edu.ph.
            </Typography>

            <Typography variant="body2" gutterBottom style={{ marginTop: '2rem', marginBottom: '1rem' }} ref={sectionRefs.section8}>
            <b>8. CONTROLS FOR DO-NOT-TRACK FEATURES  </b>
            </Typography>

            <Typography variant="subtitle2" gutterBottom style={{ marginBottom: '1rem' }}>
            Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track (&quot;DNT&quot;) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.
            </Typography>

            <Typography variant="body2" gutterBottom style={{ marginTop: '2rem', marginBottom: '1rem' }} ref={sectionRefs.section9}>
            <b>9. DO WE MAKE UPDATES TO THIS NOTICE?  </b>
            </Typography>

            <Typography variant="subtitle2" gutterBottom style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
            <b> In Short: </b>Yes, we will update this notice as necessary to stay compliant with relevant laws.
            </Typography>

            <Typography variant="subtitle2" gutterBottom style={{ marginBottom: '1rem' }}>
            We may update this privacy notice from time to time. The updated version will be indicated by an updated &quot;Revised&quot; date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.
            </Typography>

            <Typography variant="body2" gutterBottom style={{ marginTop: '2rem', marginBottom: '1rem' }} ref={sectionRefs.section10}>
            <b>10. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?  </b>
            </Typography>

            <Typography variant="subtitle2" gutterBottom style={{ marginBottom: '1rem' }}>
            If you have questions or comments about this notice, you may email us at jc.unlayao.mseuf.edu.ph or by post to:
            </Typography>

            <Typography variant="subtitle2" gutterBottom style={{ marginBottom: '1rem' }}>
            SakaNet
            <br />
            Manuel S. Enverga University Foundation, University Site, Barangay Ibabang Dupay
            <br />
            Lucena City, Quezon 4301
            <br />
            Philippines
            </Typography>


        </Box>
    );
};

export default DataPrivacyModal;
