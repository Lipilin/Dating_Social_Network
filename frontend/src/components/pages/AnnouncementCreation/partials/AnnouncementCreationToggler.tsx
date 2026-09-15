import styles from '../AnnouncementCreation.module.css'
import type { ActiveSection } from './AnnouncementCreationForm'

interface AnnouncementCreationTogglerProps {
    activeSection: ActiveSection
    setActiveSection: (section: ActiveSection) => void
}

export function AnnouncementCreationToggler({ activeSection, setActiveSection }: AnnouncementCreationTogglerProps) {
    return (
        <div className={styles.chooseSection}>
            <span
                className={activeSection === 'main' ? styles.activeSection : ''}
                onClick={() => setActiveSection('main')}
            >
                Основное
            </span>
            <span
                className={activeSection === 'interests' ? styles.activeSection : ''}
                onClick={() => setActiveSection('interests')}
            >
                Интересы
            </span>
        </div>
    )
}
