interface UserOwnedContent {
    userId: number
}

export function assertContentOwnership<T extends UserOwnedContent>(
    authorizedUserId: number,
    entity: T | null,
    notFoundMessage: string,
    forbiddenMessage: string,
): T {
    if (!entity) {
        throw new Error(notFoundMessage)
    }

    if (entity.userId !== authorizedUserId) {
        throw new Error(forbiddenMessage)
    }

    return entity
}
