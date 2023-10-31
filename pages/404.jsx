import Logo from "../public/images/LOGO-FINAL.png";

export default function PageNotFound(){
    return(
        <div style={{display:"flex", flexDirection:"row", width:"50%", margin:"auto", paddingBlock:"20vh"}}>
            <img 
            src={"../images/LOGO-FINAL.png"} 
            alt="Sakanet Logo" width={400} 
            height={300} style={{borderRight:"4px solid green", 
            marginRight:"3em"}}/>
            <div>
            <h1 style={{fontSize:"9rem"}}>404</h1>
            <p style={{fontSize:"2rem"}}>Page not Found</p>
            </div>
        </div>
    )
}