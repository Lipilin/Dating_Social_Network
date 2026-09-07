import { Loader } from '@/components/pages/Loader/Loader'
import { BaseModal } from '../BaseModal'
import { useState, useMemo } from 'react'

interface DeleteEntityModalProps{
    onDelete: () => Promise<void>
}

type steps = 'confirm' | 'loading' | 'success' | 'error'

export default function DeleteEntityModal({ onDelete }: DeleteEntityModalProps) {
    const [step, setStep] = useState<steps>('confirm')
    const [error, setError] = useState<string>('')
    const element = useMemo(() => {
        let title = ''
        let content = null
        switch (step) {
            case 'confirm':
                title = 'Вы уверены, что хотите удалить эту запись?'
                content = (
                    <>
                        <p> Это действие нельзя отменить. Убедитесь, что вы выбрали правильную запись</p>
                        <button 
                            onClick = { () => {
                                setStep('loading')
                                onDelete()
                                .then(() => {
                                    setStep('success')
                                })
                                .catch((error) => {
                                    setStep('error')
                                    setError(error.message)
                                })
                            }}
                            className = "blue modal__close"
                        >
                            Удалить
                        </button>
                    </>
                )
                break
            case 'loading': 
                title = 'Идет процесс удаления...'
                content = <Loader isLoading = { true } />
                break
            case 'success':
                title = 'Запись успешно удалена'
                content = (
                    <>
                        <p> Данные безвозвратно удалены </p>
                        <button 
                            onClick = { () => {
                                //onClose()
                            }}
                            className = "blue modal__close"
                        >
                            Закрыть
                        </button>           
                    </>
                )
                break
            case 'error':
                title = 'Ошибка при удалении записи'
                content = (
                    <>
                        <p> Произошла ошибка при удалении записи. { error } </p>
                        <button 
                            onClick = { () => {
                                setStep('confirm')
                                setError('')
                            }}
                            className = "blue modal__close"
                        >
                            Закрыть
                        </button>
                    </>
                )
                break
        }
        return (
            <BaseModal title = { title }>
                { content }
            </BaseModal>
        )
    }, [step, error, onDelete])
    return element
}