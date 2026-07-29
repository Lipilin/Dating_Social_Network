import { default as arrowPrev } from '@/assets/images/arrow-prev-filled.svg'
import { default as arrowNext } from '@/assets/images/arrow-next-filled.svg'
import { DefaultButton } from '@/components/ui/buttons/DefaultButton'
 
export function AnnouncementHeader(){
    return (
        <div className="slide-tab">
            <div className="left">
                <h2 className="section__title">Объявления</h2>
                <div className="announcement__tabs">
                    <DefaultButton 
                        content='Новое'
                        classNames='tabs active'
                        onSend={async () => {}}
                    />
                </div>
            </div>
            <div className="right">
                <div className="prev">
                    <img src = {arrowPrev} />
                </div>
                <div className="next">
                    <img src = {arrowNext} />
                </div>
            </div>
        </div>
    )
}