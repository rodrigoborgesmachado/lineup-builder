import './squad.css';

function Squad({playears}){
    return(
        <div className='squad-field'>
            {
                playears.map((item, i) => (
                    <div className={i < 4 ? `squad-player-${i}` : `squad-player`} key={i}>
                        <div className='squad-player-icon'/>
                        <div className='squad-player-icon2'/>
                        <div className='squad-player-name'>
                            {item}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Squad;