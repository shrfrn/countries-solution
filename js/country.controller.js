'use strict'

function onInit() {
    const elInput = document.querySelector('input')
    elInput.value = 'Israel'
    
    onGetCountryByName()
}

function onGetCountryByName(ev) {
    ev?.preventDefault()
    adjustDisplay('loader')

    const elInput = document.querySelector('input')
    elInput.select()

    getCountryByName(elInput.value)
        .then(renderCountry)
        .catch(() => adjustDisplay('no-results'))
}

function onGetCountryByCode(symbol) {
    adjustDisplay('loader')

    const elInput = document.querySelector('input')
    elInput.value = ''
    
    getCountryByCode(symbol)
        .then(renderCountry)
}

function onClearCache() {
    clearCache()
}

function renderCountry(country) {
    const elCountry = document.querySelector('.country-info')
    const elMapLink = elCountry.querySelector('a')
    const elName = elCountry.querySelector('h2')
    const elFlag = elCountry.querySelector('img')
    const elPopulation = elCountry.querySelector('.population')
    const elArea = elCountry.querySelector('.area')

    elName.innerText = country.name.common
    elMapLink.href = country.maps.googleMaps
    elFlag.src = country.flags.png
    elPopulation.innerText = country.population.toLocaleString()
    elArea.innerText = country.area.toLocaleString()

    const elNegs = document.querySelector('.negs')
    if(country.borders) {
        const strHtmls = country.borders.map(neg => 
            `<a href="#" onclick="onGetCountryByCode('${neg}', event)">${neg}</a>`)
    
        elNegs.innerHTML = strHtmls.join('')
    } else {
        elNegs.innerHTML = 'None'
    }
    adjustDisplay('results')
}

function adjustDisplay(status) {
    document.querySelector('.country-info').classList.add('hidden')
    document.querySelector('.loader').classList.add('hidden')
    document.querySelector('.no-results').classList.add('hidden')
    
    switch (status) {
        case 'results':
            document.querySelector('.country-info').classList.remove('hidden')
            break;

        case 'no-results':
            document.querySelector('.no-results').classList.remove('hidden')
            break;

        case 'loader':
            document.querySelector('.loader').classList.remove('hidden')
            break;

    }
}