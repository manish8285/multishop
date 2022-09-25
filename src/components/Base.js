import HomeNavbar from "./HomeNavbar";

const Base=({children})=>{
    return(
        <div>
            <HomeNavbar ></HomeNavbar>
            {children}
        </div>
        
    )
}

export default Base;