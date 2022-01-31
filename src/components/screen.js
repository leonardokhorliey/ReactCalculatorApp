const Screen = ( {toptextInScreen, bottomtextInScreen} ) => {



    
    return (
        <div className = "screen">
            <div className= "screen-text">
                <p className= "screen-top-text"> {toptextInScreen} </p>
                <p className= "screen-bottom-text"> {bottomtextInScreen} </p>
            </div>
        </div>
    )
}

export default Screen;