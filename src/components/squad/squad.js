import './squad.css';

function Squad({playears}){
    return(
        <div className='squad-field'>
            {
                playears.map((item, i) => (
                    <div className={item == 'Thomas' ? 'squad-thomas' : (i < 4 ? `squad-player-${i}` : `squad-player`)} key={i}>
                        <div>
                        <div className='squad-player-icon'/>
                        <div className='squad-player-icon2'/>
                        </div>
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