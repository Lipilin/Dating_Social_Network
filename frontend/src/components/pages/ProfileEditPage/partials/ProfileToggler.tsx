import styles from './ProfileEditForm.module.css'
import type { ActiveSection } from './ProfileEditForm'

interface ProfileTogglerProps {
    activeSection: ActiveSection
    setActiveSection: (section: ActiveSection) => void
}

export function ProfileToggler({ activeSection, setActiveSection }: ProfileTogglerProps) {
    return (
        <div className = {styles.chooseSection} >
            <span 
                className = {activeSection === 'main' ? styles.activeSection : ''} 
                onClick={() => setActiveSection('main')}> 
                Основное 
            </span>
            <span 
                className = {activeSection === 'interests' ? styles.activeSection : ''}
                onClick={() => setActiveSection('interests')}> 
                Интересы 
            </span>
            <span 
                className = {activeSection === 'countries' ? styles.activeSection : ''} 
                onClick={() => setActiveSection('countries')}> 
                Страны 
            </span>
        </div>
    )
}