'use strict'

const STORAGE_KEY = 'countries'
const gCache = loadFromStorage(STORAGE_KEY) || {}

function getCountryByName(countryName) {
    
    countryName = countryName.toLowerCase()
    if (gCache[countryName]) return Promise.resolve(gCache[countryName])

    return axios.get(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(res => {
            if(res.status === 404) return Promise.reject('No Results')
            return res.data[0]
        })
        .then(country => {
            gCache[countryName] = country
            saveToStorage(STORAGE_KEY, gCache)
            return country
        })
}

function getCountryByCode(symbol) {
    symbol = symbol.toLowerCase()

    for (const country in gCache) {
        if (gCache[country].cca3.toLowerCase() === symbol) return Promise.resolve(gCache[country])
    }
    
    return axios.get(`https://restcountries.com/v3.1/alpha/${symbol}`)
        .then(res => {
            console.log('Getting from network...')
            const countryName = res.data[0].name.common
            gCache[countryName] = res.data[0]
            saveToStorage(STORAGE_KEY, gCache)
            return gCache[countryName]
        })
}

function clearCache() {
    localStorage.removeItem(STORAGE_KEY)
}