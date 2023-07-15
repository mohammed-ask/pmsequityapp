import { StackActions } from '@react-navigation/native'

/**
 * For enhancing code readability,
 * Use this function whenever you want to remove all previous navigated screens from the stack
 * @param props - pass props of the screen for navigation
 * @param screenName - screenName where it should be navigated
 * @param params - Optional - If want to pass any navigation params
 */
export const replaceNavigation = (
    navigation,
    screenName,
    params = {}
) => {
    navigation.dispatch(StackActions.replace(screenName, params))
}
