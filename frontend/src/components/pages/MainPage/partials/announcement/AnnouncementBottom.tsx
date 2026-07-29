import { default as instruction } from '@/assets/images/instruction-image.svg'
import { default as createAnnouncement } from '@/assets/images/create-announcement-image.svg'
import { default as showAnnouncement } from '@/assets/images/show-announcements.svg'
import { HrefWithImage } from '@/components/ui/hrefs/HrefWithImage'

export function AnnouncementBottom(){
    return (
        <div className="announcement__bottom">
            <HrefWithImage 
                link = "/announcements" 
                classNames = "link link1" 
                content = 'Показать все объявления'
                image = { showAnnouncement }
            />
            <div className="right-links">
                <HrefWithImage 
                    link = "/instruction" 
                    classNames = "link" 
                    content = 'Как подать объявление'
                    image = { instruction }
                />
                <HrefWithImage 
                    link = "#" 
                    classNames = "link" 
                    content = 'Добавить свое объявление'
                    image = { createAnnouncement }
                />
            </div>
        </div>
    )
}