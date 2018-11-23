export const findById = id => item => item.id == id

export const getDisplayName = WrappedComponent => {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}
