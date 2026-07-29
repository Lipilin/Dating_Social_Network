export function AnnouncementHeader(){
    return (
        <div className="slide-tab">
            <div className="left">
                <h2 className="section__title">Объявления</h2>
                <div className="announcement__tabs">
                    <button data-tab="text" className="tabs active">Популярное</button>
                    <button data-tab="slides" className="tabs ">Новое</button>
                </div>
            </div>
            <div className="right">
                <div className="prev">
                    <svg width="9" height="13" viewBox="0 0 9 13" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.75781 11.2758L3.06816 6.58614L7.75781 1.89648" stroke="#0041F2"
                            strokeWidth="3" />
                    </svg>
                </div>
                <div className="next">
                    <svg width="9" height="13" viewBox="0 0 9 13" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.24219 11.2758L5.93184 6.58614L1.24219 1.89648" stroke="#0041F2"
                            strokeWidth="3" />
                    </svg>
                </div>
            </div>
        </div>
    )
}