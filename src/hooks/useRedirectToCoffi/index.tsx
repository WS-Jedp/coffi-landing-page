export const useRedirectToCoffiApp = () => {
    return {
        redirectToCoffi: () => {
            window.open('https://qa.coffi.com.co', '_blank')
        }
    }
}