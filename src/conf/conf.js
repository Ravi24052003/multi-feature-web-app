const conf = {
    realmAppId: String(import.meta.env.VITE_REALM_APP_ID),
    realmLoginCartEmail: String(import.meta.env.VITE_REALM_LOGINCART_EMAIL),
    realmLoginCartPass: String(import.meta.env.VITE_REALM_LOGINCART_PASS),
    weatherApiKey: String(import.meta.env.VITE_WEATHERAPI_KEY),
    realmLoginProductsEmail: String(import.meta.env.VITE_REALM_LOGINPRODUCTS_EMAIL),
    realmLoginProductsPass: String(import.meta.env.VITE_REALM_LOGINPRODUCTS_PASS),
    openaiApiKey: String(import.meta.env.VITE_OPENAI_API_KEY)
}

export default conf